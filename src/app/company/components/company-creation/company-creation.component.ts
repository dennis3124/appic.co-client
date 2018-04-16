import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../auth-module/services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompanyService} from '../../../core-module/services/company.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './company-creation.component.html',
  styleUrls: ['./company-creation.component.scss']
})

export class CompanyCreationComponent implements OnInit {
  private creationForm: FormGroup;
  @ViewChild('companyCreation') companyCreation;

  constructor(private auth: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private modal: NgbModal,
              private companyService: CompanyService
              ) {
  }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      alert('You must be logged in to visit this page');
      this.router.navigate(['/login']);
    }

    this.creationForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      companyUrl: '',
      ownerId: this.auth.getUserId()
    });
  }

  create() {
    this.companyService.createCompany(this.creationForm.value).subscribe(data => {
      if (data.success) {
        this.modal.open(this.companyCreation, {centered: true});
      }
    });
  }
}

