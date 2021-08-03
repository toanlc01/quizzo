import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket
} from '@nestjs/websockets';
import { RoomService } from './Room/room.service';

let players = {};
let questions = {};

@WebSocketGateway({ path: '/api/socket' })
export class ChatGateway {
  constructor(private roomService: RoomService) {}

  @WebSocketServer()
  server;

  @SubscribeMessage('send-message')
  handleMessage(@MessageBody() message, @ConnectedSocket() client): void {
    client.broadcast.emit('message', message);
  }

  @SubscribeMessage('host-create-room')
  async handleCreateRoom(@MessageBody() data, @ConnectedSocket() client) {
    client.emit('created-room', {
      roomId: data.roomId,
      id: client.id,
      role: 'host'
    });
    players[data.roomId] = [];
    questions[data.roomId] = await this.roomService.findByPinCode(data.roomId);
    questions[data.roomId].count = 0;

    client.join(data.roomId.toString());
  }

  @SubscribeMessage('player-join-room')
  handleJoinRoom(@MessageBody() data, @ConnectedSocket() client): void {
    // find room
    // Look up the room ID in the Socket.IO manager object.
    let room = this.server.sockets.adapter.rooms.get(data.roomId);

    // If the room exists...
    if (room != undefined) {
      client.join(data.roomId.toString());
      client.emit('player-joined', data);
    } else {
      // Otherwise, send an error message back to the player.
      client.emit('error', { message: 'This room does not exist.' });
    }
  }

  @SubscribeMessage('player-enter-name')
  handlePlayerEnterName(@MessageBody() data, @ConnectedSocket() client): void {
    const player = { ...data };
    player.id = client.id;
    player.point = 0;
    players[data.roomId].push(player);
    this.server
      .in(data.roomId.toString())
      .emit('player-join-room', players[data.roomId]);
    client.emit('player-joined-with-name', data);
  }

  @SubscribeMessage('host-start-question')
  handleHostPlayRoom(@MessageBody() data): void {
    const timeStamp = new Date();

    questions[data.roomId].timeStamp = timeStamp;

    const index = questions[data.roomId].count;

    this.server.in(data.roomId.toString()).emit('next-question', {
      question: questions[data.roomId].questions[index],
      timeStamp: timeStamp
    });
    questions[data.roomId].count++;
  }

  @SubscribeMessage('player-submit')
  handlePlayerSubmit(@MessageBody() data): void {
    console.log(data);
    console.log(questions[data.roomId].timeStamp);
  }

  @SubscribeMessage('host-end-question')
  handleHostEndQuestion(@MessageBody() data): void {
    const index = questions[data.roomId].count;
    if (index == questions[data.roomId].questions.length) {
      this.server
        .in(data.roomId.toString())
        .emit('last-question', players[data.roomId]);
    } else {
      this.server
        .in(data.roomId.toString())
        .emit('question-ended', players[data.roomId]);
    }
  }

  @SubscribeMessage('host-end-game')
  handleHostEndGame(@MessageBody() data): void {
    this.server.in(data.roomId.toString()).emit('game-ended');
  }
}
