import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@vls/services/auth.service';
import {MessageService} from 'primeng/api';
import {RegisterPayloadInterface} from "@vls/interfaces/auth-interface";
import {Router} from "@angular/router";
import * as bcrypt from 'bcryptjs';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registrationForm: FormGroup = new FormGroup({});
  public isShowingPassword = false;
  captchaSiteKey = environment.captchaSiteKeyV2;
  public recaptchaVerified = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.minLength(3)]],
      lastName: [null, [Validators.required, Validators.minLength(3)]],
      userName: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required,  Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{10,}')
      ]],
    })
  }

  public completeRegistration(): void {
    const formData: RegisterPayloadInterface = this.registrationForm.value;
    let allUsers: RegisterPayloadInterface[] = [];
    // check if the user already exist
    this.authService.getAllUsers().subscribe(res => {
      if(res && res.length > 0) {
        allUsers = res;
        const user= res.find(user => user.email === formData.email || user.userName === formData.userName);
        if(user) {
          this.messageService.add({
            summary: 'Registration failed',
            detail: 'username or email is associated with another user',
            severity: 'error',
          })
          return;
        }
      }
      this.submitRegistration(allUsers);
    })
  }

  private submitRegistration(users: RegisterPayloadInterface[]): void {
    const formData: RegisterPayloadInterface = this.registrationForm.value;
    const salt = bcrypt.genSaltSync(10);
    formData.password = bcrypt.hashSync(formData.password, salt);
    formData.userId = btoa(Math.random().toString()).substr(10, 10);
    users.push(formData);
    this.authService.register(users).subscribe (res => {
      if(res) {
        this.messageService.add({
          summary: 'Registration successful',
          detail: 'Registration successful, Please proceed to Login',
          severity: 'success'
        });
        this.router.navigate(['auth']);
      }
    })
  }

  public toggleShowPassword(): void {
    this.isShowingPassword = !this.isShowingPassword;
  }

  resolved(event: string) {
    if(event) {
      this.recaptchaVerified = true;
    } else {
      this.recaptchaVerified = false;
    }
  }

  errored($event: []) {
    this.recaptchaVerified = false;
  }
}
