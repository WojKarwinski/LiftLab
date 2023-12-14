using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LiftLab.Domain.Model
{
    public class WorkoutTemplate
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        // A collection to hold exercises and their sets
        public List<WorkoutTemplateExerciseDetail> Exercises { get; set; }
    }
}
