import { Developpeur } from "./developpeur";
import { Project } from "./project";
import { StatusTask } from "./StatusTask";

export class Task
{
   id : number;
   name:string;
   description :string;
   dateDebut:Date;
   dateFin: Date;
   estimationJour : number;
   estimationHeure : number;

   statusTask : StatusTask;
   developpeur : Developpeur;
   project : Project;


}