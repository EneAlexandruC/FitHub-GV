namespace FitHub.AccountManagement.Domain.PremiumUser
{
    public class PremiumUser
    {
        public int ID { get; set; }
        public int RegularUserID { get; set; }
        public DateTime SubscriptionStartDate { get; set; }
        public DateTime SubscriptionEndDate { get; set; }

        private PremiumUser() { }

        public static PremiumUser Create(int regularUserID, DateTime subscriptionStartDate, DateTime subscriptionEndDate)
        {
            return new PremiumUser
            {
                RegularUserID = regularUserID,
                SubscriptionStartDate = subscriptionStartDate,
                SubscriptionEndDate = subscriptionEndDate
            };
        }
    }
}
