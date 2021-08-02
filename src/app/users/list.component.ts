import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '../_services';
import { Role, User } from '../_models';
@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
  user: User;
  users = null;
  message: string;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe((x) => (this.user = x));
    this.message = 'Current Active User is ' + this.user.firstName;
  }

  ngOnInit() {
    this.accountService
      .getAll()
      .pipe(first())
      .subscribe((users) => (this.users = users));
  }

  get isAdmin() {
    return this.user && this.user.role === Role.isAdmin;
  }
  deleteUser(id: string) {
    const user = this.users.find((x) => x.id === id);
    user.isDeleting = true;
    this.accountService
      .delete(id)
      .pipe(first())
      .subscribe(() => (this.users = this.users.filter((x) => x.id !== id)));
  }
  receiveMessage($event) {
    alert($event);
  }
}
