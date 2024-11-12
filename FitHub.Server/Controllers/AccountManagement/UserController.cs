using FitHub.ModuleIntegration.AccountManagement.RegularUser;
using Microsoft.AspNetCore.Mvc;

namespace FitHub.Server.Controllers.AccountManagement
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IRegularUserService userSerivce;

        public UserController(IRegularUserService userSerivce)
        {
            this.userSerivce = userSerivce;
        }


        [HttpPost("add-user")]
        public async Task<RegularUserGetDTO> Post([FromBody] RegularUserAddDTO userAddDTO)
        {
            if (userAddDTO == null)
            {
                throw new ArgumentNullException(nameof(userAddDTO));
            }

            var addedUser = await userSerivce.AddUser(userAddDTO);

            return addedUser;
        }
    }
}
