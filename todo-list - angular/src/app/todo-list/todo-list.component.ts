import { Component, OnInit } from '@angular/core';
import { ApitodoService } from 'src/app/services/apitodo.service';
import { ToDo } from '../Models/todo-list';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  taskList: ToDo[];
  taskForEdit: ToDo;
  addForm;
  invalidLogin: boolean = false;
  ifeditTask: boolean = false;
  constructor(private formBuilder: FormBuilder, public apilist: ApitodoService) { }

  loadTaskList() {
    setTimeout(function () { console.log('loading...'); }, 4000);
    this.apilist.getAll().subscribe(data => this.taskList = data);
  }

  delTask(task: ToDo) {
    this.apilist.deleteToDo(task.id).subscribe(data => {
      console.log(data)
    });
    this.loadTaskList();
  }

  editTask(editTask: ToDo) {
    /* this.apilist.editToDo(editTask); */
    this.addForm = this.formBuilder.group({
      taskName: [editTask.taskName, Validators.compose([Validators.required])],
      description: [editTask.description, Validators.required],
      data: [editTask.data, Validators.required],
    });
    this.taskForEdit = editTask;
    this.ifeditTask = true;
  }

  onSubmit() {
    if (this.addForm.invalid) {
      return;
    }
    const task: ToDo = {
      taskName: this.addForm.controls.taskName.value,
      description: this.addForm.controls.description.value,
      data: this.addForm.controls.data.value,
    }
    this.apilist.addToDo(task).subscribe(data => {
      console.log(data)
    });
    this.loadTaskList();
  }

  saveChanges() {
    const task2: ToDo = {
      id: this.taskForEdit.id,
      taskName: this.addForm.controls.taskName.value,
      description: this.addForm.controls.description.value,
      data: this.addForm.controls.data.value,
    }
    this.apilist.editToDo(task2).subscribe(data2 => {
      console.log(data2)
    });
    this.loadTaskList();
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      taskName: ['', Validators.compose([Validators.required])],
      description: ['', Validators.required],
      data: ['', Validators.required],
    });

    this.loadTaskList();
  }

}
