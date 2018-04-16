import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UtilsService {
  public loaderSubject$ = new BehaviorSubject<boolean>(false);
  public messageSubject$ = new BehaviorSubject<boolean>(false);
  private globalMessage = {
    message: '',
    success: false
  };
  constructor() {}

  showLoader() {
    this.loaderSubject$.next(true);
  }

  hideLoader() {
    this.loaderSubject$.next(false);
  }

  newMessage(success, message) {
    this.globalMessage.message = message;
    this.globalMessage.success = success;

    // Alert message listener about new message
    this.messageSubject$.next(true);
  }

  getMessage() {
    // Alert message listener about no new message
    this.messageSubject$.next(false);
    return this.globalMessage;
  }

}
