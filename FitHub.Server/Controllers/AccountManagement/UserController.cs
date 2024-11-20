using FitHub.ModuleIntegration.AccountManagement.PremiumUser;
using FitHub.ModuleIntegration.AccountManagement.RegularUser;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Microsoft.Extensions.Logging;

namespace FitHub.Server.Controllers.AccountManagement
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IRegularUserService regularUserService;
        private readonly IPremiumUserService premiumUserService;
        private readonly ILogger logger;

        public UserController(IRegularUserService regularUserService,
                              IPremiumUserService premiumUserService,
                              ILogger<UserController> logger)
        {
            this.regularUserService = regularUserService;
            this.premiumUserService = premiumUserService;
            this.logger = logger;
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

        [HttpGet("get-user-by-email")]
        public async Task<RegularUserGetDTO> GetUserByEmail([FromQuery] string email)
        {
            return await regularUserService.GetRegularUserByEmail(email);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromQuery] string email, [FromQuery] string password)
        {
            logger.LogInformation("Login attempt with email: {email} and password: {password}", email, password);
            if (await regularUserService.CheckCredentials(email, password))
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, email)
                };

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));

                return Ok(new { message = "Login successful", redirectUrl = "/" });

            }
            return BadRequest(new { message = "Incorrect username or password" });
        }

    }
}
