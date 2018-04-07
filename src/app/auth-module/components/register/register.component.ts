import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {TokenPayloadModel} from '../../models/token-payload.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  private credentials: TokenPayloadModel = {
    Email: '',
    password: '',
    FirstName: '',
    LastName: ''
  }
  constructor(private auth: AuthService) {}
  ngOnInit() {}

  register() {
    this.auth.createUser(this.credentials).subscribe( res => {
      console.log(res);
    });
  }
}
