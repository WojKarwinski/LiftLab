import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HistoryComponent } from './history/history.component';
import { WorkoutMenuComponent } from './workout-menu/workout-menu.component';
import { ExerciseMenuComponent } from './exercise-menu/exercise-menu.component';
import { GraphsComponent } from './graphs/graphs.component';
import { WorkoutComponent } from './workout/workout.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'workoutmenu', component: WorkoutMenuComponent },
  { path: 'exercisemenu', component: ExerciseMenuComponent },
  { path: 'graphs', component: GraphsComponent },
  { path: 'workout/:id', component: WorkoutComponent },
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
