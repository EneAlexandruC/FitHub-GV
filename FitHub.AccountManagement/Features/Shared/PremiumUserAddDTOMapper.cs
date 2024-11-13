using FitHub.AccountManagement.Domain.PremiumUser;
using FitHub.ModuleIntegration.AccountManagement.PremiumUser;

namespace FitHub.AccountManagement.Features.Shared
{
    public static class PremiumUserAddDTOMapper
    {
        public static PremiumUser ToPremiumUserAddDTO(this PremiumUserAddDTO user)
        {
            return PremiumUser.Create(
                user.RegularUserID,
                user.SubscriptionStartDate,
                user.SubscriptionEndDate
            );

        }
    }
}
