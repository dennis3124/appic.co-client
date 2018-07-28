import {AfterViewInit, Component, EventEmitter, Input, NgZone, Output, ViewChild} from '@angular/core';
import {FileSystemFileEntry, UploadEvent, UploadFile} from 'ngx-file-drop';
import {DashboardService} from '../../../services/dashboard.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PostService} from '../../../../core-module/services/post.service';
import {environment} from '../../../../../environments/environment';
import {UtilsService} from '../../../../core-module/services/utils.service';

@Component({
  selector: 'app-dashboard-story',
  templateUrl: './dashboard-story.component.html',
  styleUrls: ['./dashboard-story.component.scss']
})

export class DashboardStoryComponent implements AfterViewInit {
  @Input('post') post;
  @Output() done = new EventEmitter<boolean>();
  @ViewChild('uploadModal') uploadModal: any;
  @ViewChild('ckeditor') ckeditor: any;
  private fileName = '';
  private files: UploadFile[];
  private file;
  private fileError = '';
  private htmlContent;


  constructor(private modalService: NgbModal, private dashboardService: DashboardService,
              private zone: NgZone, private postService: PostService, private util: UtilsService) {
  }

  ngAfterViewInit() {
    this.htmlContent = this.post.story || '';

    /* View has initialized, add listener to file change: etc. file upload*/
    const fileVideoUpload = document.getElementById('projectVideo');
    fileVideoUpload.addEventListener('change', () => {
      const curFiles = fileVideoUpload['files'];
      if (curFiles.length === 0) {
        this.fileName = '';
      } else if (curFiles.length > 0) {
        // Custom validation for image files
        if (this.checkValidFileTypes(curFiles[curFiles.length - 1])) {
          this.fileName = curFiles[curFiles.length - 1].name;
          this.file = curFiles[curFiles.length - 1];
        } else {
          this.fileError = 'Invalid File Type';
        }

        if (this.returnFileSize(curFiles[curFiles.length - 1].size) > 1000) {
          this.fileError = 'File size exceeded 1 GB';
          this.fileName = '';
          this.file = null;
        }
      }
    });
  }

  public dropped(event: UploadEvent) {
    this.files = event.files;
    if (event.files.length > 1) {
      this.fileError = 'You can only upload 1 file';
      return;
    }
    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.zone.run(() => {
            // Here you can access the real file
            if (this.checkValidFileTypes(file)) {
              this.fileName = file.name;
              this.file = file;
            } else {
              this.fileError = 'Invalid File Type';
            }

            if (this.returnFileSize(file.size) > 50) {
              this.fileError = 'File size exceeded 50MB';
              this.fileName = '';
              this.file = null;
            }
          });
        });
      } else {
        // It was a directory;
        return;
      }
    }
  }


  public returnFileSize(size: number): number {
    const number = size;
    const sizeInMb = Math.round((number / 1048576) * 1e2) / 1e2;
    // FIle size in MB
    return sizeInMb;
  }

  checkValidFileTypes(fileInput): boolean {
    console.log(fileInput);
    const type = fileInput.type.split('/');
    if (type[0] === 'video') {
      return true;
    }
    return false;
  }

  finished() {
    if (this.post) {
      this.handleEditStory();
      return;
    }

    this.util.showLoader();
    const companyId = this.dashboardService.getCompany()._id;


    // Upload video to server
    const formData = new FormData();
    formData.append('video', this.file);
    formData.append('companyId', companyId);
    environment.upload = true;
    this.postService.uploadVideo(formData).subscribe(data => {
      const videoUrl = data.body.data as String;
      const fileName = videoUrl.split('/')[videoUrl.split('/').length - 1];
      if (data.success) {
        this.dashboardService.setProductVideo(videoUrl);
        this.dashboardService.product.status = 'Development';
        this.dashboardService.product.story = this.htmlContent;
        // Video uploaded successfully, update post
        this.postService.updatePost(this.dashboardService.getProduct()).subscribe(post => {
          if (post.success) {
            this.util.hideLoader();
            this.done.emit(true);
          }
        }, err => {
          // Error creating post, remove s3 image to avoid redundancy
          this.postService.removeVideo(fileName).subscribe(video => {
            if (video.success) {
              this.util.hideLoader();
              this.util.newMessage(false, 'Error creating post');
            }
          });
        });
      }
    }, err => {
      this.util.hideLoader();
      this.util.newMessage(false, 'Error creating new post');

    });

  }

  handleEditStory() {
    this.util.showLoader();
    const companyId = this.dashboardService.getCompany()._id;

    // Variables for edit
    const oldImageUrl = this.post.video;
    const oldFileName = oldImageUrl.split('/')[oldImageUrl.split('/').length - 1];
    if (this.file) {
      // New file, upload new video
      // Upload video to server
      const formData = new FormData();
      formData.append('video', this.file);
      formData.append('companyId', companyId);
      environment.upload = true;
      this.postService.uploadVideo(formData).subscribe(data => {
        if (data.success) {
          const videoUrl = data.body.data as String;
          this.dashboardService.setProductVideo(videoUrl);
          this.dashboardService.product.status = 'Development';
          this.dashboardService.product.story = this.htmlContent;
          this.postService.updatePost(this.dashboardService.getProduct()).subscribe(post => {
            if (post.success) {
              this.util.hideLoader();
              this.done.emit(true);
            }
          });
          // remove old video
          this.postService.removeVideo(oldFileName).subscribe(function (deleteVideo) {
          });
        }
      });
    } else {
      // No new video
      this.dashboardService.setProductVideo(oldImageUrl);
      this.dashboardService.product.status = 'Development';
      this.dashboardService.product.story = this.htmlContent;
      this.postService.updatePost(this.dashboardService.getProduct()).subscribe(post => {
        if (post.success) {
          this.util.hideLoader();
          this.util.newMessage(true, 'Successfully updated product story');

        }
      });
    }
  }

  /* Functions for editor */

  onChange(ev) {
    console.log(ev);
  }

  onEditorChange(ev) {
    // console.log(ev);
  }

  onReady(ev) {
    // console.log(ev);
  }

  onFocus(ev) {
    // console.log(ev);
  }

  onBlur(ev) {
    // console.log(ev);
  }

  onContentDom(ev) {
    // console.log(ev);
  }

  onFileUploadRequest(ev) {
    console.log(ev);
  }

}
