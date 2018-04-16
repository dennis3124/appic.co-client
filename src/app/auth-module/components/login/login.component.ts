import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  @ViewChild('loginError') loginError;
  private loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private modal: NgbModal,
    private router: Router

  ) {}

  ngOnInit() {
    this._initLogin();
  }


  _initLogin() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    environment.auth = true;
    this.auth.login(this.loginForm.value).subscribe(data => {
      if (data.token && data.user) {
        // User login successful
        environment.auth = false;
        this.router.navigate(['/home']);
      }
    }, err => {
      this.open(this.loginError);
    });
  }


  open(content) {
    this.modal.open(content, { centered: true });
  }



}
