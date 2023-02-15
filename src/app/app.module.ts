import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SharedService } from './shared.service';
import { CalendarService} from './calendar.service';
import { MakeVisitComponent } from './make-visit/make-visit.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { EditDelServiceComponent } from './edit-del-service/edit-del-service.component';
import { DelVisitComponent } from './del-visit/del-visit.component';
import { VacationsComponent } from './vacations/vacations.component';
import { RaportsComponent } from './raports/raports.component';
import { CalendarObjectComponent } from './calendar-object/calendar-object.component';
import { ClockComponent } from './clock/clock.component';
import { WorkersComponent } from './workers/workers.component';
import { AuthGuard } from './auth.guard';
import { CalendarMvisitComponent } from './calendar-mvisit/calendar-mvisit.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MakeVisitComponent,
    CalendarComponent,
    AdminLoginComponent,
    AdminMainComponent,
    AddServiceComponent,
    EditDelServiceComponent,
    DelVisitComponent,
    VacationsComponent,
    RaportsComponent,
    CalendarObjectComponent,
    ClockComponent,
    WorkersComponent,
    CalendarMvisitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SharedService, CalendarService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
