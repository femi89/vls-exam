import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CalendarOptions, DateSelectArg, EventApi, EventClickArg} from "@fullcalendar/core";
import { INITIAL_EVENTS, createEventId } from '@vls/models/event-utils';
import {MeetingService} from "@vls/services/meeting.service";
import {EventInput} from "@fullcalendar/angular";
import {map} from "rxjs";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {AddEventComponent} from "@vls/meetings/add-event/add-event.component";
import {MeetingEventInterface} from "@vls/interfaces/meeting-interface";
import {MessageService} from "primeng/api";
import {UserDetailInterface} from "@vls/interfaces/auth-interface";
import {AuthService} from "@vls/services/auth.service";
import {MeetingDetailComponent} from "@vls/meetings/meeting-detail/meeting-detail.component";
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, AfterViewInit {
  public events: EventInput[] = [];
  calendarVisible = true;
  calendarOptions!: CalendarOptions;
  currentEvents: EventApi[] = [];
  public meetingEvents: MeetingEventInterface[] = [];
  public myMeetingEvents: MeetingEventInterface[] = [];
  public userDetail!: UserDetailInterface | null;
  constructor(
    private meetingService: MeetingService,
    private dialogService: DialogService,
    private dialogRef: DynamicDialogRef,
    private messageService: MessageService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.authService.userProfile$.subscribe(res => {
      this.userDetail = res;
    })
    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialView: 'dayGridMonth',
      initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
      events: this.events,
      weekends: false,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this)
    };
    this.fetchMeetings();
  }
  ngAfterViewInit() {

  }
  private fetchMeetings(): void{
    this.meetingService.getEvents().subscribe(events => {
      this.meetingEvents = events;
      this.myMeetingEvents = this.meetingService.getMyMeetings(events, this.userDetail?.userId);
      this.calendarOptions.events = this.myMeetingEvents;
      console.log(this.myMeetingEvents);
    });
  }
  handleDateSelect(selectInfo: DateSelectArg) {
    const eventDialogRef: DynamicDialogRef = this.dialogService.open(AddEventComponent, {
      data: {selectDateInfo: selectInfo, meetings: this.myMeetingEvents},
      width: '40vw',
      style: {"max-width": "90%", 'height': '100%'},
      header: 'Create a new meeting',
    });
    eventDialogRef.onClose.subscribe(res => {
      if(res) {
        this.completeSaveEvent(res, selectInfo);
      }
    })
  }

  handleEventClick(clickInfo: EventClickArg): void {
    const eventDialogRef: DynamicDialogRef = this.dialogService.open(MeetingDetailComponent, {
      data: {eventClickInfo: clickInfo, meetings: this.myMeetingEvents},
      width: '40vw',
      style: {"max-width": "90%", 'height': '100%'},
      header: 'Meeting Detail',
    });
    eventDialogRef.onClose.subscribe(res => {
      if(res) {
        this.completeDeleteMeeting(clickInfo.event.id);
        clickInfo.event.remove();
      }
    })
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  completeSaveEvent(data: MeetingEventInterface, selectInfo: DateSelectArg):void {
    const $reqData = [...this.meetingEvents, data];
    this.meetingService.saveEvents($reqData).subscribe(res => {
      const calendarApi = selectInfo.view.calendar;
      calendarApi.unselect();
      this.meetingEvents = $reqData;
      this.myMeetingEvents = [...this.myMeetingEvents, data];
      this.calendarOptions.events = this.myMeetingEvents;
      this.messageService.add({summary: 'Saved', detail: 'meeting event created', severity: 'success'});
    })
  }

  private completeDeleteMeeting(eventId: string): void {
    this.meetingEvents = this.meetingEvents.filter(xd => xd.id !== eventId) ?? [];
    this.myMeetingEvents = this.myMeetingEvents.filter(xd => xd.id !== eventId) ?? [];
    this.meetingService.saveEvents(this.meetingEvents).subscribe(res => {
      this.messageService.add({summary: 'Saved', detail: 'meeting Deleted', severity: 'success'});
    })
  }
}
