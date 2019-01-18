// Components
import { AppComponent } from './app.component';
import { OauthComponent } from './components/oauth/oauth.component'
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LastActivityPreviewComponent } from './components/last-activity-preview/last-activity-preview.component';
import { ActivitiesListComponent } from './components/activities-list/activities-list.component';
// Services
import { AthletesService } from './services/athletes.service'
import { Oauth2Service } from './services/oauth2.service'
import { Configuration } from './classes/configStrava'
import { ActivitiesService } from './services/activities.service';
// Modules
import { AppRoutingModule } from './modules/app-routing.module';
import { materialModule } from './modules/material'
// Autres
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    OauthComponent, 
    DashboardComponent, 
    LastActivityPreviewComponent, 
    ActivitiesListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule, 
    ReactiveFormsModule, 
    BrowserAnimationsModule,
    materialModule,
    LayoutModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    HttpClient,
    Configuration,
    Oauth2Service,
    AthletesService,
    ActivitiesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
