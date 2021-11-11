import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../services/data-service.service'; 
import { Category } from '../models/Category';
import { Observable } from 'rxjs';
import { Task } from '../models/Tasks';
import { map, startWith } from "rxjs/operators"; 
import { FormControl } from '@angular/forms';

export interface DialogData {
  task: Task
}

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  categories: Observable<string[]>;
  formControl = new FormControl();

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>, public dataService: DataService, @Inject(MAT_DIALOG_DATA) public data: DialogData,) {
    this.categories = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this.categoryFilter(value))
    )
   }

   private categoryFilter (value: string): string[]{
    const filteredValue = value.toLocaleLowerCase();
    let values: string[] = [];

    this.dataService.getCategories().map(c => {
      values.push(c.title);
    });
    return values.filter(options => options.toLocaleLowerCase().includes(filteredValue));
   }

  ngOnInit(): void {
  }

  switchStatus(){
    this.data.task.status = !this.data.task.status;
  }
  close(): void{
    this.dialogRef.close();
  }

}
