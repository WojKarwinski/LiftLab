using LiftLab.Domain.Interfaces;
using System.Configuration;

namespace LiftLab.Utils
{
    public static class RepositoryFactory
    {
        public static IWorkoutsRepository WorkoutRepository { get { return new WorkoutRepository(ConfigurationManager.ConnectionStrings["LiftLabDB"].ConnectionString); } }
    }
}
