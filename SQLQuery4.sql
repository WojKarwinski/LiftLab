SELECT 
                W.Id AS WorkoutId, W.Date, W.Name AS WorkoutName, W.Note,
                E.Id AS ExerciseId, E.[Order] AS ExerciseOrder, EL.Name AS ExerciseName, EL.MuscleGroup,
                S.SetNumber, S.Reps, S.Weight, S.Rpe
            FROM Workouts W
            LEFT JOIN Exercises E ON W.Id = E.WorkoutId
            LEFT JOIN Sets S ON E.Id = S.ExerciseId
            LEFT JOIN ExerciseList EL ON E.ExerciseListId = EL.Id