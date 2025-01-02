namespace FitHub.AccountManagement.Domain.PremiumUser
{
    public interface IPremiumUserCommandRepository
    {
        Task<PremiumUser> Add(PremiumUser premiumUser);
        Task SaveChanges();
    }
}
