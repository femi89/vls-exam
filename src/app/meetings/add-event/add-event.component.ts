import { Component, OnInit } from '@angular/core';
import { MeetingEventInterface } from '@vls/interfaces/meeting-interface';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {DateSelectArg} from "@fullcalendar/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {formatDate} from "@angular/common";
import {UserDetailInterface} from "@vls/interfaces/auth-interface";
import { AuthService } from '@vls/services/auth.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  public dialogData?: DateSelectArg;
  public myMeetings: MeetingEventInterface[] = [];
  meetingForm: FormGroup = new FormGroup({});
  public setDate: Date | undefined;
  public isAllDayEvent = false;
  public minStartTime!: any;
  public defaultTime: any;
  public userDetail!: UserDetailInterface | null;
  public allUsers: UserDetailInterface[] = [];
  public availableUsers: UserDetailInterface[] = [];
  constructor(
    private dynamicDialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }
  ngOnInit(): void {
    this.dialogData = this.dialogConfig.data.selectDateInfo;
    this.myMeetings = this.dialogConfig.data.meetings ?? [];
    const now = new Date();
    this.setDate = this.dialogData?.start ?? new Date();
    this.minStartTime = formatDate(now, 'hh:mm a', 'en-NG', 'GMT+1');
    this.defaultTime = formatDate(this.setDate.setMinutes(+30), 'hh:mm a', 'en-AE', 'GMT+1');
    this.meetingForm = this.formBuilder.group({
      startTime: [this.defaultTime],
      endTime: [this.defaultTime],
      title: [null, [Validators.required]],
      meetingLink: [null, [Validators.required]],
      description: [null, Validators.required],
      participants: [null, Validators.required],
    });
    this.authService.userProfile$.subscribe(res => {
      this.userDetail = res;
    })
    this.authService.allUsers$.subscribe(res => {
      this.allUsers = res ?? [];
      this.availableUsers = this.allUsers.filter(xd => xd.userId !== this.userDetail?.userId) ?? [];
    });
  }

  close(data?: MeetingEventInterface) {
    this.dynamicDialogRef.close(data ?? false);
  }

  saveEvent(): void {
    const formData = this.meetingForm.value;
    // check time in date validity if startTime is in any meeting
    let meetingData: MeetingEventInterface = {
      id: btoa(Math.random().toString()).substr(10, 10),
      title: formData.title,
      userId: this.userDetail?.userId ?? '',
      start: this.convertToDate(formData.startTime).toISOString(),
      description: formData.description,
      participants: formData.participants
    };
    if(!this.isAllDayEvent) {
      meetingData = {...meetingData, end: this.convertToDate(formData.endTime).toISOString()};
    } else {
      meetingData ={...meetingData, end: undefined, allDay: true};
    }
    this.close(meetingData);
  }

  convertToDate(value: string): Date {
    const date  = formatDate((this.setDate ?? new Date()), 'MM/dd/YYYY', 'en-NG', 'GMT+1');
    return new Date(`${date} ${value}`);
  }
  toggleAllDay(event: any) {}
}
