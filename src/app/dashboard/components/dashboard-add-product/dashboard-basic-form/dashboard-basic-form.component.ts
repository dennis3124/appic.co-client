import {AfterViewInit, Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {FileSystemFileEntry, UploadEvent, UploadFile} from 'ngx-file-drop';
import {NgbAccordionConfig, NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {DashboardService} from '../../../services/dashboard.service';
import {PostService} from '../../../../core-module/services/post.service';
import {UtilsService} from '../../../../core-module/services/utils.service';
import {environment} from '../../../../../environments/environment';
import {PostModel} from '../../../../core-module/models/post.model';

@Component({
  selector: 'app-dashboard-basic',
  templateUrl: './dashboard-basic-form.component.html',
  styleUrls: ['./dashboard-basic-form.component.scss']
})

export class DashboardBasicFormComponent implements OnInit, AfterViewInit {
  @Output() done = new EventEmitter<boolean>();
  @Input('postInCreation') postInCreation: PostModel;
  private fileError = '';
  private files: UploadFile[];
  public fileName = '';
  private file;
  private isMobile = false;

  private fileTypes = [
    'image/jpeg',
    'image/pjpeg',
    'image/png'
  ];

  constructor(
              private util: UtilsService,
              private dashboardService: DashboardService,
              private postService: PostService,
              private zone: NgZone) {

  }

  ngAfterViewInit() {


    /* View has initialized, add listener to file change: etc. file upload*/
    const fileImageUpload = document.getElementById('projectImageFile');
    fileImageUpload.addEventListener('change', () => {
      const curFiles = fileImageUpload['files'];
      if (curFiles.length === 0) {
        this.fileName = '';
      } else if (curFiles.length > 0) {
        // Custom validation for image files
        if (this.checkValidFileTypes(curFiles[curFiles.length - 1])) {
          this.fileName = curFiles[curFiles.length - 1].name;
          this.file = curFiles[curFiles.length - 1];
          this.dashboardService.setFile(this.file);
        } else {
          this.fileError = 'Invalid File Type';
        }

        if (this.returnFileSize(curFiles[curFiles.length - 1].size) > 50) {
          this.fileError = 'File size exceeded 50MB';
          this.fileName = '';
          this.file = null;
        }
      }
    });
  }


  ngOnInit() {
    this.isMobile = this.mobileCheck();
    if (this.postInCreation) {
      this.dashboardService.product.name = this.postInCreation.name;
      this.dashboardService.product.description = this.postInCreation.description;
      this.dashboardService.product.category = this.postInCreation.category;
      this.dashboardService.product = this.postInCreation;
      // Go to next step in accordion
      console.log(this.postInCreation);
      this.done.emit(true);
    }
  }

  checkValidFileTypes(fileInput): boolean {
    for (let i = 0; i < this.fileTypes.length; i++) {
      if (fileInput.type === this.fileTypes[i]) {
        return true;
      }
    }
    return false;
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
              this.dashboardService.setFile(this.file);
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

  public finished() {
    // Make a submission to create post;
    this.util.showLoader();
    const companyId = this.dashboardService.getCompany()._id;

    // First upload image
    const formData = new FormData();
    formData.append('image', this.dashboardService.getFile());
    formData.append('companyId', companyId);
    environment.upload = true;
    this.postService.uploadImage(formData).subscribe(data => {
      const imageUrl = data.body.data as String;
      const fileName = imageUrl.split('/')[imageUrl.split('/').length - 1];
      if (data.success) {
        this.dashboardService.setProductImage(imageUrl);
        this.postService.createPost(this.dashboardService.getProduct()).subscribe(post => {
          if (post.success) {
            this.util.hideLoader();
            this.done.emit(true);
          }
        }, err => {
          // Error creating post, remove s3 image to avoid redundancy
          this.postService.removeImage(fileName).subscribe(image => {
            if (image.success) {
              this.util.hideLoader();
              this.util.newMessage(false, 'Error creating new post');
            }
          });
        });
      }
    });
  }

  // noinspection TsLint
  mobileCheck() {
    let check = false;
    (function (a) {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor);
    return check;
  }

  public returnFileSize(size: number): number {
    const number = size;
    const sizeInMb = Math.round((number / 1048576) * 1e2) / 1e2;
    // FIle size in MB
    return sizeInMb;
  }
}

