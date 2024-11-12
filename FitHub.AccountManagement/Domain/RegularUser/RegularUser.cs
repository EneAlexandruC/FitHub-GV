using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

//TODO add weight, height, date of birth, age

namespace FitHub.AccoutManagement.Domain.RegularUser
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

        public UserType Type { get; private set; }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        private RegularUser() { }

        public static RegularUser Create(string firstName, string lastName, string email, string password)
        {
            //TODO password = password.To Hash Value
            //TODO add weight, height, date of birth, age

            //if (string.IsNullOrEmpty(name) || name.Length > 100)
            //    throw new ArgumentException("Name cannot be null, empty, or exceed 100 characters.", nameof(name));

            return new RegularUser
            {
                FirstName = firstName,
                LastName = lastName,
                Email = email,
                Password = password,
                Type = UserType.Regular
            };
        }

        public void UpdateUserType(UserType type)
        {
            if (Type == type)
            {
                throw new InvalidOperationException("The new status is the same as the current status.");
            }

            Type = type;
        }
    }
}
