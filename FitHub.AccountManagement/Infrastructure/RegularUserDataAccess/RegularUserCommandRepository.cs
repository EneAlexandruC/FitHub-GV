using FitHub.AccountManagement.Domain.RegularUser;

namespace FitHub.AccountManagement.Infrastructure.UserDataAccess
{
    public class RegularUserCommandRepository(RegularUserDbContext dbContext) : IRegularUserCommandRepository
    {
        public Task<RegularUser> Add(RegularUser entry)
        {
            dbContext.Add(entry);
            return Task.FromResult(entry);
        }
        
        public Task<RegularUser> Update(RegularUser entry)
        {
            dbContext.Update(entry);
            return Task.FromResult(entry);
        }

        public async Task SaveChanges()
        {
            await dbContext.SaveChangesAsync();
        }

    }
}
