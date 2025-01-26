using FitHub.WorkoutManagement.Domain.ExerciseDomain;
using FitHub.WorkoutManagement.Domain.WorkoutDomain;

namespace FitHub.WorkoutManagement.Domain.JoinEntry
{
    public class WorkoutExercise
    {
        public int WorkoutID { get; set; }
        public Workout Workout { get; set; }

        public int ExerciseID { get; set; }
        public Exercise Exercise { get; set; }
    }
}
