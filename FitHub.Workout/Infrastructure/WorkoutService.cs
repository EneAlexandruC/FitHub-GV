
using FitHub.WorkoutManagement.Features.Shared.Workouts;
using FitHub.WorkoutManagement.Features.GetAllWorkouts;
using FitHub.WorkoutManagement.Features.GetWorkout;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitHub.WorkoutManagement.Infrastructure
{
    public class WorkoutService : IWorkoutService
{
    private readonly GetWorkoutQueryHandler getWorkoutQueryHandler;
    private readonly GetAllWorkoutsQueryHandler getAllWorkoutsQueryHandler;

    public WorkoutService(GetWorkoutQueryHandler getWorkoutQueryHandler, GetAllWorkoutsQueryHandler getAllWorkoutsQueryHandler)
    {
        this.getWorkoutQueryHandler = getWorkoutQueryHandler;
        this.getAllWorkoutsQueryHandler = getAllWorkoutsQueryHandler;
    }
        public async Task<WorkoutGetDTO?> GetWorkoutById(int id)
        {
            var query = new GetWorkoutQuery { ID = id };
            return await getWorkoutQueryHandler.Handle(query);
        }
        public async Task<IEnumerable<WorkoutGetDTO>> GetAllWorkouts()
        {
            var query = new GetAllWorkoutsQuery();
            return await getAllWorkoutsQueryHandler.Handle(query);
        }
    }
}
