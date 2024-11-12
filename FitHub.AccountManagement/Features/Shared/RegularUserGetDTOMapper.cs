using FitHub.AccountManagement.Domain.RegularUser;
using FitHub.ModuleIntegration.AccountManagement.RegularUser;

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
                Weight = user.Weight,
                Height = user.Height,
                DateOfBirth = user.DateOfBirth,
                Type = (int)user.Type,
            };
        }
    }
}
