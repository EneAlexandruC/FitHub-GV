using FitHub.AccountManagement.Features.Add;
using FitHub.AccountManagement.Features.GetRegularUser;
using FitHub.AccountManagement.Features.Shared;
using FitHub.AccountManagement.Features.UpdateRegularUser;
using FitHub.AccountManagement.Features.UserAuth;
using FitHub.ModuleIntegration.AccountManagement.RegularUser;

namespace FitHub.AccountManagement.Infrastructure
{
    public class RegularUserService(
        AddRegularUserCommandHandler addUserCommandHandler,
        GetRegularUserQueryHandler getRegularUserQueryHandler,
        UserLoginQueryHandler userLoginQueryHandler,
        UpdateUserTypeCommandHandler updateUserTypeCommandHandler) : IRegularUserService
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

        public async Task<RegularUserGetDTO?> GetRegularUserById(int userId)
        {
            var query = new GetRegularUserQuery { UserId = userId };
            return await getRegularUserQueryHandler.Handle(query);
        }

        public async Task<bool> CheckCredentials(string email, string password)
        {
            var query = new UserLoginQuery { Email = email, Password = password };
            return await userLoginQueryHandler.Handle(query);
        }
        
        public async Task<RegularUserGetDTO> UpdateUserType(int userId, int userType)
        {
            // Obținem utilizatorul
            var query = new GetRegularUserQuery { UserId = userId };
            var user = await getRegularUserQueryHandler.Handle(query);
            
            if (user == null)
            {
                throw new InvalidOperationException($"No user found with ID {userId}");
            }
            
            // Obținem obiectul de domeniu
            var userDomain = await getRegularUserQueryHandler.GetUserDomain(userId);
            
            if (userDomain == null)
            {
                throw new InvalidOperationException($"Cannot fetch domain object for user with ID {userId}");
            }
            
            // Actualizăm tipul utilizatorului
            var updateCommand = new UpdateUserTypeCommand 
            { 
                RegularUser = userDomain,
                NewType = (FitHub.AccountManagement.Domain.RegularUser.RegularUser.UserType)userType 
            };
            
            var updatedUser = await updateUserTypeCommandHandler.Handle(updateCommand);
            
            return updatedUser.ToRegularUserGetDTO();
        }
    }
}
