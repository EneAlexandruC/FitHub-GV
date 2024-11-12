using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitHub.AccountManagement.Domain.RegularUser
{
    public interface IRegularUserCommandRepository
    {
        Task<RegularUser> Add(RegularUser regularUser);

        Task SaveChanges();
    
    }
}
