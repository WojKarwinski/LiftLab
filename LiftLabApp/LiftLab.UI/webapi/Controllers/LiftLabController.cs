using LiftLab.Domain;
using LiftLab.Domain.Model;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LiftLabController : ControllerBase
    {
        private readonly WorkoutsManager _workoutsManager;
        public LiftLabController(WorkoutsManager workoutsManager)
        {
            _workoutsManager = workoutsManager;
        }

        [HttpGet("workouts")]
        public IActionResult GetAllWorkouts()
        {
            return Ok(_workoutsManager.GetAllWorkouts());
        }
        [HttpGet("workouts/{id}")]
        public IActionResult GetWorkout(int id)
        {
            return Ok(_workoutsManager.GetWorkoutById(id));
        }

        // get list of all exercises
        [HttpGet("exercises")]
        public IActionResult GetAllExercises()
        {
            return Ok(_workoutsManager.GetAllExercises());
        }

        [HttpGet("templates")]
        public IActionResult GetAllWorkoutTemplates()
        {
            return Ok(_workoutsManager.GetAllWorkoutTemplates());
        }

        [HttpPost("workouts/from-template")]
        public IActionResult CreateWorkoutFromTemplate([FromBody] WorkoutTemplate template)
        {
            return Ok(_workoutsManager.CreateWorkoutFromTemplate(template));
        }

        [HttpDelete("workouts/{id}")]
        public IActionResult DeleteWorkout(int id)
        {
            _workoutsManager.DeleteWorkout(id);
            return Ok();
        }

        [HttpPut("workouts/{id}")]
        public IActionResult UpdateWorkout(int id, [FromBody] Workout workout)
        {
            // check if id matches workout.Id
            if (id != workout.Id)
            {
                return BadRequest();
            }
            _workoutsManager.UpdateWorkout(workout);
            return Ok();
            
        }

    }
}
