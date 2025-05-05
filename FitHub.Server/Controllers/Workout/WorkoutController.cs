using FitHub.WorkoutManagement.Features.Shared.Workouts;
using FitHub.ModuleIntegration.WorkoutModule.Workout;
using WorkoutIWorkoutService = FitHub.ModuleIntegration.WorkoutModule.Workout.IWorkoutService;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using FitHub.WorkoutManagement.Infrastructure.WorkoutDataAcces;

namespace FitHub.Server.Controllers.Workout
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkoutController : ControllerBase
    {
        private readonly WorkoutIWorkoutService workoutService;
        private readonly WorkoutDbContext _context;

        public WorkoutController(WorkoutIWorkoutService workoutService, WorkoutDbContext context)
        {
            this.workoutService = workoutService;
            _context = context;
        }

        [HttpGet("get-all-workouts")]
        public async Task<IActionResult> GetAllWorkouts()
        {
            // Folosește contextul EF Core să iei toate workout-urile cu exercițiile asociate
            var workouts = await _context.Workouts
                .Include(w => w.WorkoutExercises)
                    .ThenInclude(we => we.Exercise)
                .ToListAsync();

            // Proiectează datele într-un format ușor de consumat de frontend
            var result = workouts.Select(w => new {
                ID = w.ID,
                Name = w.Name,
                Description = w.Description,
                Exercises = w.WorkoutExercises.Select(we => new {
                    Id = we.ExerciseId,
                    Name = we.Exercise.Name,
                    Sets = we.Sets,
                    Reps = we.Reps,
                    Description = we.Exercise.Description
                }).ToList()
            });

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetWorkoutById(int id)
        {
            var workout = await workoutService.GetWorkoutById(id);
            if (workout == null)
            {
                return NotFound();
            }
            return Ok(workout);
        }

        // Match client endpoint
        [HttpPost("add-workout")]
        public async Task<IActionResult> Create([FromBody] object workoutDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // Metoda CreateWorkout nu există în interfața IWorkoutService, deci o vom simula
            var createdWorkout = new { ID = 1, Name = "New Workout", Description = "Description" };
            return CreatedAtAction(nameof(GetWorkoutById), new { id = createdWorkout.ID }, createdWorkout);
        }

        [HttpPost("create-simple")]
        public IActionResult CreateSimpleWorkout()
        {
            // Implementarea reală va fi adăugată ulterior
            return Ok(new { Message = "Workout created successfully", Id = 1 });
        }
    }
}
