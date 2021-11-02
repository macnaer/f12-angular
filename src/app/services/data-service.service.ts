import { Injectable } from '@angular/core';
import { Seeder } from '../data/Initializer';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor() { }

  getCategories(){
    return Seeder.categories;
  }
}
