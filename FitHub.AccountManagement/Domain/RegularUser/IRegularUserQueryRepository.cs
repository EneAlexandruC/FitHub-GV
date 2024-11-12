
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitHub.AccountManagement.Domain.RegularUser
{
    public interface IRegularUserQueryRepository
    {
        Task<RegularUser> GetUserByEmail(string email);

        Task SaveChanges();
    }
}
