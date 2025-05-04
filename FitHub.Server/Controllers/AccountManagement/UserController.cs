using FitHub.ModuleIntegration.AccountManagement.PremiumUser;
using FitHub.ModuleIntegration.AccountManagement.RegularUser;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Microsoft.Extensions.Logging;
using FitHub.AccountManagement.Features.UserAuth;
using FitHub.ModuleIntegration.AccountManagement.Auth;

namespace FitHub.Server.Controllers.AccountManagement
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IRegularUserService regularUserService;
        private readonly IPremiumUserService premiumUserService;

        public UserController(IRegularUserService regularUserService,
                              IPremiumUserService premiumUserService,
                              ILogger<UserController> logger)
        {
            this.regularUserService = regularUserService;
            this.premiumUserService = premiumUserService;
        }


        [HttpPost("add-regularuser")]
        public async Task<IActionResult> Post([FromBody] RegularUserAddDTO userAddDTO)
        {
            if (userAddDTO == null)
                return BadRequest(new { message = "User data is required" });

            try
            {
                var addedUser = await regularUserService.AddUser(userAddDTO);
                return Ok(addedUser);
            }
            catch (ArgumentException argEx)
            {
                // Validation error (e.g., invalid email, password, etc.)
                // Log the exception details here as needed
                return BadRequest(new { message = argEx.Message });
            }
            catch (Microsoft.EntityFrameworkCore.DbUpdateException dbEx)
            {
                // Check for duplicate entry or constraint violation
                Exception? current = dbEx;
                while (current != null)
                {
                    if (current.Message.Contains("Duplicate entry") || current.Message.Contains("UNIQUE constraint failed"))
                    {
                        return Conflict(new { message = "Email already exists. Please use another email address." });
                    }
                    current = current.InnerException;
                }
                // Other DB errors
                // Log the exception details here as needed
                return StatusCode(500, new { message = "A database error occurred while registering the user." });
            }
            catch (Exception ex)
            {
                // Log the exception details here as needed
                return StatusCode(500, new { message = "An unexpected error occurred during registration." });
            }
        }

        [HttpGet("check-session")]
        public IActionResult CheckSession()
        {
            bool isAuthenticated = User?.Identity?.IsAuthenticated ?? false;
            string? email = isAuthenticated ? User.Identity.Name : null;
            return Ok(new { isAuthenticated, email });
        }

        [HttpPost("add-premiumuser")]
        public async Task<PremiumUserGetDTO> Post([FromBody] PremiumUserAddDTO userAddDTO)
        {
            ArgumentNullException.ThrowIfNull(userAddDTO);

            try {
                // Obținem utilizatorul normal
                var regularUser = await regularUserService.GetRegularUserById(userAddDTO.RegularUserID);
                if (regularUser == null)
                {
                    throw new InvalidOperationException($"No user found with ID {userAddDTO.RegularUserID}");
                }

                // Adăugăm utilizatorul la tabela PremiumUser
                var addedUser = await premiumUserService.AddPremiumUser(userAddDTO);

                // Actualizăm și tipul utilizatorului în tabela RegularUser la Premium (Type = 1)
                await regularUserService.UpdateUserType(userAddDTO.RegularUserID, 1);

                return addedUser;
            }
            catch (Exception ex)
            {
                // Logăm eroarea dar o retrimitem pentru a fi capturată de middleware
                Console.WriteLine($"Error adding premium user: {ex.Message}");
                throw;
            }
        }

        [HttpGet("get-user-by-email")]
        public async Task<RegularUserGetDTO> GetUserByEmail([FromQuery] string email)
        {
            return await regularUserService.GetRegularUserByEmail(email);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO user)
        {
            if (await regularUserService.CheckCredentials(user.Email, user.Password))
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Email)
                };

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));

                return Ok(new { message = "Login successful", redirectUrl = "/" });

            }
            return BadRequest(new { message = "Incorrect username or password" });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return NoContent();

        }

        [HttpGet("isAuthenticated")]
        public IActionResult IsAuthenticated()
        {
            if (User.Identity != null && User.Identity.IsAuthenticated)
            {
                var username = User.Identity.Name;
                return Ok(new { IsAuthenticated = true, Email = username });
            }
            return Ok(new { IsAuthenticated = false});
        }

        [HttpGet("check-premium")]
        public async Task<IActionResult> CheckPremiumStatus([FromQuery] int userId)
        {
            try
            {
                // Verificăm dacă utilizatorul există
                var regularUser = await regularUserService.GetRegularUserById(userId);
                if (regularUser == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                // Verificăm în baza de date dacă există o înregistrare PremiumUser pentru acest utilizator
                var isPremium = regularUser.Type == 1; // Verificăm din câmpul Type
                
                return Ok(new { IsPremium = isPremium });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error checking premium status", error = ex.Message });
            }
        }

    }
}
