using FitHub.WorkoutManagement.Domain.ExerciseDomain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitHub.WorkoutManagement.Domain.EquipmentDomain;

namespace FitHub.WorkoutManagement.Domain.JoinEntry
{
    public class ExercisesEquipments
    {
        public int ExerciseId { get; set; }
        public required Exercise Exercise { get; set; }

        public int EquipmentId { get; set; }
        public required Equipment Equipment { get; set; }
    }
}
