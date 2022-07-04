import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ConfirmationService, MessageService} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {RECAPTCHA_SETTINGS, RecaptchaSettings} from "ng-recaptcha";
import {environment} from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule.setLocale('en-AE'),
  ],
  providers: [ConfirmationService, DialogService, MessageService, DynamicDialogRef,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: environment.captchaSiteKeyV2 } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
