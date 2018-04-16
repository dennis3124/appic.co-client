import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UserRegistrationModel} from '../../models/token-payload.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  private credentials: UserRegistrationModel = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  };
  constructor(private auth: AuthService, private fb: FormBuilder) {}
  ngOnInit() {
    this._initForm();
  }

  register() {
    environment.auth = true;
    this.auth.createUser(this.registerForm.value).subscribe( res => {
      console.log(res);
      environment.auth = false;
    });

  }

  _initForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }
}
