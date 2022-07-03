import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingsRoutingModule } from './meetings-routing.module';
import { MeetingsComponent } from './meetings.component';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {FullCalendarModule} from "@fullcalendar/angular";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { IndexComponent } from './index/index.component';
import { AddEventComponent } from './add-event/add-event.component';
import {ToastModule} from "primeng/toast";
import {CalendarModule} from "primeng/calendar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputTextModule} from "primeng/inputtext";
import {CheckboxModule} from "primeng/checkbox";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {DialogModule} from "primeng/dialog";
import { MeetingDetailComponent } from './meeting-detail/meeting-detail.component';
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin,
  listPlugin
]);

@NgModule({
  declarations: [
    MeetingsComponent,
    IndexComponent,
    AddEventComponent,
    MeetingDetailComponent
  ],
  imports: [
    CommonModule,
    MeetingsRoutingModule,
    ConfirmDialogModule,
    FullCalendarModule,
    FullCalendarModule,
    ToastModule,
    CalendarModule,
    ReactiveFormsModule,
    InputTextareaModule,
    InputTextModule,
    CheckboxModule,
    FormsModule,
    NgxMaterialTimepickerModule,
    DialogModule,
    DropdownModule,
    MultiSelectModule
  ]
})
export class MeetingsModule { }
