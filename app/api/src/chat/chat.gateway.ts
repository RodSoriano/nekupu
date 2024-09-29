import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  readonly server: Server;

  handleDisconnect(client: Socket) {
    console.log('client connected', client.id);
  }

  handleConnection(client: Socket) {
    console.log('client disconnected', client.id);
  }
}
