import {Component, OnInit} from '@angular/core';
import {UtilsService} from './core-module/services/utils.service';
import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'app';
  private message = false;
  private loader = false;
  private globalMessage = {
    message: '',
    success: false
  };

  constructor(private util: UtilsService, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.util.loaderSubject$.subscribe(data => {
        this.loader = data;
        this.cdRef.detectChanges();
    });

    this.util.messageSubject$.subscribe(data => {
      if (data) {
        this.message = data;
        this.globalMessage = this.util.getMessage();
      }
    });
  }
}
