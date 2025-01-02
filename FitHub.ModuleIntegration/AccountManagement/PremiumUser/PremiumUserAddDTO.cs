namespace FitHub.ModuleIntegration.AccountManagement.PremiumUser
{
    public class PremiumUserAddDTO
    {
        public int RegularUserID { get; set; }
        public DateTime SubscriptionStartDate { get; set; }
        public DateTime SubscriptionEndDate { get; set; }
    }
}
