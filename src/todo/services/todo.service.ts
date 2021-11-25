import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from '../entities/todo.entity';
import { Repository, UpdateResult } from 'typeorm';
import { TodoDto } from '../dto/todo.dto';

@Injectable()
export class TodoService {
	constructor(
		@InjectRepository(Todo)
		private repository: Repository<Todo>,
	) {}

	async getAll(): Promise<Todo[]> {
    return await this.repository.find();
  }

	async create(todo: Todo): Promise<Todo> {
    return await this.repository.save(todo);
  }

  async update(todo: Todo): Promise<UpdateResult> {
    return await this.repository.update(todo.id, todo);
  }

  async delete(id: string) {
    await this.repository.delete(Number(id));
    return 'done'
  }

  async pagination(query: TodoDto) {
    const q = this.repository
      .createQueryBuilder('todo')
    if (query.search) {
      q.where('todo.title like :title', { title: `%${query.search}%` });
    }
    const res = await q
    .getMany();
    return res;
  }

}
