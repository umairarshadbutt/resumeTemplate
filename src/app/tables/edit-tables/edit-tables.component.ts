import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { TableService } from '../table.service';
import { Ingredient } from 'src/app/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-edit-tables',
  templateUrl: './edit-tables.component.html',
  styleUrls: ['./edit-tables.component.css']
})
export class EditTablesComponent implements OnInit,OnDestroy {
  @ViewChild('f') slForm:NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex:number;
  editedItem:Ingredient;
  constructor(private taskService: TableService) { }

  
  ngOnInit() {
    this.subscription= this.taskService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex=index;
        this.editMode = true;
        this.editedItem=this.taskService.getIngredient(index);

        this.slForm.setValue({
          name: this.editedItem.name,
        })
      }
    );
  }

  onSubmit(form: NgForm) {
    const value= form.value;
    const newIngredient = new Ingredient(value.name);
    if (this.editMode){
      this.taskService.updateIngredient(this.editedItemIndex,newIngredient);
    } else {
      this.taskService.addIngredient(newIngredient);
    }   
    this.editMode=false;
    form.reset();
  }
  onClear()
  {
    this.slForm.reset();
    this.editMode=false;
  }
  onDelete(){
    this.taskService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy(){

    this.subscription.unsubscribe();
  }


}