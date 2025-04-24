namespace FitHub.AccountManagement.Domain.RegularUser
{
    public interface IRegularUserCommandRepository
    {
        Task<RegularUser> Add(RegularUser regularUser);
        
        Task<RegularUser> Update(RegularUser regularUser);

        Task SaveChanges();
    
    }
}
