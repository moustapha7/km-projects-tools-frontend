import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-product-owner',
  templateUrl: './list-product-owner.component.html',
  styleUrls: ['./list-product-owner.component.css']
})
export class ListProductOwnerComponent implements OnInit {


  powners;
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.listPowners();
  }

  listPowners()
  {
    this.userService.getAllPowner().subscribe(
      data => {
        this.powners= data;
      }
    )
  }

}
