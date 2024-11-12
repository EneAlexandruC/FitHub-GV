using FitHub.AccountManagement.Domain.RegularUser;
using FitHub.ModuleIntegration.AccountManagement.RegularUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace FitHub.AccountManagement.Features.Shared
{
    public static class RegularUserAddDTOMapper
    {
        public static RegularUser ToDomainObject(this RegularUserAddDTO userAddDto)
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
