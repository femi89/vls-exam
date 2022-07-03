import { Component, OnInit } from '@angular/core';
import { AuthService } from '@vls/services/auth.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnInit {
  constructor(
    private confirmationService: ConfirmationService,
    private authService: AuthService
  ) { }
  ngOnInit() {}

  public confirmLogout(): void {
    this.confirmationService.confirm({
      header: 'confirm logout',
      message: 'Are you sure you want to log out',
      acceptLabel: 'logout',
      acceptButtonStyleClass: 'p-button-danger p-button',
      rejectLabel: 'cancel',
      accept: () => {this.completeLogout()}
    })
  }

  private completeLogout(): void {
    this.authService.logout()
  }
}
