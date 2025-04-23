namespace FitHub.ModuleIntegration.AccountManagement.RegularUser
{
    public interface IRegularUserService
    {
        Task<RegularUserGetDTO> AddUser(RegularUserAddDTO userAddDTO);

        Task<RegularUserGetDTO> GetRegularUserByEmail(string email);

        Task<RegularUserGetDTO> GetRegularUserById(int userId);

        Task<bool> CheckCredentials(string email, string password);
        
        Task<RegularUserGetDTO> UpdateUserType(int userId, int userType);
    }
}
