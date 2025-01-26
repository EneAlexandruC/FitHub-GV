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
        public int ExerciseID { get; set; }
        public Exercise Exercise { get; set; }
        public int EquipmentID { get; set; }
        public Equipment Equipment { get; set; }
    }
}
