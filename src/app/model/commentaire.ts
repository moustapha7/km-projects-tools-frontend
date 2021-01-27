import { Project } from "./project";

export class Commentaire {
    id: number;
    content : string;
    createdOn : Date; 
    username : string;
    project: Project;
}
