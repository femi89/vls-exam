import {EventInput} from "@fullcalendar/angular";
import {UserDetailInterface} from "@vls/interfaces/auth-interface";

export interface MeetingEventInterface extends EventInput{
  userId: string;
  participants?: UserDetailInterface[];
  description?: string;
}
