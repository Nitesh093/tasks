// src/teams/team.controller.ts
import { Controller, Get, Post, Body, Param, NotFoundException, HttpStatus } from '@nestjs/common';
import { Team } from './team.entity';
import { TeamService } from './team.service';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async create(@Body() team: Team): Promise<Team> {
    const createdTeam = await this.teamService.create(team);
    return createdTeam;
  }

  @Get()
  async findAll(): Promise<Team[]> {
    const teams = await this.teamService.findAll();
    return teams;
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Team> {
    const team = await this.teamService.findById(id);
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return team;
  }
}
