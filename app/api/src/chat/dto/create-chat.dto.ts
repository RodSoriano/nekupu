import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class JoinChatRoomDtoWs {
  @IsNumber()
  chatRoomId: number;
}

export class DeleteChatRoomWs extends JoinChatRoomDtoWs {}

export class MessagePayloadDtoWs extends JoinChatRoomDtoWs {
  @IsString()
  @IsNotEmpty()
  message: string;
}

export class CreateChatRoomDto {
  @IsNumber()
  userId: number;
}
