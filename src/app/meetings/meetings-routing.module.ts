import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MeetingsComponent} from "@vls/meetings/meetings.component";

const routes: Routes = [
  {
    path: '',
    component: MeetingsComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingsRoutingModule { }
