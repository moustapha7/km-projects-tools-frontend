import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;

  editPhoto: boolean;
  
  selectedFiles;
  progress: number;
  currentFileUpload: any;
  title:string;
  currentTime: number;


  id:number;
  user : User;

  constructor(private token: TokenStorageService, private userService : UserService, private routes: Router, private actroute : ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser);

   
   
  }

  udpdateProfile(id: number)
  {
   
    this.routes.navigate(['update-profile',id]);
  }

  changePassword(id: number)
  {
    this.routes.navigate(['change-password',id]);
  }


  //upload photo

  onEditPhoto(p)
  {
    this.currentUser = p;
    this.editPhoto = true;
  }

  onSelectedFile(event)
  {
    this.selectedFiles = event.target.files;
  }

  getTS() {
    return this.currentTime;
  }
  
  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.userService.uploadPhotoUser(this.currentFileUpload, this.currentUser.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        //console.log(this.router.url);
        //this.getProducts(this.currentRequest);
        //this.refreshUpdatedProduct();
        this.currentTime=Date.now();
        this.editPhoto=false;
      }
    },err=>{
      alert("Problème de chargement");
    })

    //this.getProducts('/products/search/selectedProducts');
 

    this.selectedFiles = undefined
  }






}