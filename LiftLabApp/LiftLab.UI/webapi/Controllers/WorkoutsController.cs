using LiftLab.Domain;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutsController : ControllerBase
    {
        private readonly WorkoutsManager _workoutsManager;
        public WorkoutsController(WorkoutsManager workoutsManager)
        {
            _workoutsManager = workoutsManager;
        }

        [HttpGet]
        public IActionResult GetAllWorkouts()
        {
            return Ok(_workoutsManager.GetAllWorkouts());
        }
    }
}
