import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule if you're using ngModel

import { AppComponent } from './app.component';
import { WorkoutComponent } from '../workout/workout.component';
import { ExerciseComponent } from '../exercise/exercise.component';
import { SetComponent } from '../set/set.component';

@NgModule({
    declarations: [
        AppComponent,
        WorkoutComponent,
        ExerciseComponent,
        SetComponent
    ],
    imports: [
        BrowserModule,
        FormsModule // Make sure to import this if you're using forms
    ],
    providers: [],
})
export class AppModule {
    ngDoBootstrap(app) {
        app.bootstrapApplication(AppComponent);
    }
}