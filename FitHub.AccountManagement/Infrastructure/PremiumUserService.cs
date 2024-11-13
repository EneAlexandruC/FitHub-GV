using FitHub.AccountManagement.Features.AddPremiumUser;
using FitHub.AccountManagement.Features.Shared;
using FitHub.ModuleIntegration.AccountManagement.PremiumUser;

namespace FitHub.AccountManagement.Infrastructure
{
    public class PremiumUserService(AddPremiumUserCommandHandler addPremiumUserCommandHandler) : IPremiumUserService
    {
        public async Task<PremiumUserGetDTO> AddPremiumUser(PremiumUserAddDTO userAddDTO)
        {
            var userDomain = userAddDTO.ToPremiumUserAddDTO();
            var addUserCommand = new AddPremiumUserCommand { PremiumUser = userDomain };
            var user = await addPremiumUserCommandHandler.Handle(addUserCommand);

            return user.ToPremiumUserGetDTO();
        }
    }
}
