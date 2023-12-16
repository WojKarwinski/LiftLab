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
            return _workoutsRepository.GetAllWorkouts();
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

        public void AddSet(int workoutId, Set set)
        {
            //_workoutsRepository.AddSet(workoutId, set);
        }

        public void UpdateSet(int workoutId, Set set)
        {
            _workoutsRepository.UpdateSet(workoutId, set);
        }

        public void DeleteSet(int workoutId, int setNumber)
        {
            _workoutsRepository.DeleteSet(workoutId, setNumber);
        }

        public void AddExercise(int workoutId, Exercise exercise)
        {
            _workoutsRepository.AddExercise(workoutId, exercise);
        }

        public void UpdateExercise(int workoutId, Exercise exercise)
        {
            _workoutsRepository.UpdateExercise(workoutId, exercise);
        }

        public void DeleteExercise(int workoutId, int exerciseNumber)
        {
            _workoutsRepository.DeleteExercise(workoutId, exerciseNumber);
        }

        public void AddExerciseSet(int workoutId, int exerciseNumber, Set set)
        {
            _workoutsRepository.AddExerciseSet(workoutId, exerciseNumber, set);
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
    }
}
