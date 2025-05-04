﻿namespace FitHub.ModuleIntegration.AccountManagement.RegularUser
{
    public class RegularUserGetDTO
    {
        public int ID { get; set; }
        public string FirstName { get;  set; } = string.Empty;
        public string LastName { get;  set; } = string.Empty;
        public string Email { get;  set; } = string.Empty;
        public string Password { get;  set; } = string.Empty;
        public double Weight { get;  set; }
        public double Height { get;  set; }
        public DateTime DateOfBirth { get;  set; }
        public int Type { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
