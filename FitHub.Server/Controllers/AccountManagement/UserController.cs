using FitHub.ModuleIntegration.AccountManagement;
using Microsoft.AspNetCore.Mvc;

namespace FitHub.Server.Controllers.AccountManagement
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userSerivce;

        public UserController(IUserService userSerivce)
        {
            this.userSerivce = userSerivce;
        }


        [HttpPost("add-user")]
        public async Task<UserGetDTO> Post([FromBody] UserAddDTO userAddDTO)
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
