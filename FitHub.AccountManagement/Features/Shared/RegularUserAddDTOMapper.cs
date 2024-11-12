using FitHub.AccountManagement.Domain.RegularUser;
using FitHub.ModuleIntegration.AccountManagement.RegularUser;

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
                userAddDto.Password,
                userAddDto.Weight,
                userAddDto.Height,
                userAddDto.DateOfBirth
            );
        }
    }
}
