using FitHub.AccoutManagement.Domain.RegularUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitHub.AccoutManagement.Infrastructure.UserDataAccess
{
    public class RegularUserCommandRepository(UserDbContext dbContext) : IRegularUserCommandRepository
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
