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
            RegularUser? user = null;
            
            if (!string.IsNullOrEmpty(query.Email))
            {
                user = await regularUserQueryRepository.GetUserByEmail(query.Email);
            }
            else if (query.UserId.HasValue)
            {
                user = await regularUserQueryRepository.GetUserById(query.UserId.Value);
            }
            else
            {
                throw new ArgumentException("Either Email or UserId must be provided");
            }

            if (user == null)
            {
                string errorMessage = !string.IsNullOrEmpty(query.Email) 
                    ? $"No user found with email {query.Email}"
                    : $"No user found with ID {query.UserId}";
                    
                throw new InvalidOperationException(errorMessage);
            }

            return user.ToRegularUserGetDTO();
        }
        
        public async Task<RegularUser?> GetUserDomain(int userId)
        {
            return await regularUserQueryRepository.GetUserById(userId);
        }
    }
}
