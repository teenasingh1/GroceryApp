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
    public class CartController : Controller
    {
        private readonly DBContext _dBContext;
        public CartController(DBContext dbContext)
        {
            _dBContext = dbContext;
        }
        [HttpPut]
        [Route("update-cart")]
        public async Task<IActionResult> updateCart(Guid id,Cart cart)
        {

            var user = await _dBContext.ProfileUser.FirstOrDefaultAsync(x => x.Id==id);
            if (user == null)
            {
                return NotFound();
            }  
                
            user.Cart = cart;
            await _dBContext.SaveChangesAsync();
            user.CartId=user.Cart.Id.ToString();
            await _dBContext.SaveChangesAsync();
            return Ok(user);

        }
        [HttpGet]
        [Route("get-cart/{id:Guid}")]
        public async Task<IActionResult> getCart([FromRoute]Guid id)
        {
            var user = await _dBContext.ProfileUser.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            var CartID = user.CartId;
            var cart =  _dBContext.Cart.Include("Items").SingleOrDefault(x => x.Id.ToString() == CartID);
            await _dBContext.SaveChangesAsync();

            return new OkObjectResult(cart.Items);
        }

    }
}
