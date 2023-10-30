using backend_api.Data;
using backend_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Grocery.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfileController : Controller { 
        private readonly DBContext _dBContext;
       public ProfileController(DBContext dBContext) 
        {
        _dBContext = dBContext;
        }

        [HttpPost]
        [Route("signup")]
        public async Task<IActionResult> SignUpUser(ProfileUser user) 
        {
            // Check if a user with the same email already exists
            var tempUser = await _dBContext.ProfileUser.Where(x => x.Email.ToLower() == user.Email.ToLower()).ToListAsync();
            if (tempUser.Count==0) {
                // If no user with the same email exists, proceed with registration

                // Generate a new unique identifier for the user
                user.Id = Guid.NewGuid();
                // Generate a new unique identifier for the user's cart
                user.Cart.Id = Guid.NewGuid();
                user.CartId = user.Cart.Id.ToString();
                //commit 
                // Add the user to the database context
                await _dBContext.ProfileUser.AddAsync(user);
                //push
                // Save changes to the database
                await _dBContext.SaveChangesAsync();
                // Return a success response with the registered user
                return Ok(user);  
            }
            else
            {
                // If a user with the same email already exists, return a bad request response
                return BadRequest("Already registered");
            }
        }
        [HttpGet]
        [Route("login")]
        public async Task<IActionResult> LoginUser(string email,string password)
        {
            // Query the database for a user with the provided email and password
            var user = await _dBContext.ProfileUser.FirstOrDefaultAsync(x=>x.Email.ToLower()==email.ToLower() && x.password==password);
            if (user==null)
            {
                // If no user is found, return a bad request response with an error message
                return BadRequest("Invalid Email or Password ");

            }
            else
            {
                // If a user is found, return an HTTP 200 OK response with the user object as the response body
                return Ok(user);
            }

        }
    }
}
