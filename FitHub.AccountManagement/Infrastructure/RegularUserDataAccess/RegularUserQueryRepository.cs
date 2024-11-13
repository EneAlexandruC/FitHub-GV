using FitHub.AccountManagement.Domain.RegularUser;
using FitHub.AccountManagement.Infrastructure.UserDataAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
