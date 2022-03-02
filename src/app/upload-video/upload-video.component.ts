import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent{

    constructor(private _videoService: VideoService){}

    public files: NgxFileDropEntry[] = [];
    fileUploaded:boolean=false;
    fileEntry:FileSystemFileEntry | undefined;

    public dropped(files: NgxFileDropEntry[]) {
      this.files = files;
      for (const droppedFile of files) {
  
        // Is it a file?
        if (droppedFile.fileEntry.isFile) {
          this.fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          this.fileEntry.file((file: File) => {
  
            // Here you can access the real file
            console.log(droppedFile.relativePath, file);
  
            this.fileUploaded=true;
  
          });
        } else {
          // It was a directory (empty directories are added, otherwise only files)
          const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
          console.log(droppedFile.relativePath, fileEntry);
        }
      }
    }
  
    public fileOver(event:any){
      console.log(event);
    }
  
    public fileLeave(event:any){
      console.log(event);
    }

    //upload file
    uploadVideo(){
      alert("click upload button")
      if(this.fileEntry !== undefined){
         console.log("this.fileEntry is : "+this.fileEntry);
         this.fileEntry.file(file => {
          this._videoService.uploadVideo(file).subscribe(data=>{
            console.log("File Uploaded !!")
          });
         })

         
      }
    }

  }
