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
                    int workoutIdOrdinal = reader.GetOrdinal("WorkoutId");
                    int dateOrdinal = reader.GetOrdinal("Date");
                    int nameOrdinal = reader.GetOrdinal("WorkoutName");
                    int noteOrdinal = reader.GetOrdinal("Note");
                    int exerciseIdOrdinal = reader.GetOrdinal("ExerciseId");
                    int exerciseOrderOrdinal = reader.GetOrdinal("ExerciseOrder");
                    int exerciseNameOrdinal = reader.GetOrdinal("ExerciseName");
                    int setNumberOrdinal = reader.GetOrdinal("SetNumber");
                    int repsOrdinal = reader.GetOrdinal("Reps");
                    int weightOrdinal = reader.GetOrdinal("Weight");
                    int rpeOrdinal = reader.GetOrdinal("Rpe");

                    while(reader.Read())
                    {
                        Workout workout = workouts.FirstOrDefault(w => w.Id == reader.GetInt32(workoutIdOrdinal));

                        if(workout == null)
                        {
                            workout = new Workout
                            {
                                Id = reader.GetInt32(workoutIdOrdinal),
                                Date = reader.GetDateTime(dateOrdinal),
                                Name = reader.GetString(nameOrdinal),
                                Note = reader.IsDBNull(noteOrdinal) ? null : reader.GetString(noteOrdinal),
                                Exercises = new List<Exercise>()
                            };
                            workouts.Add(workout);
                        }

                        if(!reader.IsDBNull(exerciseIdOrdinal))
                        {
                            Exercise exercise = new()
                            {
                                ExerciseId = reader.GetInt32(exerciseIdOrdinal),
                                ExerciseOrder = reader.GetInt32(exerciseOrderOrdinal),
                                Name = reader.GetString(exerciseNameOrdinal),
                                Sets = new List<Set>()
                            };

                            Set set = new()
                            {
                                SetNumber = reader.IsDBNull(setNumberOrdinal) ? 0 : reader.GetInt32(setNumberOrdinal),
                                Reps = reader.IsDBNull(repsOrdinal) ? 0 : reader.GetInt32(repsOrdinal),
                                Weight = reader.IsDBNull(weightOrdinal) ? 0 : reader.GetInt32(weightOrdinal),
                                Rpe = reader.IsDBNull(rpeOrdinal) ? (int?)null : reader.GetInt32(rpeOrdinal)
                            };

                            exercise.Sets.Add(set);
                            workout.Exercises.Add(exercise);
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
