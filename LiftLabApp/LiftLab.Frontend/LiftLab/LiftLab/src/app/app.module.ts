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

@NgModule({
  declarations: [
    AppComponent,
    WorkoutComponent,
    ExerciseComponent,
    SetComponent,
    SwipeDirective,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    SliderModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
