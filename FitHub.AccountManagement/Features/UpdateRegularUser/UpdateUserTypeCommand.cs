using FitHub.AccountManagement.Domain.RegularUser;

namespace FitHub.AccountManagement.Features.UpdateRegularUser
{
    public class UpdateUserTypeCommand
    {
        public required RegularUser RegularUser;
        public required RegularUser.UserType NewType;
    }
} 