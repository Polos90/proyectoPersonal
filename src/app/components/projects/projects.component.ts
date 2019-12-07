import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute,Params } from '@angular/router';

// declare var script: any;


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})


export class ProjectsComponent implements OnInit {

  public projects: Project[];
  public url: string;
  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
  }

  ngOnInit() {
    this.getProjects();
  }
getProjects(){
  this._projectService.getProjects().subscribe(
    response =>{
// console.log(response);
if(response.projects){
  this.projects = response.projects;
}
    },
    error =>{
// console.log(<any>error);
    }
  );
}
deleteProject(id){
this._projectService.deleteProject(id).subscribe(
  response =>{
// console.log(response);
if(response.project){
  this._router.navigate(['/sobre-mi']);
    }
  },
  error =>{
// console.log(<any>error);
  }
);
}


}

