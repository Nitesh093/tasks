// task.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(task: Task): Promise<Task> {
    return await this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findByAssignee(assignee: string): Promise<Task[]> {
    return await this.taskRepository.find({ where: { assignee: assignee } });
  }

  async update(id: string, updatedTask: Partial<Task>): Promise<Task> {
    await this.taskRepository.update(id, updatedTask);
    return this.taskRepository.findOne({ where: { id: new ObjectId(id) } });
  }

  async delete(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
