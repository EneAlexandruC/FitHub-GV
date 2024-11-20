using FitHub.AccountManagement.Features.Add;
using FitHub.AccountManagement.Features.GetRegularUser;
using FitHub.AccountManagement.Features.Shared;
using FitHub.AccountManagement.Features.UserAuth;
using FitHub.ModuleIntegration.AccountManagement.RegularUser;

namespace FitHub.AccountManagement.Infrastructure
{
    public class RegularUserService(
        AddRegularUserCommandHandler addUserCommandHandler,
        GetRegularUserQueryHandler getRegularUserQueryHandler,
        UserLoginQueryHandler userLoginQueryHandler) : IRegularUserService
    {
        public async Task<RegularUserGetDTO> AddUser(RegularUserAddDTO userAddDTO)
        {
            var userDomain = userAddDTO.ToDomainObject();
            var addUserCommand = new AddRegularUserCommand { RegularUser = userDomain };
            var user = await addUserCommandHandler.Handle(addUserCommand);

            return user.ToRegularUserGetDTO();
        }

        public async Task<RegularUserGetDTO?> GetRegularUserByEmail(string email)
        {
            var query = new GetRegularUserQuery { Email = email };
            return await getRegularUserQueryHandler.Handle(query);
        }

        public async Task<bool> CheckCredentials(UserLoginQuery userLoginQuery)
        {
            return await userLoginQueryHandler.Handle(userLoginQuery);
        }
    }
}
