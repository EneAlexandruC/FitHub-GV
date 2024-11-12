using FitHub.AccoutManagement.Domain.RegularUser;
using FitHub.ModuleIntegration.AccountManagement.RegularUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace FitHub.AccountManagement.Features.Shared
{
    public static class RegularUserGetDTOMapper
    {
        public static RegularUserGetDTO ToUserGetDTO(this RegularUser user)
        {
            return new RegularUserGetDTO
            {
                ID = user.ID,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Password = user.Password,
                Type = (int)user.Type,
            };
        }
    }
}
