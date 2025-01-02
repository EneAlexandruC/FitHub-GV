using FitHub.AccountManagement.Domain.RegularUser;
using FitHub.AccountManagement.Features.Shared;
using FitHub.ModuleIntegration.AccountManagement.RegularUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitHub.AccountManagement.Features.GetRegularUser
{
    public class GetRegularUserQueryHandler(IRegularUserQueryRepository regularUserQueryRepository)
    {
        public async Task<RegularUserGetDTO?> Handle(GetRegularUserQuery query)
        {
            if (string.IsNullOrEmpty(query.Email))
            {
                throw new ArgumentException("An email address must be provided", nameof(query.Email));
            }

            var user = await regularUserQueryRepository.GetUserByEmail(query.Email);

            if (user == null)
            {
                throw new InvalidOperationException($"No user found with email {query.Email}");
            }

            return user.ToRegularUserGetDTO();
        }
    }
}
