import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { ListProjectComponent } from './project/list-project/list-project.component';
import { ListProjectTypeComponent } from './projecttype/list-project-type/list-project-type.component';
import { AddProjectTypeComponent } from './projecttype/add-project-type/add-project-type.component';
import { ListTeamComponent } from './team/list-team/list-team.component';
import { AddTeamComponent } from './team/add-team/add-team.component';
import { ListUsersComponent } from './utilisateur/list-users/list-users.component';
import { DetailUserComponent } from './utilisateur/detail-user/detail-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from 'src/_helpers/auth.interceptor';
import { ListDepartementComponent } from './departement/list-departement/list-departement.component';
import { AddDepartementComponent } from './departement/add-departement/add-departement.component';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { ListTaskComponent } from './task/list-task/list-task.component';
import { DetailProjectComponent } from './project/detail-project/detail-project.component';
import { EditProjectComponent } from './project/edit-project/edit-project.component';
import { EditProjectTypeComponent } from './projecttype/edit-project-type/edit-project-type.component';
import { EditClientComponent } from './client/edit-client/edit-client.component';
import { EditTeamComponent } from './team/edit-team/edit-team.component';
import { EditTaskComponent } from './task/edit-task/edit-task.component';
import { EditDepartementComponent } from './departement/edit-departement/edit-departement.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListTechLeadComponent } from './utilisateur/list-tech-lead/list-tech-lead.component';
import { ListProductOwnerComponent } from './utilisateur/list-product-owner/list-product-owner.component';
import { ListDeveloppeurComponent } from './utilisateur/list-developpeur/list-developpeur.component';
import { RegisterConfirmComponent } from './register-confirm/register-confirm.component';
import { CommentsComponent } from './commentaire/comments/comments.component';
import { DetailClientComponent } from './client/detail-client/detail-client.component';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ListClientComponent,
    AddClientComponent,
    AddProjectComponent,
    ListProjectComponent,
    ListProjectTypeComponent,
    AddProjectTypeComponent,
    ListTeamComponent,
    AddTeamComponent,
    ListUsersComponent,
    DetailUserComponent,
    ListDepartementComponent,
    AddDepartementComponent,
    AddTaskComponent,
    ListTaskComponent,
    DetailProjectComponent,
    EditProjectComponent,
    EditProjectTypeComponent,
    EditClientComponent,
    EditTeamComponent,
    EditTaskComponent,
    EditDepartementComponent,
    DashboardComponent,
     ListTechLeadComponent,
    ListProductOwnerComponent,
     ListDeveloppeurComponent,
     RegisterConfirmComponent,
     CommentsComponent,
     DetailClientComponent,
     UpdateProfileComponent,
     ChangePasswordComponent, HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,HttpClientModule, ReactiveFormsModule, FormsModule,
  ],
  providers: [ authInterceptorProviders  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
