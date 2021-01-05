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
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from 'src/_helpers/auth.interceptor';

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
    DetailUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,HttpClientModule
  ],
  providers: [ authInterceptorProviders  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
