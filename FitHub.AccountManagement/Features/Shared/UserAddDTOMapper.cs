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
    public static class UserAddDTOMapper
    {
        public static RegularUser ToDomainObject(this UserAddDTO userAddDto)
        {
            return RegularUser.Create(
                userAddDto.FirstName,
                userAddDto.LastName,
                userAddDto.Email,
                userAddDto.Password
            );
        }
    }
}
