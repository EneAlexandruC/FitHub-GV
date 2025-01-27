using FitHub.ModuleIntegration.Workout.Exercise;
using FitHub.WorkoutManagement.Domain.ExerciseDomain;
using FitHub.WorkoutManagement.Domain.WorkoutDomain;
using FitHub.WorkoutManagement.Features.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitHub.WorkoutManagement.Features.GetExercisesForWorkout
{
    public class GetExercisesForWorkoutQueryHandler (IExerciseQueryRepository exerciseQueryRepository)
    {
        public async Task<IEnumerable<ExerciseGetDTO>> Handle(GetExercisesForWorkoutQuery query)
        {
            var exercises = await exerciseQueryRepository.GetExercisesForWorkout(query.ID);
            return exercises.Select(exercise => exercise.ExerciseGetDTO());
            
        }
    }
}
