import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket
} from '@nestjs/websockets';

@WebSocketGateway({ path: '/api/socket' })
export class ChatGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('send-message')
  handleMessage(@MessageBody() message, @ConnectedSocket() client): void {
    client.broadcast.emit('message', message);
  }

  @SubscribeMessage('play-room')
  handleCreateRoom(@MessageBody() data, @ConnectedSocket() client): void {
    client.emit('created-room', {
      roomId: data,
      clientId: client.id,
      role: 'host'
    });
    client.join(data.toString());
    console.log(this.server.sockets.adapter.rooms);
  }
}
