namespace LiftLab.Domain.Model
{
    public class Workout
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Name { get; set; }
        public string Note { get; set; }
        public List<Exercise> Exercises { get; set; } = new();
    }
}
