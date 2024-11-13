namespace FitHub.ModuleIntegration.AccountManagement.PremiumUser
{
    public class PremiumUserGetDTO
    {
        public int ID { get; set; }
        public int RegularUserID { get; set; }
        public DateTime SubscriptionStartDate { get; set; }
        public DateTime SubscriptionEndDate { get; set; }
    }
}
