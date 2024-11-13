using FitHub.ModuleIntegration.AccountManagement.RegularUser;
using Microsoft.AspNetCore.Mvc;

namespace FitHub.Server.Controllers.AccountManagement
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IRegularUserService regularUserSerivce;

        public UserController(IRegularUserService regularUserSerivce)
        {
            this.regularUserSerivce = regularUserSerivce;
        }


        [HttpPost("AddUser")]
        public async Task<RegularUserGetDTO> Post([FromBody] RegularUserAddDTO userAddDTO)
        {
            if (userAddDTO == null)
            {
                throw new ArgumentNullException(nameof(userAddDTO));
            }

            var addedUser = await regularUserSerivce.AddUser(userAddDTO);

            return addedUser;
        }

        [HttpGet("getUserByEmail")]
        public async Task<RegularUserGetDTO> GetUserByEmail([FromQuery] string email)
        {
            return await regularUserSerivce.GetRegularUserByEmail(email);
        }
    }
}
