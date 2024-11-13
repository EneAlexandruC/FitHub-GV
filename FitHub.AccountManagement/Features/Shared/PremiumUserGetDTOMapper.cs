using FitHub.AccountManagement.Domain.PremiumUser;
using FitHub.ModuleIntegration.AccountManagement.PremiumUser;

namespace FitHub.AccountManagement.Features.Shared
{
    public static class PremiumUserGetDTOMapper
    {
        public static PremiumUserGetDTO ToPremiumUserGetDTO(this PremiumUser user)
        {
            return new PremiumUserGetDTO
            {
                ID = user.ID,
                RegularUserID = user.RegularUserID,
                SubscriptionStartDate = user.SubscriptionStartDate,
                SubscriptionEndDate = user.SubscriptionEndDate,
            };
        }
    }
}
