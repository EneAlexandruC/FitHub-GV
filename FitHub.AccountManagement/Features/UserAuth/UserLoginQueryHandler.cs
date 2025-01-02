using FitHub.AccountManagement.Domain.RegularUser;

namespace FitHub.AccountManagement.Features.UserAuth
{
    public class UserLoginQueryHandler(IRegularUserQueryRepository _regularUserQueryRepository)
    {
        public async Task<bool> Handle(UserLoginQuery command)
        {
            var user = await _regularUserQueryRepository.GetUserByEmail(command.Email);

            if (user == null)
            {
                return false;
            }

            return BCrypt.Net.BCrypt.Verify(command.Password, user.Password);
        }
    }
}
