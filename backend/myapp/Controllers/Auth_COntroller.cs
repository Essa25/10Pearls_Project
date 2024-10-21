using myapp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AuthApi.Controllers
{
    [Route("api")]
    [ApiController]
    public class Auth_COntroller : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IConfiguration _configuration;

        public Auth_COntroller(ApplicationDBContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        // Signup Endpointx
        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("User cannot be null");
            }

            // Check if the user already exists
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == user.Username);
            if (existingUser != null)
            {
                return BadRequest("User already exists.");
            }

            // Here you can hash the password before saving it
            user.Password = HashPassword(user.Password); // Implement HashPassword method

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(user); // Consider returning a more appropriate response
        }

        // Login Endpoint
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest == null)
            {
                return BadRequest("Login request cannot be null.");
            }

            // Validate user credentials and retrieve user
            var user = _context.Users.FirstOrDefault(u => u.Username == loginRequest.Username && u.Password == loginRequest.Password);
            if (user == null) return Unauthorized();

            // Get JWT configuration values
            var key = _configuration["Jwt:Key"];
            var issuer = _configuration["Jwt:Issuer"];
            var audience = _configuration["Jwt:Audience"];

            // Ensure key, issuer, and audience are not null
            if (string.IsNullOrEmpty(key) || string.IsNullOrEmpty(issuer) || string.IsNullOrEmpty(audience))
            {
                return BadRequest("JWT configuration is invalid.");
            }

            // Generate JWT token
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
            Subject = new ClaimsIdentity(new Claim[]
            {
             new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username)
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            Issuer = issuer, // Add the issuer here
            Audience = audience, // Add the audience here
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)), SecurityAlgorithms.HmacSha256Signature)
};


            var token = tokenHandler.CreateToken(tokenDescriptor);
            return Ok(new { token = tokenHandler.WriteToken(token) });
        }

        private string HashPassword(string password)
        {
            // Implement a hashing mechanism (e.g., using BCrypt or SHA256)
            return password; // Replace with actual hashing
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; }  // Default to empty string
        public string Password { get; set; }
    }
}
