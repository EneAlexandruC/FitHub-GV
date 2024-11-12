using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitHub.ModuleIntegration.AccountManagement
{
    public interface IUserService
    {
        Task<UserGetDTO> AddUser(UserAddDTO userAddDTO);
    }
}
