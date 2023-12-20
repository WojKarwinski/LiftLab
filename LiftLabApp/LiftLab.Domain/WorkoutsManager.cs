using LiftLab.Domain.Interfaces;
using LiftLab.Domain.Model;

namespace LiftLab.Domain
{
    public class WorkoutsManager
    {
        private readonly IWorkoutsRepository _workoutsRepository;
        public WorkoutsManager(IWorkoutsRepository repository)
        {
            _workoutsRepository = repository;
        }

        public List<Workout> GetAllWorkouts()
        {
            try
            {
                return _workoutsRepository.GetAllWorkouts();
            }catch (Exception ex)
            {
                throw new Exception("Error getting workouts", ex);
            }
            
        }
        public Workout GetWorkoutById(int workoutId)
        {
            return _workoutsRepository.GetWorkoutById(workoutId);
        }

        public void CreateWorkout(Workout workout)
        {
            try
            {
                _workoutsRepository.CreateWorkout(workout);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public void UpdateWorkout(Workout workout)
        {
            _workoutsRepository.UpdateWorkout(workout);
        }

        public void DeleteWorkout(int workoutId)
        {
            _workoutsRepository.DeleteWorkout(workoutId);
        }

        public List<ExerciseList> GetAllExercises()
        {
            return _workoutsRepository.GetAllExercises();
        }

        public List<WorkoutTemplate> GetAllWorkoutTemplates()
        {
            return _workoutsRepository.GetAllWorkoutTemplates();
        }

        public Workout CreateWorkoutFromTemplate(WorkoutTemplate template)
        {
            return _workoutsRepository.CreateWorkoutFromTemplate(template);
        }

        public WorkoutTemplate CreateWorkoutTemplate(WorkoutTemplate template)
        {
            return _workoutsRepository.CreateWorkoutTemplate(template);
        }

        public void DeleteWorkoutTemplate(int id)
        {
            _workoutsRepository.DeleteWorkoutTemplate(id);
        }
    }
}