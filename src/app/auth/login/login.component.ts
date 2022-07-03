import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import {RegisterPayloadInterface} from "@vls/interfaces/auth-interface";
import { AuthService } from '@vls/services/auth.service';
import {MessageService} from "primeng/api";
import * as bcrypt from "bcryptjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginFormGroup: FormGroup = new FormGroup({});
  public showPassword = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(10)]]
    })
  }

  public completeLogin(): void {
    const formData: RegisterPayloadInterface = this.loginFormGroup.value;
    this.authService.getAllUsers().subscribe(res => {
      if(res && res.length > 0) {
        const userDetail= res?.find(user => user.email === formData.userName || user.userName === formData.userName);
        if(userDetail && bcrypt.compareSync(formData?.password, userDetail?.password)) {
          this.authService.setAppUsers(res);
          this.authService.setUserProfile(userDetail);
          this.router.navigate(['meetings']);
          this.messageService.add({
            summary: 'Nice',
            detail: 'Login successful',
            severity: 'success',
          })
          return;
        }
      }
        this.messageService.add({
          summary: 'Failed to login',
          detail: 'Invalid email/username or password',
          severity: 'error',
        })
    })
  }


  public toggleMask(): void {
    this.showPassword = !this.showPassword;
  }
}
