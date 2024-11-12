using FitHub.AccountManagement.Domain.RegularUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
