DBCC CHECKIDENT ('Exercises', RESEED, 0);
DBCC CHECKIDENT ('Workouts', RESEED, 0);
DECLARE @StartDate DATE = '2023-01-01' -- starting date
DECLARE @EndDate DATE = DATEADD(MONTH, 5, @StartDate) -- 5 months later
DECLARE @CurrentDate DATE = @StartDate
DECLARE @WorkoutNames TABLE (Name VARCHAR(50))
DECLARE @WorkoutId INT, @ExerciseId INT
DECLARE @MuscleGroup VARCHAR(50)
DECLARE @SetCount INT, @Weight INT

-- Define workout names
INSERT INTO @WorkoutNames (Name) VALUES ('Push'), ('Pull'), ('Legs'), ('Arms'), ('Core')

-- Loop through each week
WHILE @CurrentDate <= @EndDate
BEGIN
    -- Insert each workout for the week
    DECLARE workout_cursor CURSOR FOR SELECT Name FROM @WorkoutNames
    OPEN workout_cursor
    FETCH NEXT FROM workout_cursor INTO @MuscleGroup

    WHILE @@FETCH_STATUS = 0
    BEGIN
        -- Insert workout
        INSERT INTO Workouts (Date, Name) VALUES (@CurrentDate, @MuscleGroup)
        SELECT @WorkoutId = SCOPE_IDENTITY()

        -- Insert one mandatory exercise (ID 23, 26, or 30) for the workout
        INSERT INTO Exercises ([Order], ExerciseListId, WorkoutId)
        SELECT TOP 1 1, Id, @WorkoutId
        FROM ExerciseList
        WHERE Id IN (23, 26, 30)
        ORDER BY NEWID()

        -- Insert additional exercises for the workout
        INSERT INTO Exercises ([Order], ExerciseListId, WorkoutId)
        SELECT TOP 4 1, Id, @WorkoutId
        FROM ExerciseList
        WHERE MuscleGroup = @MuscleGroup AND Id NOT IN (23, 26, 30)
        ORDER BY NEWID()

        -- Insert sets for each exercise
        DECLARE exercise_cursor CURSOR FOR SELECT Id FROM Exercises WHERE WorkoutId = @WorkoutId
        OPEN exercise_cursor
        FETCH NEXT FROM exercise_cursor INTO @ExerciseId

        WHILE @@FETCH_STATUS = 0
        BEGIN
            SET @SetCount = 2 + (ABS(CHECKSUM(NEWID())) % 2) -- Randomly 2 or 3 sets
            DECLARE @i INT = 1

            WHILE @i <= @SetCount
            BEGIN
                SET @Weight = 80 + (ABS(CHECKSUM(NEWID())) % 21) * 5 -- Random weight between 80 and 180, increment of 5
                INSERT INTO Sets (SetNumber, Reps, Weight, Rpe, WorkoutId, ExerciseId)
                VALUES (@i, 10, @Weight, NULL, @WorkoutId, @ExerciseId)
                SET @i = @i + 1
            END

            FETCH NEXT FROM exercise_cursor INTO @ExerciseId
        END

        CLOSE exercise_cursor
        DEALLOCATE exercise_cursor

        -- Move to a randomly chosen next workout day (uneven spread)
        SET @CurrentDate = DATEADD(DAY, 1 + ABS(CHECKSUM(NEWID())) % 3, @CurrentDate)

        FETCH NEXT FROM workout_cursor INTO @MuscleGroup
    END

    CLOSE workout_cursor
    DEALLOCATE workout_cursor
END
