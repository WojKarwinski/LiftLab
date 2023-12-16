using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LiftLab.Domain.Model
{
    public class WorkoutTemplateExerciseDetail
    {
        public int ExerciseListId { get; set; }
        public string ExerciseName { get; set; }
        public int Sets { get; set; }
        public int Order { get; set; } // Optional order field

    }
}
