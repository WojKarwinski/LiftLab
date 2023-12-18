using LiftLab.Domain;
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
            E.Id AS ExerciseId, E.[Order] AS ExerciseOrder,EL.Id AS ExerciseListId, EL.Name AS ExerciseName, EL.MuscleGroup,
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
                                    ExerciseListId = reader.GetInt32(reader.GetOrdinal("ExerciseListId")),
                                    Order = reader.GetInt32(reader.GetOrdinal("ExerciseOrder")),
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
        Workout workout = new();
        using(SqlConnection connection = new(_connectionString))
        {
            connection.Open();
            string query = @"
        SELECT 
             W.Id AS WorkoutId, W.Date, W.Name AS WorkoutName, W.Note,
             E.Id AS ExerciseId, E.[Order] AS ExerciseOrder, EL.Id AS ExerciseListId, EL.Name AS ExerciseName, EL.MuscleGroup,
             S.SetNumber, S.Reps, S.Weight, S.Rpe

        FROM Workouts W
        LEFT JOIN Exercises E ON W.Id = E.WorkoutId
        LEFT JOIN Sets S ON E.Id = S.ExerciseId
        LEFT JOIN ExerciseList EL ON E.ExerciseListId = EL.Id
        WHERE W.Id = @WorkoutId";
            using(SqlCommand command = new(query, connection))
            {
                command.Parameters.AddWithValue("@WorkoutId", workoutId);
                using(SqlDataReader reader = command.ExecuteReader())
                {
                    while(reader.Read())
                    {
                        if(workout.Id == 0)
                        {
                            workout = new Workout
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("WorkoutId")),
                                Date = reader.GetDateTime(reader.GetOrdinal("Date")),
                                Name = reader.GetString(reader.GetOrdinal("WorkoutName")),
                                Note = reader.IsDBNull(reader.GetOrdinal("Note")) ? null : reader.GetString(reader.GetOrdinal("Note")),
                                Exercises = new List<Exercise>()
                            };
                        }
                        if(!reader.IsDBNull(reader.GetOrdinal("ExerciseId")))
                        {
                            Exercise exercise = workout.Exercises.FirstOrDefault(e => e.ExerciseId == reader.GetInt32(reader.GetOrdinal("ExerciseId")));
                            if(exercise == null)
                            {
                                exercise = new Exercise
                                {
                                    ExerciseId = reader.GetInt32(reader.GetOrdinal("ExerciseId")),
                                    Order = reader.GetInt32(reader.GetOrdinal("ExerciseOrder")),
                                    ExerciseListId = reader.GetInt32(reader.GetOrdinal("ExerciseListId")),
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
        return workout;
    }

    public void CreateWorkout(Workout workout)
    {
        using(SqlConnection connection = new(_connectionString))
        {
            connection.Open();
            string query = "INSERT INTO Workouts (Date, Name, Note) VALUES (@Date, @Name, @Note); SELECT SCOPE_IDENTITY();";
            using(SqlCommand command = new(query, connection))
            {
                command.Parameters.AddWithValue("@Date", workout.Date);
                command.Parameters.AddWithValue("@Name", workout.Name);
                command.Parameters.AddWithValue("@Note", workout.Note);
                workout.Id = Convert.ToInt32(command.ExecuteScalar());
            }
            foreach(Exercise exercise in workout.Exercises)
            {
                query = "INSERT INTO Exercises (WorkoutId, ExerciseListId, [Order]) VALUES (@WorkoutId, @ExerciseListId, @Order); SELECT SCOPE_IDENTITY();";
                using(SqlCommand command = new(query, connection))
                {
                    command.Parameters.AddWithValue("@WorkoutId", workout.Id);
                    command.Parameters.AddWithValue("@ExerciseListId", exercise.ExerciseListId);
                    command.Parameters.AddWithValue("@Order", exercise.Order);
                    exercise.ExerciseId = Convert.ToInt32(command.ExecuteScalar());
                }
                foreach(Set set in exercise.Sets)
                {
                    query = "INSERT INTO Sets (ExerciseId,WorkoutId, SetNumber, Reps, Weight, Rpe) VALUES (@ExerciseId,@WorkoutId, @SetNumber, @Reps, @Weight, @Rpe)";
                    using(SqlCommand command = new(query, connection))
                    {
                        command.Parameters.AddWithValue("@ExerciseId", exercise.ExerciseId);
                        command.Parameters.AddWithValue("@WorkoutId", workout.Id);
                        command.Parameters.AddWithValue("@SetNumber", set.SetNumber);
                        command.Parameters.AddWithValue("@Reps", set.Reps);
                        command.Parameters.AddWithValue("@Weight", set.Weight);
                        command.Parameters.AddWithValue("@Rpe", set.Rpe);
                        command.ExecuteNonQuery();
                    }
                }
            }
        }
    }

    public void UpdateWorkout(Workout workout)
    {
        // first update the workout, then delete all exercises and sets, then add them back
        using(SqlConnection connection = new(_connectionString))
        {
            connection.Open();
            string query = "UPDATE Workouts SET Date = @Date, Name = @Name, Note = @Note WHERE Id = @WorkoutId";
            using(SqlCommand command = new(query, connection))
            {
                command.Parameters.AddWithValue("@Date", workout.Date);
                command.Parameters.AddWithValue("@Name", workout.Name);
                command.Parameters.AddWithValue("@Note", workout.Note);
                command.Parameters.AddWithValue("@WorkoutId", workout.Id);
                command.ExecuteNonQuery();
            }
            query = "DELETE FROM Sets WHERE ExerciseId IN (SELECT Id FROM Exercises WHERE WorkoutId = @WorkoutId)";
            using(SqlCommand command = new(query, connection))
            {
                command.Parameters.AddWithValue("@WorkoutId", workout.Id);
                command.ExecuteNonQuery();
            }
            query = "DELETE FROM Exercises WHERE WorkoutId = @WorkoutId";
            using(SqlCommand command = new(query, connection))
            {
                command.Parameters.AddWithValue("@WorkoutId", workout.Id);
                command.ExecuteNonQuery();
            }
            int i = 1;
            foreach(Exercise exercise in workout.Exercises)
            {
               
                query = "INSERT INTO Exercises (WorkoutId, ExerciseListId, [Order]) VALUES (@WorkoutId, @ExerciseListId, @Order); SELECT SCOPE_IDENTITY()";
                using(SqlCommand command = new(query, connection))
                {
                    command.Parameters.AddWithValue("@WorkoutId", workout.Id);
                    command.Parameters.AddWithValue("@ExerciseListId", exercise.ExerciseListId);
                    command.Parameters.AddWithValue("@Order", i);
                    exercise.ExerciseId = Convert.ToInt32(command.ExecuteScalar());
                    i++;
                }
                foreach(Set set in exercise.Sets)
                {
                    query = "INSERT INTO Sets (ExerciseId, WorkoutId, SetNumber, Reps, Weight, Rpe) VALUES (@ExerciseId, @WorkoutId, @SetNumber, @Reps, @Weight, @Rpe)";
                    using(SqlCommand command = new(query, connection))
                    {
                        command.Parameters.AddWithValue("@ExerciseId", exercise.ExerciseId);
                        command.Parameters.AddWithValue("@WorkoutId", workout.Id);
                        command.Parameters.AddWithValue("@SetNumber", set.SetNumber);
                        command.Parameters.AddWithValue("@Reps", set.Reps);
                        command.Parameters.AddWithValue("@Weight", set.Weight);
                        command.Parameters.AddWithValue("@Rpe", set.Rpe);
                        command.ExecuteNonQuery();
                    }
                }
            }
        }
    }

    public void DeleteWorkout(int workoutId)
    {
        //first delete the sets, then exercises, then workout
        using(SqlConnection connection = new(_connectionString))
        {
            connection.Open();
            string query = "DELETE FROM Sets WHERE ExerciseId IN (SELECT Id FROM Exercises WHERE WorkoutId = @WorkoutId)";
            using(SqlCommand command = new(query, connection))
            {
                command.Parameters.AddWithValue("@WorkoutId", workoutId);
                command.ExecuteNonQuery();
            }
            query = "DELETE FROM Exercises WHERE WorkoutId = @WorkoutId";
            using(SqlCommand command = new(query, connection))
            {
                command.Parameters.AddWithValue("@WorkoutId", workoutId);
                command.ExecuteNonQuery();
            }
            query = "DELETE FROM Workouts WHERE Id = @WorkoutId";
            using(SqlCommand command = new(query, connection))
            {
                command.Parameters.AddWithValue("@WorkoutId", workoutId);
                command.ExecuteNonQuery();
            }
        }
    }

    public void AddSet(int workoutId,int exerciseId, Set set)
    {
        // add set to the db
        using(SqlConnection connection = new(_connectionString))
        {
            connection.Open();
            string query = "INSERT INTO Sets (ExerciseId,WorkoutId, SetNumber, Reps, Weight, Rpe) VALUES (@ExerciseId,@WorkoutId, @SetNumber, @Reps, @Weight, @Rpe)";
            using(SqlCommand command = new(query, connection))
            {
                command.Parameters.AddWithValue("@ExerciseId", exerciseId);
                command.Parameters.AddWithValue("@WorkoutId", workoutId);
                command.Parameters.AddWithValue("@SetNumber", set.SetNumber);
                command.Parameters.AddWithValue("@Reps", set.Reps);
                command.Parameters.AddWithValue("@Weight", set.Weight);
                command.Parameters.AddWithValue("@Rpe", set.Rpe);
                command.ExecuteNonQuery();
            }
        }

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
        // add exercise to the db
        using(SqlConnection connection = new(_connectionString))
        {
            connection.Open();
            string query = "INSERT INTO Exercises (WorkoutId, ExerciseListId, ExerciseOrder) VALUES (@WorkoutId, @ExerciseListId, @ExerciseOrder)";
            using(SqlCommand command = new(query, connection))
            {
                command.Parameters.AddWithValue("@WorkoutId", workoutId);
                command.Parameters.AddWithValue("@ExerciseListId", exercise.ExerciseListId);
                command.Parameters.AddWithValue("@ExerciseOrder", exercise.Order);
                command.ExecuteNonQuery();
            }
        }
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

    public List<ExerciseList> GetAllExercises()
    {
        List<ExerciseList> exerciseList = new();
        using(SqlConnection connection = new(_connectionString))
        {
            connection.Open();
            string query = "SELECT * FROM ExerciseList";
            using(SqlCommand command = new(query, connection))
            {
                using(SqlDataReader reader = command.ExecuteReader())
                {
                    while(reader.Read())
                    {
                        ExerciseList exercise = new()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            MuscleGroup = reader.GetString(reader.GetOrdinal("MuscleGroup"))
                        };
                        exerciseList.Add(exercise);
                    }
                }
            }
        }
        return exerciseList;
    }

    public List<WorkoutTemplate> GetAllWorkoutTemplates()
    {
        List<WorkoutTemplate> workoutTemplates = new();
        using(SqlConnection connection = new(_connectionString))
        {
            connection.Open();
            string query = @"
            SELECT wt.Id, wt.Name, wt.Description, 
                   wte.ExerciseListId, el.Name as ExerciseName, wte.Sets, wte.[Order]
            FROM WorkoutTemplate wt
            LEFT JOIN WorkoutTemplateExercises wte ON wt.Id = wte.WorkoutTemplateId
            LEFT JOIN ExerciseList el ON wte.ExerciseListId = el.Id
            ORDER BY wt.Id, wte.[Order], wte.ExerciseListId";

            using(SqlCommand command = new(query, connection))
            {
                using(SqlDataReader reader = command.ExecuteReader())
                {
                    WorkoutTemplate currentTemplate = null;
                    int currentTemplateId = -1;

                    while(reader.Read())
                    {
                        int workoutTemplateId = reader.GetInt32(reader.GetOrdinal("Id"));
                        if(currentTemplate == null || workoutTemplateId != currentTemplateId)
                        {
                            currentTemplate = new WorkoutTemplate
                            {
                                Id = workoutTemplateId,
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                Description = reader.GetString(reader.GetOrdinal("Description")),
                                Exercises = new List<WorkoutTemplateExerciseDetail>()
                            };
                            workoutTemplates.Add(currentTemplate);
                            currentTemplateId = workoutTemplateId;
                        }

                        if(!reader.IsDBNull(reader.GetOrdinal("ExerciseListId")))
                        {
                            currentTemplate.Exercises.Add(new WorkoutTemplateExerciseDetail
                            {
                                ExerciseListId = reader.GetInt32(reader.GetOrdinal("ExerciseListId")),
                                ExerciseName = reader.GetString(reader.GetOrdinal("ExerciseName")),
                                Sets = reader.GetInt32(reader.GetOrdinal("Sets")),
                                Order = reader.GetInt32(reader.GetOrdinal("Order"))
                            });
                        }
                    }
                }
            }
        }
        return workoutTemplates;
    }

    public Workout CreateWorkoutFromTemplate(WorkoutTemplate template)
    {
        Workout workout = new()
        {
            Date = DateTime.Now,
            Name = template.Name,
            Note = template.Description,
            Exercises = new List<Exercise>()
        };
        foreach(WorkoutTemplateExerciseDetail exercise in template.Exercises)
        {
            Exercise newExercise = new()
            {
                ExerciseListId = exercise.ExerciseListId,
                Name = exercise.ExerciseName,
                Order = exercise.Order,
                Sets = new List<Set>()
            };
            for(int i = 0; i < exercise.Sets; i++)
            {
                newExercise.Sets.Add(new Set());
            }
            workout.Exercises.Add(newExercise);
        }
        //do this in a sql query using transactions, so that if one fails, they all fail, don't use methods above
        using(SqlConnection connection = new(_connectionString))
        {
            connection.Open();
            string query = "INSERT INTO Workouts (Name, Date, Note) VALUES (@Name, @Date, @Note); SELECT SCOPE_IDENTITY()";
            using(SqlCommand command = new(query, connection))
            {
                command.Parameters.AddWithValue("@Name", workout.Name);
                command.Parameters.AddWithValue("@Date", workout.Date);
                command.Parameters.AddWithValue("@Note", workout.Note);
                workout.Id = Convert.ToInt32(command.ExecuteScalar());
            }
            foreach(Exercise exercise in workout.Exercises)
            {
                query = "INSERT INTO Exercises (WorkoutId, ExerciseListId, [Order]) VALUES (@WorkoutId, @ExerciseListId, @Order); SELECT SCOPE_IDENTITY()";
                using(SqlCommand command = new(query, connection))
                {
                    command.Parameters.AddWithValue("@WorkoutId", workout.Id);
                    command.Parameters.AddWithValue("@ExerciseListId", exercise.ExerciseListId);
                    command.Parameters.AddWithValue("@Order", exercise.Order);
                    exercise.ExerciseId = Convert.ToInt32(command.ExecuteScalar());
                }
                foreach(Set set in exercise.Sets)
                {
                    query = "INSERT INTO Sets (ExerciseId, WorkoutId, SetNumber, Reps, Weight, Rpe) VALUES (@ExerciseId, @WorkoutId, @SetNumber, @Reps, @Weight, @Rpe)";
                    using(SqlCommand command = new(query, connection))
                    {
                        command.Parameters.AddWithValue("@ExerciseId", exercise.ExerciseId);
                        command.Parameters.AddWithValue("@WorkoutId", workout.Id);
                        command.Parameters.AddWithValue("@SetNumber", set.SetNumber);
                        command.Parameters.AddWithValue("@Reps", set.Reps);
                        command.Parameters.AddWithValue("@Weight", set.Weight);
                        command.Parameters.AddWithValue("@Rpe", set.Rpe);
                        command.ExecuteNonQuery();
                    }
                }
            }
            return workout;
        }
    }

    public WorkoutTemplate CreateWorkoutTemplate(WorkoutTemplate template)
    {
        using(SqlConnection connection = new(_connectionString))
        {
            connection.Open();
            string query = "INSERT INTO WorkoutTemplate (Name, Description) VALUES (@Name, @Description); SELECT SCOPE_IDENTITY()";
            using(SqlCommand command = new(query, connection))
            {
                command.Parameters.AddWithValue("@Name", template.Name);
                command.Parameters.AddWithValue("@Description", template.Description);
                template.Id = Convert.ToInt32(command.ExecuteScalar());
            }
            foreach(WorkoutTemplateExerciseDetail exercise in template.Exercises)
            {
                query = "INSERT INTO WorkoutTemplateExercises (WorkoutTemplateId, ExerciseListId, [Order], Sets) VALUES (@WorkoutTemplateId, @ExerciseListId, @Order, @Sets)";
                using(SqlCommand command = new(query, connection))
                {
                    command.Parameters.AddWithValue("@WorkoutTemplateId", template.Id);
                    command.Parameters.AddWithValue("@ExerciseListId", exercise.ExerciseListId);
                    command.Parameters.AddWithValue("@Order", exercise.Order);
                    command.Parameters.AddWithValue("@Sets", exercise.Sets);
                    command.ExecuteNonQuery();
                }
            }
            return template;
        }
    }

    public void DeleteWorkoutTemplate(int id)
    {
        using(SqlConnection connection = new(_connectionString))
        {
            connection.Open();
            string query = "DELETE FROM WorkoutTemplateExercises WHERE WorkoutTemplateId = @Id";
            using(SqlCommand command = new(query, connection))
            {
                command.Parameters.AddWithValue("@Id", id);
                command.ExecuteNonQuery();
            }
            query = "DELETE FROM WorkoutTemplate WHERE Id = @Id";
            using(SqlCommand command = new(query, connection))
            {
                command.Parameters.AddWithValue("@Id", id);
                command.ExecuteNonQuery();
            }
        }
    }
}
