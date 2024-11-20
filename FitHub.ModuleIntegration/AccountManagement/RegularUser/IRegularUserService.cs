namespace FitHub.ModuleIntegration.AccountManagement.RegularUser
{
    public interface IRegularUserService
    {
        Task<RegularUserGetDTO> AddUser(RegularUserAddDTO userAddDTO);

        Task<RegularUserGetDTO> GetRegularUserByEmail(string email);

        Task<bool> CheckCredentials(string email, string password);
    }
}
