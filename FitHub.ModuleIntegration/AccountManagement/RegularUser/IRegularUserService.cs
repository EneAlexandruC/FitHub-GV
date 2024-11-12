using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitHub.ModuleIntegration.AccountManagement.RegularUser
{
    public interface IRegularUserService
    {
        Task<RegularUserGetDTO> AddUser(RegularUserAddDTO userAddDTO);

        Task<RegularUserGetDTO> GetRegularUserByEmail(string email);
    }
}
