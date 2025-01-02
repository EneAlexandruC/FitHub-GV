using FitHub.AccountManagement.Domain.RegularUser;

namespace FitHub.AccountManagement.Infrastructure.UserDataAccess
{
    public class RegularUserCommandRepository(RegularUserDbContext dbContext) : IRegularUserCommandRepository
    {
        public async Task<RegularUser> Add(RegularUser entry)
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
