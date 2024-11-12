using FitHub.AccoutManagement.Domain.PremiumUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitHub.AccoutManagement.Domain.RegularUser
{
    public interface IRegularUserQueryRepository
    {
        Task<RegularUser> GetUserByEmail(string email);

        Task SaveChanges();
    }
}
