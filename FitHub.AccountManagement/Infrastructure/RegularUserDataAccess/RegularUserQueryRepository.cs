using FitHub.AccountManagement.Domain.RegularUser;
using FitHub.AccountManagement.Infrastructure.UserDataAccess;
using Microsoft.EntityFrameworkCore;

namespace FitHub.AccountManagement.Infrastructure.RegularUserDataAccess
{
    public class RegularUserQueryRepository(RegularUserDbContext dbContext) : IRegularUserQueryRepository
    {
        public async Task<RegularUser?> GetUserByEmail(string email)
        {
            return await dbContext.RegularUsers.FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task SaveChanges()
        {
           await dbContext.SaveChangesAsync();
        }
    }
}
