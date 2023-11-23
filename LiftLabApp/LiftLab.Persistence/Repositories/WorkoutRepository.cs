using LiftLab.Domain.Interfaces;
using LiftLab.Domain.Model;
using Microsoft.Data.SqlClient;

public class WorkoutRepository : IWorkoutsRepository
{
    private readonly string _connectionString;

    public WorkoutRepository(string connectionString)
    {
        _connectionString = connectionString;
    }


    public List<Workout> GetAllWorkouts()
    {
        List<Workout> workouts = new();

        using(SqlConnection connection = new(_connectionString))
        {
            connection.Open();

            string query = @"
        SELECT 
            W.Id AS WorkoutId, W.Date, W.Name AS WorkoutName, W.Note,
            E.Id AS ExerciseId, E.[Order] AS ExerciseOrder, EL.Name AS ExerciseName, EL.MuscleGroup,
            S.SetNumber, S.Reps, S.Weight, S.Rpe
        FROM Workouts W
        LEFT JOIN Exercises E ON W.Id = E.WorkoutId
        LEFT JOIN Sets S ON E.Id = S.ExerciseId
        LEFT JOIN ExerciseList EL ON E.ExerciseListId = EL.Id";

            using(SqlCommand command = new(query, connection))
            {
                using(SqlDataReader reader = command.ExecuteReader())
                {
                    while(reader.Read())
                    {
                        Workout workout = workouts.FirstOrDefault(w => w.Id == reader.GetInt32(reader.GetOrdinal("WorkoutId")));

                        if(workout == null)
                        {
                            workout = new Workout
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("WorkoutId")),
                                Date = reader.GetDateTime(reader.GetOrdinal("Date")),
                                Name = reader.GetString(reader.GetOrdinal("WorkoutName")),
                                Note = reader.IsDBNull(reader.GetOrdinal("Note")) ? null : reader.GetString(reader.GetOrdinal("Note")),
                                Exercises = new List<Exercise>()
                            };
                            workouts.Add(workout);
                        }

                        if(!reader.IsDBNull(reader.GetOrdinal("ExerciseId")))
                        {
                            Exercise exercise = workout.Exercises.FirstOrDefault(e => e.ExerciseId == reader.GetInt32(reader.GetOrdinal("ExerciseId")));

                            if(exercise == null)
                            {
                                exercise = new Exercise
                                {
                                    ExerciseId = reader.GetInt32(reader.GetOrdinal("ExerciseId")),
                                    ExerciseOrder = reader.GetInt32(reader.GetOrdinal("ExerciseOrder")),
                                    Name = reader.GetString(reader.GetOrdinal("ExerciseName")),
                                    Sets = new List<Set>()
                                };

                                workout.Exercises.Add(exercise);
                            }

                            Set set = new Set
                            {
                                SetNumber = reader.IsDBNull(reader.GetOrdinal("SetNumber")) ? 0 : reader.GetInt32(reader.GetOrdinal("SetNumber")),
                                Reps = reader.IsDBNull(reader.GetOrdinal("Reps")) ? 0 : reader.GetInt32(reader.GetOrdinal("Reps")),
                                Weight = reader.IsDBNull(reader.GetOrdinal("Weight")) ? 0 : reader.GetInt32(reader.GetOrdinal("Weight")),
                                Rpe = reader.IsDBNull(reader.GetOrdinal("Rpe")) ? (int?)null : reader.GetInt32(reader.GetOrdinal("Rpe"))
                            };

                            exercise.Sets.Add(set);
                        }
                    }
                }
            }
        }

        return workouts;
    }



    public Workout GetWorkoutById(int workoutId)
    {
        Workout workout = null;

        //using(SqlConnection connection = new(_connectionString))
        //{
        //    connection.Open();

        //    string query = "SELECT * FROM Workouts WHERE Id = @WorkoutId";
        //    using(SqlCommand command = new(query, connection))
        //    {
        //        command.Parameters.AddWithValue("@WorkoutId", workoutId);

        //        using(SqlDataReader reader = command.ExecuteReader())
        //        {
        //            if(reader.Read())
        //            {
        //                workout = MapToWorkout(reader);
        //            }
        //        }
        //    }
        //}

        return workout;
    }

    public void AddWorkout(Workout workout)
    {
        using(SqlConnection connection = new(_connectionString))
        {
            connection.Open();

            string query = "INSERT INTO Workouts (Date, Name, Note) VALUES (@Date, @Name, @Note)";
            using(SqlCommand command = new(query, connection))
            {
                command.Parameters.AddWithValue("@Date", workout.Date);
                command.Parameters.AddWithValue("@Name", workout.Name);
                command.Parameters.AddWithValue("@Note", workout.Note);

                command.ExecuteNonQuery();
            }
        }
    }

    public void UpdateWorkout(Workout workout)
    {
        using(SqlConnection connection = new(_connectionString))
        {
            connection.Open();

            string query = "UPDATE Workouts SET Date = @Date, Name = @Name, Note = @Note WHERE Id = @WorkoutId";
            using(SqlCommand command = new(query, connection))
            {
                command.Parameters.AddWithValue("@WorkoutId", workout.Id);
                command.Parameters.AddWithValue("@Date", workout.Date);
                command.Parameters.AddWithValue("@Name", workout.Name);
                command.Parameters.AddWithValue("@Note", workout.Note);

                command.ExecuteNonQuery();
            }
        }
    }

    public void DeleteWorkout(int workoutId)
    {
        using(SqlConnection connection = new(_connectionString))
        {
            connection.Open();

            string query = "DELETE FROM Workouts WHERE Id = @WorkoutId";
            using(SqlCommand command = new(query, connection))
            {
                command.Parameters.AddWithValue("@WorkoutId", workoutId);

                command.ExecuteNonQuery();
            }
        }
    }



    public void AddSet(int workoutId, Set set)
    {
        throw new NotImplementedException();
    }

    public void UpdateSet(int workoutId, Set set)
    {
        throw new NotImplementedException();
    }

    public void DeleteSet(int workoutId, int setNumber)
    {
        throw new NotImplementedException();
    }

    public void AddExercise(int workoutId, Exercise exercise)
    {
        throw new NotImplementedException();
    }

    public void UpdateExercise(int workoutId, Exercise exercise)
    {
        throw new NotImplementedException();
    }

    public void DeleteExercise(int workoutId, int exerciseNumber)
    {
        throw new NotImplementedException();
    }

    public void AddExerciseSet(int workoutId, int exerciseNumber, Set set)
    {
        throw new NotImplementedException();
    }
}
