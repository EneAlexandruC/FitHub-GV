using FitHub.ModuleIntegration.WorkoutModule.Workout;
using FitHub.WorkoutManagement.Features.GetWorkout;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitHub.WorkoutManagement.Infrastructure
{
    public class WorkoutService(GetWorkoutQueryHandler getWorkoutQueryHandler) : IWorkoutService
    {
        public async Task<WorkoutGetDTO?> GetWorkoutById(int id)
        {
            var query = new GetWorkoutQuery { ID = id };
            return await getWorkoutQueryHandler.Handle(query);
        }
    }
}
