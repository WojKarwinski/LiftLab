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
        
        List<ExerciseList> GetAllExercises();

        List<WorkoutTemplate> GetAllWorkoutTemplates();
        Workout CreateWorkoutFromTemplate(WorkoutTemplate template);
        WorkoutTemplate CreateWorkoutTemplate(WorkoutTemplate template);
        void DeleteWorkoutTemplate(int id);
    }
}
