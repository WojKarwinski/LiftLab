using LiftLab.Domain;
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

        [HttpGet]
        public IActionResult GetAllWorkouts()
        {
            return Ok(_workoutsManager.GetAllWorkouts());
        }
        // get list of all exercises
        [HttpGet("exercises")]
        public IActionResult GetAllExercises()
        {
            return Ok(_workoutsManager.GetAllExercises());
        }
    }
}
