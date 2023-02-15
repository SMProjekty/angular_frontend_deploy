import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MakeVisitComponent } from './make-visit/make-visit.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { EditDelServiceComponent } from './edit-del-service/edit-del-service.component';
import { DelVisitComponent } from './del-visit/del-visit.component';
import { VacationsComponent } from './vacations/vacations.component';
import { RaportsComponent } from './raports/raports.component';
import { WorkersComponent } from './workers/workers.component';
import { CalendarObjectComponent } from './calendar-object/calendar-object.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'main', component: MainComponent},
  {path: 'makeVisit', component: MakeVisitComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'adminLogin', component: AdminLoginComponent},
  {path: 'adminMain', component: AdminMainComponent}, //zablokowac bezposrednie wejscie na panel admina
  {path: 'addService', component: AddServiceComponent, canActivate: [AuthGuard]},
  {path: 'editDelService', component: EditDelServiceComponent, canActivate: [AuthGuard]},
  {path: 'delVisit', component: DelVisitComponent, canActivate: [AuthGuard]},
  {path: 'vacations', component: VacationsComponent, canActivate: [AuthGuard]},
  {path: 'raports', component: RaportsComponent},
  {path: 'workers', component: WorkersComponent, canActivate: [AuthGuard]},

  {path: 'calendarObject', component: CalendarObjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
