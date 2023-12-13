export interface WorkoutData {
  id: number;
  date: string;
  name: string;
  note: string;
  exercises: Exercise[];
}

export interface Exercise {
  exerciseId: number;
  exerciseOrder: number;
  name: string;
  sets: ExerciseSet[];
}

export interface ExerciseSet {
  setNumber: number;
  reps: number;
  weight: number;
  rpe: number | null;
}

export interface ExerciseList {
  id: number;
  name: string;
  muscleGroup: string;
}
