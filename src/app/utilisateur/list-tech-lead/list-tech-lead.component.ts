import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-tech-lead',
  templateUrl: './list-tech-lead.component.html',
  styleUrls: ['./list-tech-lead.component.css']
})
export class ListTechLeadComponent implements OnInit {

  techleads;
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.listTechlead();
  }

  listTechlead()
  {
    this.userService.getAllTechLead().subscribe(
      data => {
        this.techleads = data;
      }
    )
  }

}
