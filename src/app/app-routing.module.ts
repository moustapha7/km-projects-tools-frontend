import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AddClientComponent } from './client/add-client/add-client.component';
import { EditClientComponent } from './client/edit-client/edit-client.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { AddDepartementComponent } from './departement/add-departement/add-departement.component';
import { EditDepartementComponent } from './departement/edit-departement/edit-departement.component';
import { ListDepartementComponent } from './departement/list-departement/list-departement.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { DetailProjectComponent } from './project/detail-project/detail-project.component';
import { EditProjectComponent } from './project/edit-project/edit-project.component';
import { ListProjectComponent } from './project/list-project/list-project.component';
import { AddProjectTypeComponent } from './projecttype/add-project-type/add-project-type.component';
import { EditProjectTypeComponent } from './projecttype/edit-project-type/edit-project-type.component';
import { ListProjectTypeComponent } from './projecttype/list-project-type/list-project-type.component';
import { RegisterComponent } from './register/register.component';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { EditTaskComponent } from './task/edit-task/edit-task.component';
import { ListTaskComponent } from './task/list-task/list-task.component';
import { AddTeamComponent } from './team/add-team/add-team.component';
import { EditTeamComponent } from './team/edit-team/edit-team.component';
import { ListTeamComponent } from './team/list-team/list-team.component';
import { DetailUserComponent } from './utilisateur/detail-user/detail-user.component';
import { ListUsersComponent } from './utilisateur/list-users/list-users.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path : 'profile', component : ProfileComponent, canActivate : [AuthGuard]},


  {path : 'list-client', component : ListClientComponent, canActivate : [AuthGuard]},
  {path : 'add-client', component : AddClientComponent, canActivate : [AuthGuard]},
  { path: 'edit-client/:id', component: EditClientComponent, canActivate : [AuthGuard] },

  
  {path : 'list-project', component : ListProjectComponent, canActivate : [AuthGuard]},
  {path : 'add-project', component : AddProjectComponent, canActivate : [AuthGuard]},
  { path: 'detail-project/:id', component: DetailProjectComponent, canActivate : [AuthGuard] },
  { path: 'edit-project/:id', component: EditProjectComponent, canActivate : [AuthGuard] },
 

  {path : 'list-project-type', component : ListProjectTypeComponent, canActivate : [AuthGuard]},
  {path : 'add-project-type', component : AddProjectTypeComponent, canActivate : [AuthGuard]},
  { path: 'edit-project-type/:id', component: EditProjectTypeComponent, canActivate : [AuthGuard] },
 

  {path : 'list-team', component : ListTeamComponent, canActivate : [AuthGuard]},
  {path : 'add-team', component : AddTeamComponent, canActivate : [AuthGuard]},
  { path: 'edit-team/:id', component: EditTeamComponent, canActivate : [AuthGuard] },


  {path : 'list-user', component : ListUsersComponent, canActivate : [AuthGuard]},
  { path: 'details-user/:id', component: DetailUserComponent, canActivate : [AuthGuard] },
 
  

  {path : 'list-departement', component : ListDepartementComponent, canActivate : [AuthGuard]},
  {path : 'add-departement', component : AddDepartementComponent, canActivate : [AuthGuard]},
  { path: 'edit-departement/:id', component: EditDepartementComponent , canActivate : [AuthGuard]},

  
  {path : 'list-task', component : ListTaskComponent, canActivate : [AuthGuard]},
  {path : 'add-task', component : AddTaskComponent, canActivate : [AuthGuard]},
  { path: 'edit-task/:id', component: EditTaskComponent, canActivate : [AuthGuard] },


 // { path: '', redirectTo: '/login', pathMatch: 'full' },
 // { path: '', pathMatch: 'full', redirectTo: '/login' },

  

  
  
  




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
