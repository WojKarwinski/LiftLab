namespace LiftLab.Domain.Model
{
    public class Set
    {
        public int SetNumber { get; set; }
        public int Reps { get; set; }
        public int Weight { get; set; }
        public int? Rpe { get; set; } = 0;
    }
}
