import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

  id:number;
  user : User;
  constructor(private acroute: ActivatedRoute,  public userService :UserService) { }

  ngOnInit(): void {
    this.id= this.acroute.snapshot.params['id'];

    this.user = new User();
    this.userService.getUserById(this.id).subscribe(data => {
      this.user = data;
    })
  }


}
