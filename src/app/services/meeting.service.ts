import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {MeetingEventInterface} from "@vls/interfaces/meeting-interface";
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(
    private http: HttpClient,
  ) { }
  getEvents(): Observable<MeetingEventInterface[]> {
    return this.http.get<MeetingEventInterface[]>('assets/data/meetings.json');
  }
  saveEvents(data: MeetingEventInterface[]): Observable<any> {
    const payload = {
      file: 'meetings.json',
      data: data
    };
    return this.http.post<any>(environment.jsonApi, payload);
  }
  public getMyMeetings(allMeetings: MeetingEventInterface[], userId?: string): MeetingEventInterface[] {
    if(allMeetings?.length > 0) {
      return allMeetings.filter(meeting => meeting.userId === userId);
    }
    return [];
  }
}
