using FitHub.AccountManagement.Domain.HelperMethods;

namespace FitHub.AccountManagement.Domain.RegularUser
{
    public class RegularUser
    {
        public enum UserType
        {
            Regular = 0,
            Premium = 1 
        }

        public int ID { get; private set; }
        public string FirstName { get; private set; } = string.Empty;
        public string LastName { get; private set; } = string.Empty;
        public string Email { get; private set; } = string.Empty;
        public string Password { get; private set; } = string.Empty;
        public double Weight { get; private set; }
        public double Height { get; private set; }
        public DateTime DateOfBirth { get; private set; }
        public int Age => UserHelper.CalculateAge(DateOfBirth);
        public UserType Type { get; private set; }

        private RegularUser() { }

        public static RegularUser Create(string firstName, string lastName, string email, string password, double weight, double height, DateTime dateOfBirth)
        {
            if (string.IsNullOrWhiteSpace(firstName) || string.IsNullOrWhiteSpace(lastName))
            {
                throw new ArgumentException("Name fields cannot be empty.");
            }

            if (!UserHelper.IsValidName(firstName) || !UserHelper.IsValidName(lastName))
            {
                throw new ArgumentException("Name fields must be under 50 characters.");
            }

            if (!UserHelper.IsValidEmail(email))
            {
                throw new ArgumentException("Invalid email format.");
            }

            if (!UserHelper.IsValidPassword(password))
            {
                throw new ArgumentException("Password must be at least 8 characters long, contain a number and an uppercase letter.");
            }

            return new RegularUser()
            {
                FirstName = firstName,
                LastName = lastName,
                Email = email,
                Password = UserHelper.HashPassword(password),
                Weight = weight,
                Height = height,
                DateOfBirth = dateOfBirth,
                Type = UserType.Regular
            };
        }

        public void UpdateUserType(UserType type)
        {
            if (this.Type == UserType.Regular && type == UserType.Regular)
            {
                throw new InvalidOperationException("User is already regular.");
            }
            else if (this.Type == UserType.Premium && type == UserType.Premium)
            {
                throw new InvalidOperationException("User is already premium.");
            }

            this.Type = type;
        }



    }
}
