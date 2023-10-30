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
    public class OrderController : Controller
    {
        private readonly DBContext _dBContext;
        public OrderController(DBContext dbContext)
        {
            _dBContext = dbContext;
        }
        [HttpGet]
        [Route("get-order/{id:Guid}")]
        public async Task<IActionResult> getOrders([FromRoute] Guid id)
        {
            var user =   _dBContext.ProfileUser.Include("Orders").SingleOrDefault(x => x.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            if (user.Orders.Count() == 0)
            {
                return Ok("Empty order List");
            }
            else
            {
                var order = _dBContext.Order.Include("OrderItems").Where(x => x.UserId == id).ToList();
                return Ok(order);
            }

        }
        [HttpPost]
        [Route("place-order/{id:Guid}")]
        public async Task<IActionResult> placeOrder([FromRoute] Guid id,Order order)
        {
            var user = await _dBContext.ProfileUser.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                return NotFound("Invalid User");
            }
            order.UserId= user.Id;
            user.Orders.Add(order);
            await _dBContext.SaveChangesAsync();
            order.OrderItems.ForEach(async  (O) => { 
                var product= await _dBContext.Products.FirstOrDefaultAsync(x=>x.Name==O.ProductName);
                product.AvailableQuantity -= O.Quantity;
                

            });
            await _dBContext.SaveChangesAsync();
            return Ok(user.Orders);

        }

        
        }
}
