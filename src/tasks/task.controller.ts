// src/tasks/task.controller.ts
import { Controller, Get, Post, Body, Param, Put, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() task: Task, @Res() res: Response): Promise<void> {
    const createdTask = await this.taskService.create(task);
    res.status(HttpStatus.CREATED).json({
      message: 'Task created successfully',
      data: createdTask,
    });
  }

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const tasks = await this.taskService.findAll();
    res.status(HttpStatus.OK).json({
      message: 'Tasks retrieved successfully',
      data: tasks,
    });
  }

  @Get(':assignee')
  async findByAssignee(@Param('assignee') assignee: string, @Res() res: Response): Promise<void> {
    const tasks = await this.taskService.findByAssignee(assignee);
    res.status(HttpStatus.OK).json({
      message: 'Tasks retrieved successfully',
      data: tasks,
    });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatedTask: Partial<Task>, @Res() res: Response): Promise<void> {
    const updatedTaskResult = await this.taskService.update(id, updatedTask);
    res.status(HttpStatus.OK).json({
      message: 'Task updated successfully'
    });
  }
}
