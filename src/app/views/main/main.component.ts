import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Task } from 'src/app/models/Tasks';
import { DataService } from 'src/app/services/data-service.service';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from "../..//add-dialog/add-dialog.component";
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  // @ts-ignore
  dataSource: MatTableDataSource<Task>;
  displayedColumns: string[] = ['id', 'title', 'category', "date", 'status'];

  // @ts-ignore
  @ViewChild(MatSort, { static: false }) private sort: MatSort;
  // @ts-ignore
  @ViewChild(MatPaginator, { static: false }) private paginator: MatPaginator;


  tasks: Task[] = [];

  myControl = new FormControl();
  option: string[] = [];
  //@ts-ignore
  filteredOptions: Observable<string[]>;
 

  constructor(private dataService: DataService, public dialog: MatDialog) { }

  openDialog(): void{
    //@ts-ignore
    let task = new Task();
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '460px',
      data: {task:task}
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log("Result => ", result)
      if (result == undefined){
        return;
      }else{
        const Id = this.tasks[this.tasks.length -1].id + 1;
        const categories = this.dataService.getCategories();
        //@ts-ignore
        let category = new Category();
        
        for(let i = 0; i < categories.length; i++){
          if(categories[i].title == result.category){
            category = categories[i];
          }
        }
        let task = new Task(Id, result.title, result.status, category, result.date)
        this.dataService.addTask(task);
      }
    })
  }

  

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    let values: string[] = [];

    this.dataSource.data.map(x => {
      values.push(x.title);
    })

    this.dataService.setSearchFilter(filterValue);

    return values.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    this.dataService.tasks.subscribe(tasks => this.tasks = tasks);
    this.dataSource = new MatTableDataSource();
    this.dataService.tasks.subscribe(tasks => this.dataSource.data = tasks);
    this.refreshTable();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngAfterViewInit() {
    this.addTableObjects();
  }

  switchStatus(task: Task): void{
    task.status = !task.status;
  }

  private refreshTable() {
    this.dataSource.data = this.tasks;
    this.addTableObjects();

    //@ts-ignore
    this.dataSource.sortingDataAccessor = (task, colName) => {
      switch (colName) {
        case 'category': {
          return task.category ? task.category.title : null;
        }
        case 'date': {
          return task.date ? task.date : null;
        }
        case 'title': {
          return task.title;
        }
      }
    }
  }

  private addTableObjects() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
