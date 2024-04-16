// src/teams/team.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { ObjectId } from 'mongodb';



@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  async create(team: Team): Promise<Team> {
    return await this.teamRepository.save(team);
  }

  async findAll(): Promise<Team[]> {
    return await this.teamRepository.find();
  }

  async findById(id: string): Promise<Team> {
    return await this.teamRepository.findOne({ where: { id: new ObjectId(id) } });
  }
}
