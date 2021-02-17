import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {

  tasks;
  constructor(private router : Router, private taskService :TaskService) { }

  ngOnInit(): void {

    this.listTask();
  }

  updateTask(id: number)
  {
    this.router.navigate(['edit-task',id]);
  }

  listTask()
  {
    this.taskService.getAllTask().subscribe(
      data =>{
        this.tasks = data;
      }
    )
  }


  deleteTask(id :number) 
  {
    Swal.fire({
      title: `Voulez vous supprimer ce task  ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => 
    {
      if (result.isConfirmed)
      {
        this.taskService.deleteTask(id).subscribe( data => {
          console.log(data);
          
          Swal.fire(
            'Deleted!',
            'task bien supprimé.',
            'success'
          )

          this.listTask();
        });

      }
    })

   
  }


}
