import { IsNumber } from 'class-validator';

export class CreateChatRoomDto {
  // Temporal creation dto

  @IsNumber()
  userId: number;
}
