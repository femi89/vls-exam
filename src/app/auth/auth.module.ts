import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import {LoginComponent} from "@vls/auth/login/login.component";
import {RegisterComponent} from "@vls/auth/register/register.component";
import {ReactiveFormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {InputTextModule} from "primeng/inputtext";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {RecaptchaModule} from "ng-recaptcha";


@NgModule({
  declarations: [
    AuthComponent, LoginComponent, RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    RecaptchaModule
  ]
})
export class AuthModule { }
