import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-developpeur',
  templateUrl: './list-developpeur.component.html',
  styleUrls: ['./list-developpeur.component.css']
})
export class ListDeveloppeurComponent implements OnInit {

  devs;
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.listDevs();
  }

  listDevs()
  {
    this.userService.getAllDev().subscribe(
      data => {
        this.devs= data;
      }
    )
  }

}
