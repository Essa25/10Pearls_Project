using Microsoft.EntityFrameworkCore;
using myapp.Models;

namespace myapp.Models
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Employee> Employee { get; set; }
    }
}
