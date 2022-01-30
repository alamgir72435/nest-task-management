import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    // if we have any filters defined, call tasksService getTaskFilters

    // otherwise, just get all tasks
    if (Object.keys(filterDto).length) {
      // filter
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.findTaskById(id);
  }

  @Post()
  createTask(@Body() crateTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(crateTaskDto);
  }
  @Delete('/:id')
  deleteTask(@Param('id') id: string): boolean {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id')
  updateTask(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    console.log(status, id);
    return this.tasksService.updateStatus(id, status);
  }
}
