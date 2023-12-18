import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkoutComponent } from './workout/workout.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { SetComponent } from './set/set.component';
import { SliderModule } from 'primeng/slider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SwipeDirective } from '../app/lib/swipe.directive';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { HistoryComponent } from './history/history.component';
import { WorkoutMenuComponent } from './workout-menu/workout-menu.component';
import { ExerciseMenuComponent } from './exercise-menu/exercise-menu.component';
import { GraphsComponent } from './graphs/graphs.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NgChartsModule } from 'ng2-charts';
import { WarningModalComponent } from './warning-modal/warning-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    WorkoutComponent,
    ExerciseComponent,
    SetComponent,
    SwipeDirective,
    ProfileComponent,
    HistoryComponent,
    WorkoutMenuComponent,
    ExerciseMenuComponent,
    GraphsComponent,
    MainPageComponent,
    WarningModalComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    SliderModule,
    FontAwesomeModule,
    NgbModalModule,
    BsDropdownModule.forRoot(),
    HttpClientModule,
    NgChartsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
