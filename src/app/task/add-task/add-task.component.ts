import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Developpeur } from 'src/app/model/developpeur';
import { Project } from 'src/app/model/project';
import { StatusTask } from 'src/app/model/StatusTask';
import { Task } from 'src/app/model/task';
import { ProjectService } from 'src/app/services/project.service';
import { StatusTaskService } from 'src/app/services/status-task.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {


  task : Task = new Task();
  selectedDev :Developpeur;
  selectedProject : Project;
  selectedStatusTask : StatusTask;
  addForm : FormGroup;
  errorMessage = '';
  form: any = {};

  projects :Project[];
  statusTasks : StatusTask[];
  devs : Developpeur[];

  constructor(private router : Router, private taskService :TaskService, private formBuilder:FormBuilder, private projectService :ProjectService,
                      private userService : UserService, private statusTaskService : StatusTaskService) { }

  ngOnInit(): void {

    this.listDevs();
    this.listProjects();
    this.listStatusTask();

    this.addForm = this.formBuilder.group({
      name: new FormControl('', Validators.minLength(4)),
      description: new FormControl('', Validators.minLength(4)),
      dateDebut:  new FormControl('', Validators.required),
      dateFin:  new FormControl('', Validators.required),
    //  estimationJour :  new FormControl('', Validators.minLength(4)),
     // estimationHeure :  new FormControl('', Validators.minLength(4)),
     developpeur : new FormControl('', Validators.required),
     statusTask : new FormControl('', Validators.required),
     project : new FormControl('', Validators.required),
    });
  }

  saveTask()
  {

    this.task.developpeur = this.selectedDev;
    this.task.project = this.selectedProject;
    this.task.statusTask= this.selectedStatusTask;
    this.taskService.createTask(this.addForm.value).subscribe(
      data =>{
        console.log(data);
        Swal.fire({
          title: `task bien ajouté`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['list-task']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.router.navigate(['add-task']);
      }
    )
  }
  

  listDevs()
  {
    this.userService.getAllDev().subscribe(
      data => {
        this.devs= data;
      }
    )
  }

  listProjects()
  {
    this.projectService.getAllProject().subscribe(
      data => {
        this.projects = data;
      }
    )
  }

  listStatusTask()
  {
    this.statusTaskService.getAllStatusTask().subscribe(
      data=> {
        this.statusTasks = data;
      }
    )
  }

}
