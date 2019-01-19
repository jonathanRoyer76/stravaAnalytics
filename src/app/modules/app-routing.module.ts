import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { DashboardComponent } from '../components/dashboard/dashboard.component'
import { ActivitiesListComponent } from '../components/activities-list/activities-list.component'

const routes: Routes = [     
  { path: 'activitiesList', component : ActivitiesListComponent }, 
  { path: 'dashboard', component : DashboardComponent }, 
  { path: '', component : DashboardComponent },
  { path : '**', redirectTo : '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
