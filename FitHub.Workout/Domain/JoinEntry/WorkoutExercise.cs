using FitHub.WorkoutManagement.Domain.ExerciseDomain;
using FitHub.WorkoutManagement.Domain.WorkoutDomain;

namespace FitHub.WorkoutManagement.Domain.JoinEntry
{
    public class WorkoutExercise
    {
        public int WorkoutId { get; set; }
        public int ExerciseId { get; set; }
        public Domain.WorkoutDomain.Workout Workout { get; set; }
        public Exercise Exercise { get; set; }
        public int Sets { get; set; }
        public int Reps { get; set; }
    }
}
