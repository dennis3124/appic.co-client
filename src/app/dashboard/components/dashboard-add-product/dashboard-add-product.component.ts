import {AfterViewInit, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {NgbAccordionConfig, NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {FileSystemDirectoryEntry, FileSystemFileEntry, UploadEvent, UploadFile} from 'ngx-file-drop';
import {DashboardService} from '../../services/dashboard.service';

@Component({
  templateUrl: './dashboard-add-product.component.html',
  styleUrls: ['./dashboard-add-product.component.scss']
})

export class DashboardAddProductComponent implements OnInit, AfterViewInit {
  @ViewChild('acc') accordion;
  private basicDone = false;
  private panel = 1;

  constructor(private config: NgbAccordionConfig, private zone: NgZone, private dashboardService: DashboardService) {
    config.closeOthers = true;
    config.type = 'primary';
  }

  ngAfterViewInit() {
  }


  ngOnInit() {
  }

  beforeChange(event: NgbPanelChangeEvent) {
    // Only allow toggling from done button / back button
    if (event.panelId !== `panel-${this.panel}`) {
      event.preventDefault();
    }
  }

  onDone(done: boolean) {
    if (done) {
      this.basicDone = true;
    }
  }

  onFinishProjectDetails(done: boolean) {
    if (done) {
      this.panel++;
      this.accordion.toggle(`panel-${this.panel}`);
    }
  }
}
