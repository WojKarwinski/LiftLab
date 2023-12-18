export interface WorkoutData {
  id: number;
  date: string;
  name: string;
  note: string;
  exercises: Exercise[];
}

export interface Exercise {
  exerciseId: number;
  exerciseListId: number;
  order: number;
  name: string;
  sets: ExerciseSet[];
}

export interface ExerciseSet {
  setNumber: number;
  reps: number;
  weight: number;
  rpe: number | null;
  checked: boolean;
}

export interface ExerciseList {
  id: number;
  name: string;
  muscleGroup: string;
}

export interface Template {
  id: 0;
  name: string;
  description: string;
  exercises: {
    exerciseListId: number;
    exerciseName: string;
    sets: number;
    order: number;
  }[];
}
