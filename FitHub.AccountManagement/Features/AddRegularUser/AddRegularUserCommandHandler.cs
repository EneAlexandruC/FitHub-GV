using FitHub.AccountManagement.Domain.RegularUser;

namespace FitHub.AccountManagement.Features.Add
{
    public class AddRegularUserCommandHandler(IRegularUserCommandRepository repository)
    {
        public async Task<RegularUser> Handle(AddRegularUserCommand command)
        {
            await repository.Add(command.RegularUser);

            await repository.SaveChanges();

            return command.RegularUser;
        }
    }
}
