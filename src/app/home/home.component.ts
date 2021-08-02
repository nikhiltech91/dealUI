import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { AccountService } from '../_services';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  user: User;
  selectedCity: any;
  roleTitle: any;
  hourlyRatesList: any;
  form: FormGroup;
  submitted: boolean = false;
  response: Object;
  saveRateResponse: any;
  saveRateResponseMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {
    this.user = this.accountService.userValue;
    this.titleroles();
    this.allHourlyRates();
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      MappingID: [, Validators.required],
      HourlyRate: ['', Validators.required],
    });
  }
  get f() {
    return this.form.controls;
  }

  titleroles() {
    this.accountService
      .getTitleRoles()
      .pipe(first())
      .subscribe((result) => (this.roleTitle = result));
  }
  allHourlyRates() {
    this.accountService
      .getallHourlyRates()
      .pipe(first())
      .subscribe((result) => (this.hourlyRatesList = result));
  }
  saveNewHourlyRate() {
    this.saveRateResponse = '';
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.accountService.saveHourlyRate(this.form.value).subscribe({
      next: (data) => {
        if (data.ResponseID == 104) {
          this.saveRateResponse = 'success';
          this.saveRateResponseMessage = data.ResponseMessage;
        } else {
          this.saveRateResponse = 'error';
          this.saveRateResponseMessage = data.ResponseMessage;
        }
      },
      error: (error) => {},
    });
  }
}
