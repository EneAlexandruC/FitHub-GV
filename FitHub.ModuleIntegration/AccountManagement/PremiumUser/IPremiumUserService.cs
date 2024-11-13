namespace FitHub.ModuleIntegration.AccountManagement.PremiumUser
{
    public interface IPremiumUserService
    {
        Task<PremiumUserGetDTO> AddPremiumUser(PremiumUserAddDTO userAddDTO);
    }
}
