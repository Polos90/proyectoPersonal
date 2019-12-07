import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService} from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]

})
export class EditComponent implements OnInit {

  public title: string;
  public project: Project;
  public status: string;
  public filesToUpload: Array<File>;
  public url: string;
  public save_project: string;


  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
  this.title = "Editar Proyecto";
  this.url = Global.url;
}

  ngOnInit() {
    this._route.params.subscribe( params => {
      let id = params.id;

      this.getProject(id);
    });
  }

  getProject(id){
    this._projectService.getProject(id).subscribe(
      response =>{
    // console.log(response);
    if(response.project){
      this.project = response.project;
        }
      },
      error =>{
    console.log(<any>error);
      }
    );
    }


onSubmit(){
  //guardar datos

  this._projectService.updateProject(this.project).subscribe(
    response => {
      if(response.project){
        this._uploadService.makeFileRequest(Global.url + "upload-audio/"+response.project._id,[],this.filesToUpload,'audio')
        .then((result:any)=> {

          this.save_project = result.project;

          this.status = 'success';
          console.log(result);

        });
          // console.log();
        // }); 
        

      }else
      {
        this.status='failed';
      }
      // console.log(response);
    },
    error =>{
      console.log(<any>error);
    }
  ); 
}

fileChangeEvent(fileInput: any){
  // console.log(fileInput);
  this.filesToUpload = <Array<File>>fileInput.target.files; 
  }
}
