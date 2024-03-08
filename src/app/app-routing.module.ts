import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservationFormComponent } from './reservation/reservation-form/reservation-form.component';
import { ReservationListComponent } from './reservation/reservation-list/reservation-list.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"home", component:HomeComponent},
  {path:"new", component:ReservationFormComponent},
  {path:"list", component:ReservationListComponent},
  {path: "edit/:id", component:ReservationFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
