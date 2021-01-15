import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AddClientComponent } from './client/add-client/add-client.component';
import { EditClientComponent } from './client/edit-client/edit-client.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { DashboardComponent } from './dashboard/dashboard.component';
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
  {path : 'profile', component : ProfileComponent},
  {path : 'dashboard', component : DashboardComponent},


  {path : 'list-client', component : ListClientComponent},
  {path : 'add-client', component : AddClientComponent},
  { path: 'edit-client/:id', component: EditClientComponent},

  
  {path : 'list-project', component : ListProjectComponent},
  {path : 'add-project', component : AddProjectComponent},
  { path: 'detail-project/:id', component: DetailProjectComponent },
  { path: 'edit-project/:id', component: EditProjectComponent},
 

  {path : 'list-project-type', component : ListProjectTypeComponent},
  {path : 'add-project-type', component : AddProjectTypeComponent},
  { path: 'edit-project-type/:id', component: EditProjectTypeComponent },
 

  {path : 'list-team', component : ListTeamComponent},
  {path : 'add-team', component : AddTeamComponent},
  { path: 'edit-team/:id', component: EditTeamComponent},


  {path : 'list-user', component : ListUsersComponent},
  { path: 'details-user/:id', component: DetailUserComponent },
 
  

  {path : 'list-departement', component : ListDepartementComponent},
  {path : 'add-departement', component : AddDepartementComponent},
  { path: 'edit-departement/:id', component: EditDepartementComponent },

  
  {path : 'list-task', component : ListTaskComponent},
  {path : 'add-task', component : AddTaskComponent},
  { path: 'edit-task/:id', component: EditTaskComponent, },


  //{ path: '', redirectTo: '/login', pathMatch: 'full' },
 // { path: '', pathMatch: 'full', redirectTo: '/login' },

  

  
  
  




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
