using FitHub.AccountManagement.Domain.PremiumUser;

namespace FitHub.AccountManagement.Features.AddPremiumUser
{
    public class AddPremiumUserCommandHandler(IPremiumUserCommandRepository repository)
    {
        public async Task<PremiumUser> Handle(AddPremiumUserCommand command)
        {
            await repository.Add(command.PremiumUser);

            await repository.SaveChanges();

            return command.PremiumUser;
        }
    }
}
