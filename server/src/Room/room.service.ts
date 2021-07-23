/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { CreateRoomDto } from '../Dto/Room/create-room.dto';
import { UpdateRoomDto } from '../Dto/Room/update-room.dto';
import { User } from 'src/User/user.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>
  ) {}

  async create(createRoomDto: CreateRoomDto, user_id: number) {
    const newRoom = {
      ...createRoomDto,
      user_id: user_id,
      pinCode: Math.floor(100000 + Math.random() * 900000)
    };
    const createdRoom = await this.roomRepository.create(newRoom);
    console.log(createdRoom);
    return await this.roomRepository.save(createdRoom);
  }

  async findAll() {
    return await this.roomRepository.find();
  }

  findOne(id: number) {
    return this.roomRepository.findOne(id);
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    this.roomRepository.update(id, updateRoomDto);
    return this.findOne(id);
  }

  deleteOne(id: number) {
    return this.roomRepository.delete(id);
  }
}