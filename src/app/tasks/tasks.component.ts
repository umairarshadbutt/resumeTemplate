//import { Box } from 'src/app/Box.model';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from '../task';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { Box } from '../models/Box.model';
import { TaskService } from '../services/task.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BoxTask } from '../models/BoxTask.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {
  board: Box[] ;
  editMode= false;
  private subscription: Subscription;
  //task:Task[];
  selectedTask: Box;
  constructor(
              private router: Router,
              private route:ActivatedRoute,
              private boxService:TaskService) 
              { }

  ngOnInit() {
    //this.getTasks();
    

      this.board = this.boxService.getBoxes();
    this.subscription = this.boxService.BoxesChanged.subscribe(
        (board: Box[]) => {
          this.board = board;
        }
      );
      console.log(this.board);
  }
  onSelect(task:Box): void{
    this.selectedTask=task;
    this.editMode = false;
    console.log(this.selectedTask);

  }
  // getTasks():void{
  //   this.tasksService.getTask().subscribe(task=> this.task=task);
  // }


  onEditItem(index:number){
    this.editMode = true;
    this.boxService.startedEditing.next(index);
    
    
  }
  onAddTask(){
    this.editMode = true;
    this.boxService.startedEditing.next();
    
    
  }

  onEditItem1(index:number){
    this.router.navigate(['editBoard'], {relativeTo: this.route});
    this.boxService.startedEditing.next(index);
  }
  onNewTask() {
    this.router.navigate(['newTask'], {relativeTo: this.route});
    
  }
  onNewBoard() {
    this.router.navigate(['newBoard'], {relativeTo: this.route});
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
 
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
