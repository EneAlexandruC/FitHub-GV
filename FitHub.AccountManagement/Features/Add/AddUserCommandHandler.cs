using FitHub.AccoutManagement.Domain.RegularUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitHub.AccoutManagement.Features.Add
{
    public class AddUserCommandHandler(IRegularUserCommandRepository repository)
    {
        public async Task<RegularUser> Handle(AddUserCommand command)
        {
            await repository.Add(command.regularUser);

            await repository.SaveChanges();

            return command.regularUser;
        }
    }
}
