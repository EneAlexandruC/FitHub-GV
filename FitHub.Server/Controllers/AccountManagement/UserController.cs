using FitHub.ModuleIntegration.AccountManagement.PremiumUser;
using FitHub.ModuleIntegration.AccountManagement.RegularUser;
using Microsoft.AspNetCore.Mvc;

namespace FitHub.Server.Controllers.AccountManagement
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IRegularUserService regularUserService;
        private readonly IPremiumUserService premiumUserService;

        public UserController(IRegularUserService regularUserService, IPremiumUserService premiumUserService)
        {
            this.regularUserService = regularUserService;
            this.premiumUserService = premiumUserService;
        }


        [HttpPost("add-regularuser")]
        public async Task<RegularUserGetDTO> Post([FromBody] RegularUserAddDTO userAddDTO)
        {
            if (userAddDTO == null)
            {
                throw new ArgumentNullException(nameof(userAddDTO));
            }

            var addedUser = await regularUserService.AddUser(userAddDTO);

            return addedUser;
        }

        [HttpPost("add-premiumuser")]
        public async Task<PremiumUserGetDTO> Post([FromBody] PremiumUserAddDTO userAddDTO)
        {
            ArgumentNullException.ThrowIfNull(userAddDTO);

            var addedUser = await premiumUserService.AddPremiumUser(userAddDTO);

            return addedUser;
        }
    }
}
