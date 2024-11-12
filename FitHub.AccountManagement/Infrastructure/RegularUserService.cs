using FitHub.AccountManagement.Features.Add;
using FitHub.AccountManagement.Features.Shared;
using FitHub.ModuleIntegration.AccountManagement.RegularUser;

namespace FitHub.AccountManagement.Infrastructure
{
    public class RegularUserService(AddRegularUserCommandHandler addUserCommandHandler) : IRegularUserService
    {
        public async Task<RegularUserGetDTO> AddUser(RegularUserAddDTO userAddDTO)
        {
            var userDomain = userAddDTO.ToDomainObject();
            var addUserCommand = new AddRegularUserCommand { RegularUser = userDomain };
            var user = await addUserCommandHandler.Handle(addUserCommand);

            return user.ToUserGetDTO();
        }
    }
}
