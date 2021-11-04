import { Injectable } from '@angular/core';
import { Seeder } from '../data/Initializer';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  tasks = new BehaviorSubject(Seeder.tasks);
  categories = new BehaviorSubject(Seeder.categories);

  constructor() { }

  getCategories() {
    return Seeder.categories;
  }

  getTasks() {
    this.tasks.next(Seeder.tasks);
  }
}
