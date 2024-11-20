using FitHub.AccountManagement.Domain.RegularUser;
using FitHub.ModuleIntegration.AccountManagement.RegularUser;

namespace FitHub.AccountManagement.Features.UserAuth
{
    public class UserLoginQuery
    {
        public required string Email;
        public required string Password;
    }
}
