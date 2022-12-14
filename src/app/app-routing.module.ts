import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MakeVisitComponent } from './make-visit/make-visit.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'main', component: MainComponent},
  {path: 'makeVisit', component: MakeVisitComponent},
  {path: 'calendar', component: CalendarComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
