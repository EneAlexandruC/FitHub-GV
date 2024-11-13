using FitHub.AccountManagement.Domain.PremiumUser;

namespace FitHub.AccountManagement.Infrastructure.PremiumUserDataAccess
{
    public class PremiumUserCommandRepository(PremiumUserDbContext dbContext) : IPremiumUserCommandRepository
    {
        public async Task<PremiumUser> Add(PremiumUser entry)
        {
            dbContext.Add(entry);
            await dbContext.SaveChangesAsync();

            return entry;
        }

        public async Task SaveChanges()
        {
            await dbContext.SaveChangesAsync();
        }
    }
}
