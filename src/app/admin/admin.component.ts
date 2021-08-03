import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '../_services';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
})
export class AdminComponent implements OnInit {
  productDialog: boolean;
  products: [];
  product: any;
  selectedProducts: [];
  submitted: boolean;
  roleTitle: any;
  hourlyRatesList: any;
  saveRateResponse: string;
  addform: FormGroup;
  saveRateResponseMessage: string;
  locationList: Object;
  EditRoleMappingID: any;
  saveFormMode: string;
  formTitle: string;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.titleroles();
    this.getAllLocations();
    this.addform = this.formBuilder.group({
      LocationID: [, Validators.required],
      HourlyRate: ['', Validators.required],
      RoleName: ['', Validators.required],
      LocationName: [''],
      LocationCode: [''],
    });
  }
  get f() {
    return this.addform.controls;
  }

  openNew() {
    this.submitted = false;
    this.productDialog = true;
    this.saveFormMode = 'new';
    this.formTitle = 'Add New Role';
  }

  editProduct(params) {
    this.saveFormMode = 'edit';
    this.formTitle = 'Edit Role';
    this.EditRoleMappingID = params.RoleMappingID;
    this.addform.controls['LocationID'].setValue(params.LocationID);
    this.addform.controls['HourlyRate'].setValue(params.HourlyRate);
    this.addform.controls['RoleName'].setValue(params.RoleName);

    this.productDialog = true;
  }
  updateRoleMapping() {
    this.saveRateResponse = '';
    this.submitted = true;
    if (this.addform.invalid) {
      return;
    }
    this.accountService
      .updateLocationRoles(this.EditRoleMappingID, this.addform.value)
      .subscribe({
        next: (data) => {
          if (data.ResponseID == 105) {
            this.titleroles();
            this.productDialog = false;
            this.submitted = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: data.ResponseMessage,
              life: 3000,
            });
          } else {
            this.messageService.add({
              severity: 'warn',
              summary: 'Alert',
              detail: data.ResponseMessage,
              life: 3000,
            });
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error,
            life: 3000,
          });
        },
      });
  }
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }
  deleteRoleMapping(RoleMappingID) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected role?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.confirmDeleteRoleMapping(RoleMappingID);
      },
    });
  }
  confirmDeleteRoleMapping(RoleMappingID) {
    this.accountService.delete(RoleMappingID).subscribe({
      next: (data) => {
        if (data.ResponseID == 107) {
          this.titleroles();
          this.productDialog = false;
          this.submitted = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: data.ResponseMessage,
            life: 3000,
          });
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'Alert',
            detail: data.ResponseMessage,
            life: 3000,
          });
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error,
          life: 3000,
        });
      },
    });
  }
  titleroles() {
    this.accountService
      .getTitleRoles()
      .pipe(first())
      .subscribe((result) => (this.roleTitle = result));
  }
  getAllLocations() {
    this.accountService
      .getAllLocations()
      .pipe(first())
      .subscribe((result) => (this.locationList = result));
  }
  saveNewHourlyRate() {
    this.saveRateResponse = '';
    this.submitted = true;
    if (this.addform.invalid) {
      return;
    }
    this.accountService.saveHourlyRate(this.addform.value).subscribe({
      next: (data) => {
        if (data.ResponseID == 104) {
          this.titleroles();
          this.productDialog = false;
          this.submitted = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: data.ResponseMessage,
            life: 3000,
          });
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'Alert',
            detail: data.ResponseMessage,
            life: 3000,
          });
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error,
          life: 3000,
        });
      },
    });
  }
}
