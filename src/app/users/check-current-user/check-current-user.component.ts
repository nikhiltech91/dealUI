import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../../_services';

@Component({
  selector: 'app-check-current-user',
  templateUrl: './check-current-user.component.html',
  styleUrls: ['./check-current-user.component.css'],
})
export class CheckCurrentUserComponent implements OnInit {
  @Input() message: string;
  @Output() messageEvent = new EventEmitter<string>();
  constructor(public accountService: AccountService) {}

  ngOnInit(): void {}
  checkUserRole() {
    this.messageEvent.emit(this.accountService.userValue.role);
  }
}
