import { Injectable } from '@angular/core';
import { Seeder } from '../data/Initializer';
import { BehaviorSubject } from 'rxjs'
import { Task } from '../models/Tasks';
import { Category } from '../models/Category';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  tasks = new BehaviorSubject<Task[]>(Seeder.tasks);
  categories = new BehaviorSubject<Category[]>(Seeder.categories);

  constructor() { }

  getCategories(): Category[] {
    return Seeder.categories;
  }

  setSearchFilter(searchFilter: string): void {
    const sortedTasks = Seeder.tasks.filter(task => task.title.toLowerCase().includes(searchFilter));
    this.tasks.next(sortedTasks);
  }

  getTasks() {
    this.tasks.next(Seeder.tasks);
  }

  sortTaskByCarogory(category: Category): void {
    const sortedTasks = Seeder.tasks.filter(task => task.category == category);
    this.tasks.next(sortedTasks);
  }
}
