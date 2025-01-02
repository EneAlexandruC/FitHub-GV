namespace FitHub.AccountManagement.Domain.RegularUser
{
    public interface IRegularUserCommandRepository
    {
        Task<RegularUser> Add(RegularUser regularUser);

        Task SaveChanges();
    
    }
}
