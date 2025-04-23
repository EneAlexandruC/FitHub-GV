using FitHub.AccountManagement.Domain.RegularUser;

namespace FitHub.AccountManagement.Features.UpdateRegularUser
{
    public class UpdateUserTypeCommandHandler(IRegularUserCommandRepository repository)
    {
        public async Task<RegularUser> Handle(UpdateUserTypeCommand command)
        {
            command.RegularUser.UpdateUserType(command.NewType);
            
            await repository.Update(command.RegularUser);
            await repository.SaveChanges();

            return command.RegularUser;
        }
    }
} 