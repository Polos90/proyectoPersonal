import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService} from '../../services/upload.service';
import { Global } from '../../services/global';


// declare var script: any;


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public save_project: string;
  public project: Project;
  public status: string; 
  public filesToUpload: Array<File>;
  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  )
   {
     this.title = "Crear Proyecto";
     this.project = new Project('','','','',2019,'','');
   }

  ngOnInit() {
  }

onSubmit(form){
  //guardar datos

  this._projectService.saveProject(this.project).subscribe(
    response => {
      if(response.project){
        //subir audio
        this._uploadService.makeFileRequest(Global.url + "upload-audio/"+response.project._id,[],this.filesToUpload,'audio')
        .then((result:any)=> {
          this.save_project = result.project;
          this.status = 'success';
          console.log(result);
          form.reset();

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
