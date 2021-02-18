import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {


  id: number;
  task : Task ;
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
    private userService : UserService, private statusTaskService : StatusTaskService, private acroute: ActivatedRoute) { }




  ngOnInit(): void {

    this.id= this.acroute.snapshot.params["id"];
    this.taskService.getTaskById(this.id).subscribe(
      data =>{
        this.task = data;
      }
    )



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

  updateTask()
  {
    
    this.task.developpeur = this.selectedDev;
    this.task.project = this.selectedProject;
    this.task.statusTask= this.selectedStatusTask;
    this.taskService.updateTask(this.id,this.addForm.value).subscribe(
      data =>{
        console.log(data);
        Swal.fire({
          title: `task bien modifié`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['list-task']);
      },
      err => {
        this.errorMessage = err.error.message;
       
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
