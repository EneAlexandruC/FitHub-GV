using FitHub.AccoutManagement.Domain.RegularUser;
using FitHub.ModuleIntegration.AccountManagement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace FitHub.AccoutManagement.Features.Shared
{
    public static class UserGetDTOMapper
    {
        public static UserGetDTO ToUserGetDTO(this RegularUser user)
        {
            return new UserGetDTO
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
