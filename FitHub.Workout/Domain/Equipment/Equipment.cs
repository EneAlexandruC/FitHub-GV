using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitHub.WorkoutManagement.Domain.Equipment
{
    public class Equipment
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        private Equipment() { }

        public static Equipment Create(string name)
        {
            return new Equipment
            {
                Name = name
            };
        }
    }
}
