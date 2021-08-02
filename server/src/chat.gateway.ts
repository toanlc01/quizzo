import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket
} from '@nestjs/websockets';

let players = {};

@WebSocketGateway({ path: '/api/socket' })
export class ChatGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('send-message')
  handleMessage(@MessageBody() message, @ConnectedSocket() client): void {
    client.broadcast.emit('message', message);
  }

  @SubscribeMessage('host-create-room')
  handleCreateRoom(@MessageBody() data, @ConnectedSocket() client): void {
    client.emit('created-room', {
      roomId: data.roomId,
      clientId: client.id,
      role: 'host'
    });
    players[data.roomId] = [];

    client.join(data.roomId.toString());
  }

  @SubscribeMessage('player-join-room')
  handleJoinRoom(@MessageBody() data, @ConnectedSocket() client): void {
    // find room
    // Look up the room ID in the Socket.IO manager object.
    let room = this.server.sockets.adapter.rooms.get(data.roomId);

    // If the room exists...
    if (room != undefined) {
      // attach the socket id to the data object.
      data.id = client.id;

      // Join the room
      client.join(data.roomId);

      // Emit an event notifying the clients that the player has joined the room.
      data.role = 'player';
      players[data.roomId].push(data);
      this.server.sockets
        .in(data.roomId)
        .emit('player-join-room', players[data.roomId]);
      client.emit('player-joined', data);
    } else {
      // Otherwise, send an error message back to the player.
      client.emit('error', { message: 'This room does not exist.' });
    }
  }

  @SubscribeMessage('player-enter-name')
  handlePlayerEnterName(@MessageBody() data, @ConnectedSocket() client): void {
    const player = players[data.roomId].find((user) => user.id == data.userId);
    player.name = data.username;
    console.log(players);
    this.server.in(data.roomId).emit('player-join-room', players[data.roomId]);
    client.emit('player-joined', data);
  }

  @SubscribeMessage('delete-room')
  handleDeleteRoom(@MessageBody() data, @ConnectedSocket() client): void {
    console.log(this.server.sockets.adapter.rooms.get(data.roomId));
  }
}
