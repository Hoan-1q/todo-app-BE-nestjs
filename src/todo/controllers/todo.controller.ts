import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TodoDto } from '../dto/todo.dto';
import { Todo } from '../entities/todo.entity';
import { TodoService } from '../services/todo.service';

@Controller('todo')
export class TodoController {
	constructor(private service: TodoService) { }

	@Get()
	list(@Query() todoDto: TodoDto) {
		return this.service.pagination(todoDto);
	}
	
	@Get('all')
	async all() {
		return this.service.getAll();
	}

	@Post('add')
	async create(@Body() todoData: Todo): Promise<any> {
		return this.service.create(todoData);
	}

	@Put(':id')
	async update(@Param('id') id: number, @Body() newTodo: Todo): Promise<any> {
		newTodo.id = Number(id);
		return this.service.update(newTodo);
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.service.delete(id);
	}

}
