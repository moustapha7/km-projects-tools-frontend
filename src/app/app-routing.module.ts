import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClientComponent } from './client/add-client/add-client.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { AddDepartementComponent } from './departement/add-departement/add-departement.component';
import { ListDepartementComponent } from './departement/list-departement/list-departement.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { DetailProjectComponent } from './project/detail-project/detail-project.component';
import { ListProjectComponent } from './project/list-project/list-project.component';
import { AddProjectTypeComponent } from './projecttype/add-project-type/add-project-type.component';
import { ListProjectTypeComponent } from './projecttype/list-project-type/list-project-type.component';
import { RegisterComponent } from './register/register.component';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { ListTaskComponent } from './task/list-task/list-task.component';
import { AddTeamComponent } from './team/add-team/add-team.component';
import { ListTeamComponent } from './team/list-team/list-team.component';
import { DetailUserComponent } from './utilisateur/detail-user/detail-user.component';
import { ListUsersComponent } from './utilisateur/list-users/list-users.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path : 'profile', component : ProfileComponent},

  {path : 'list-client', component : ListClientComponent},
  {path : 'add-client', component : AddClientComponent},

  {path : 'list-project', component : ListProjectComponent},
  {path : 'add-project', component : AddProjectComponent},
  { path: 'detail-project/:id', component: DetailProjectComponent },
 
  {path : 'list-project-type', component : ListProjectTypeComponent},
  {path : 'add-project-type', component : AddProjectTypeComponent},
  
 
  {path : 'list-team', component : ListTeamComponent},
  {path : 'add-team', component : AddTeamComponent},

  {path : 'list-user', component : ListUsersComponent},
  { path: 'details-user/:id', component: DetailUserComponent },
  
  {path : 'list-departement', component : ListDepartementComponent},
  {path : 'add-departement', component : AddDepartementComponent},

  {path : 'list-task', component : ListTaskComponent},
  {path : 'add-task', component : AddTaskComponent},


  { path: '', redirectTo: '/login', pathMatch: 'full' },


  

  
  
  




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
