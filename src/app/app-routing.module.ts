import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AddClientComponent } from './client/add-client/add-client.component';
import { DetailClientComponent } from './client/detail-client/detail-client.component';
import { EditClientComponent } from './client/edit-client/edit-client.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { CommentsComponent } from './commentaire/comments/comments.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddDepartementComponent } from './departement/add-departement/add-departement.component';
import { EditDepartementComponent } from './departement/edit-departement/edit-departement.component';
import { ListDepartementComponent } from './departement/list-departement/list-departement.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { DetailProjectComponent } from './project/detail-project/detail-project.component';
import { EditProjectComponent } from './project/edit-project/edit-project.component';
import { ListProjectComponent } from './project/list-project/list-project.component';
import { AddProjectTypeComponent } from './projecttype/add-project-type/add-project-type.component';
import { EditProjectTypeComponent } from './projecttype/edit-project-type/edit-project-type.component';
import { ListProjectTypeComponent } from './projecttype/list-project-type/list-project-type.component';
import { RegisterConfirmComponent } from './register-confirm/register-confirm.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { EditTaskComponent } from './task/edit-task/edit-task.component';
import { ListTaskComponent } from './task/list-task/list-task.component';
import { AddTeamComponent } from './team/add-team/add-team.component';
import { EditTeamComponent } from './team/edit-team/edit-team.component';
import { ListTeamComponent } from './team/list-team/list-team.component';
import { DetailUserComponent } from './utilisateur/detail-user/detail-user.component';
import { ListDeveloppeurComponent } from './utilisateur/list-developpeur/list-developpeur.component';
import { ListProductOwnerComponent } from './utilisateur/list-product-owner/list-product-owner.component';
import { ListTechLeadComponent } from './utilisateur/list-tech-lead/list-tech-lead.component';
import { ListUsersComponent } from './utilisateur/list-users/list-users.component';


const routes: Routes = [

  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-confirm', component : RegisterConfirmComponent},

  {path: 'home', component:HomeComponent,canActivate:[AuthGuard]},

  {path : 'profile', component : ProfileComponent,canActivate:[AuthGuard]},
  {path : 'dashboard', component : DashboardComponent,canActivate:[AuthGuard]},
  { path: 'update-profile/:id', component: UpdateProfileComponent,canActivate:[AuthGuard] },

  { path: 'change-password/:id', component: ChangePasswordComponent ,canActivate:[AuthGuard]},

  {path : 'list-client', component : ListClientComponent,canActivate:[AuthGuard]},
  {path : 'add-client', component : AddClientComponent,canActivate:[AuthGuard]},
  { path: 'edit-client/:id', component: EditClientComponent,canActivate:[AuthGuard]},
  { path: 'detail-client/:id', component: DetailClientComponent ,canActivate:[AuthGuard]},
  
  {path : 'list-project', component : ListProjectComponent,canActivate:[AuthGuard]},
  {path : 'add-project', component : AddProjectComponent,canActivate:[AuthGuard]},
  { path: 'detail-project/:id', component: DetailProjectComponent,canActivate:[AuthGuard] },
  { path: 'edit-project/:id', component: EditProjectComponent,canActivate:[AuthGuard]},
 

  {path : 'list-project-type', component : ListProjectTypeComponent,canActivate:[AuthGuard]},
  {path : 'add-project-type', component : AddProjectTypeComponent,canActivate:[AuthGuard]},
  { path: 'edit-project-type/:id', component: EditProjectTypeComponent ,canActivate:[AuthGuard]},
 

  {path : 'list-team', component : ListTeamComponent,canActivate:[AuthGuard]},
  {path : 'add-team', component : AddTeamComponent,canActivate:[AuthGuard]},
  { path: 'edit-team/:id', component: EditTeamComponent,canActivate:[AuthGuard]},


  {path : 'list-user', component : ListUsersComponent,canActivate:[AuthGuard]},
  { path: 'details-user/:id', component: DetailUserComponent ,canActivate:[AuthGuard]},
  {path : 'list-tech-lead', component : ListTechLeadComponent,canActivate:[AuthGuard]},
  {path : 'list-developpeur', component : ListDeveloppeurComponent,canActivate:[AuthGuard]},
  {path : 'list-product-owner', component : ListProductOwnerComponent,canActivate:[AuthGuard]},

 
  

  {path : 'list-departement', component : ListDepartementComponent,canActivate:[AuthGuard]},
  {path : 'add-departement', component : AddDepartementComponent,canActivate:[AuthGuard]},
  { path: 'edit-departement/:id', component: EditDepartementComponent ,canActivate:[AuthGuard]},

  
  {path : 'list-task', component : ListTaskComponent,canActivate:[AuthGuard]},
  {path : 'add-task', component : AddTaskComponent,canActivate:[AuthGuard]},
  { path: 'edit-task/:id', component: EditTaskComponent,canActivate:[AuthGuard] },

  { path: 'comments', component: CommentsComponent,canActivate:[AuthGuard] },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
 // { path: '', pathMatch: 'full', redirectTo: '/login' },

  

  
  
  




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
