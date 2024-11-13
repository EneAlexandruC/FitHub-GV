namespace FitHub.AccountManagement.Domain.RegularUser
{
    public interface IRegularUserQueryRepository
    {
        Task<RegularUser> GetUserByEmail(string email);

        Task SaveChanges();
    }
}
