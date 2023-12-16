using LiftLab.Domain.Model;

namespace LiftLab.Domain.Interfaces
{
    public interface IWorkoutsRepository
    {
        List<Workout> GetAllWorkouts();

        Workout GetWorkoutById(int workoutId);

        void CreateWorkout(Workout workout);

        void UpdateWorkout(Workout workout);

        void DeleteWorkout(int workoutId);
        void AddSet(int workoutId, int exerciseId, Set set);
        void UpdateSet(int workoutId, Set set);
        void DeleteSet(int workoutId, int setNumber);
        void AddExercise(int workoutId, Exercise exercise);
        void UpdateExercise(int workoutId, Exercise exercise);
        void DeleteExercise(int workoutId, int exerciseNumber);
        void AddExerciseSet(int workoutId, int exerciseNumber, Set set);
        List<ExerciseList> GetAllExercises();

        List<WorkoutTemplate> GetAllWorkoutTemplates();
        Workout CreateWorkoutFromTemplate(WorkoutTemplate template);
    }
}
