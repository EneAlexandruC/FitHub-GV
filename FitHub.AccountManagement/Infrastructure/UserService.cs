using FitHub.AccoutManagement.Features.Add;
using FitHub.AccoutManagement.Features.Shared;
using FitHub.ModuleIntegration.AccountManagement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitHub.AccoutManagement.Infrastructure
{
    public class UserService(AddUserCommandHandler addUserCommandHandler) : IUserService
    {
        public async Task<UserGetDTO> AddUser(UserAddDTO userAddDTO)
        {
            var userDomain = userAddDTO.ToDomainObject();
            var addUserCommand = new AddUserCommand { regularUser = userDomain };
            var user = await addUserCommandHandler.Handle(addUserCommand);

            return user.ToUserGetDTO();
        }
    }
}
