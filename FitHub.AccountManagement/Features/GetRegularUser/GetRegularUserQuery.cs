using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitHub.AccountManagement.Features.GetRegularUser
{
    public class GetRegularUserQuery
    {
        public string? Email { get; set; }
        public int? UserId { get; set; }
    }
}
