import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

  id:number;
  user : User;
  currentUser: any;

  isAdmin = false;
  isDev = false;
  isPOwner = false ;
  isTechLead = false;
  isLoggedIn = true;
  private roles: string[];

  constructor(private acroute: ActivatedRoute,  public userService :UserService, private token: TokenStorageService) { }

  ngOnInit(): void {
    this.id= this.acroute.snapshot.params['id'];
    this.currentUser = this.token.getUser();

    this.user = new User();
    this.userService.getUserById(this.id).subscribe(data => {
      this.user = data;
    })

    this.isLoggedIn = !!this.token.getToken();
    //  this.isConnecte = this.tokenStorageService.getToken();
  
      if (this.isLoggedIn) {
        const user = this.token.getUser();
        this.roles = user.roles;
  
  
        this.isAdmin =this.roles.includes('ROLE_ADMIN');
        this.isDev =this.roles.includes('ROLE_DEV');
        this.isTechLead =this.roles.includes('ROLE_TEACHLEAD');
        this.isPOwner =this.roles.includes('ROLE_POWNER');
  

        
      }  
  }


}
