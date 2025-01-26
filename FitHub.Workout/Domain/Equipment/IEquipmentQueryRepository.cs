using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitHub.WorkoutManagement.Domain.Equipment
{
    public interface IEquipmentQueryRepository
    {
        Task<Equipment> GetEquipmentById(int ID);
        Task SaveChanges();
    }
}
