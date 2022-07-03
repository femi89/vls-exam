import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {EventClickArg} from "@fullcalendar/core";
import {MeetingEventInterface} from "@vls/interfaces/meeting-interface";
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-meeting-detail',
  templateUrl: './meeting-detail.component.html',
  styleUrls: ['./meeting-detail.component.scss']
})
export class MeetingDetailComponent implements OnInit {
  public eventClickInfo!: EventClickArg;
  public meetingDetails!: MeetingEventInterface | undefined;
  public myMeetingEvents!: MeetingEventInterface[];
  startingDate: Date = new Date();
  endDate: Date = new Date();
  constructor(
    private dynamicDialogRef: DynamicDialogRef,
    private dynamicConfig: DynamicDialogConfig,
    private confirmationService: ConfirmationService,
  ) {
    this.eventClickInfo = this.dynamicConfig.data.eventClickInfo;
    this.myMeetingEvents = this.dynamicConfig.data.meetings;
  }

  ngOnInit(): void {
    this.meetingDetails = this.myMeetingEvents?.find(meeting => meeting.id === this.eventClickInfo.event.id);
    this.startingDate = new Date(`${this.meetingDetails?.start}`);
    this.endDate = new Date(`${this.meetingDetails?.end}`);
    console.log(this.meetingDetails)
  }

  public closeDialog(data: any):void {
    this.dynamicDialogRef.close(data ?? null);
  }

  confirmDelete(): void {
    this.confirmationService.confirm({
      header: 'Delete Meeting',
      message: 'Are you sure you want to delete this meeting?',
      acceptLabel: 'Yes, Delete the Meeting',
      rejectLabel: 'No, Dismiss',
      dismissableMask: false,
      accept: () => {this.closeDialog(true)}
    });
  }
}
