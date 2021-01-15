
import { Client } from "./client";
import { ProjectType } from "./projectType";
import { StatusProject } from "./statusProject";
import { Team } from "./team";
import { User } from "./user";

export class Project
{
   id : number;
   name:string;
   description :string;
   dateDebut:Date;
   dateFin: Date;
   estimationJour : number;
   estimationHeure : number;

   team:Team;
   client: Client;
   userpo : User;
   userteach : User;
   projectType: ProjectType;
   statusProject : StatusProject

/* 
constructor(

   name:string,
   description :string,
   dateDebut:Date,
   dateFin: Date,
   estimationJour : number,
   estimationHeure : number,

   team:Team,
   client: Client,
   userpo : User,
   userteach : User,
   projectType: ProjectType,
   statusProject : StatusProject,
)
{
   

this.name = name;
this.description = description;
this.dateDebut = dateDebut;
this.dateFin = dateFin;
this.estimationJour = estimationJour;
this.estimationHeure = estimationHeure;
this.team = team;
this.client = client;
this.userpo = userpo;
this.userteach = userteach;
this.projectType = projectType;
this.statusProject = statusProject;

}
 */

}