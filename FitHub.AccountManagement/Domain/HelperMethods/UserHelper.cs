namespace FitHub.AccountManagement.Domain.HelperMethods
{
    public class UserHelper
    {
        public static int CalculateAge(DateTime DateOfBirth)
        {
            var today = DateTime.Today;
            var age = today.Year - DateOfBirth.Year;
            if (DateOfBirth.Date > today.AddYears(-age)) age--;
            return age;
        }
        public static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
        public static bool IsValidEmail(string email)
        {
            return new System.ComponentModel.DataAnnotations.EmailAddressAttribute().IsValid(email);
        }
        public static bool IsValidPassword(string password)
        {
            return password.Length >= 8 && password.Length <= 40 && password.Any(char.IsDigit) && password.Any(char.IsUpper);
        }
        public static bool IsValidName(string name)
        {
            return name.Length <= 50;
        }
    }
}

