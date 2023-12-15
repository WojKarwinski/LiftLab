namespace LiftLab.Domain.Model
{
    public class Exercise
    {
        public int ExerciseId { get; set; }
        public int ExerciseListId { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
        public List<Set> Sets { get; set; }
    }
}
