namespace FitHub.AdminManagement.Domain.Admin
{
    public class Admin
    {
        public int ID { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;

        private Admin() { }
        public static Admin Create(string username, string password)
        {
            return new Admin
            {
                Username = username,
                Password = password
            };
        }
    }
}
