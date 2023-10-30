using backend_api.Data;
using backend_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient.Server;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Net.Http.Headers;
using System.Numerics;
using static backend_api.Models.Product;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.IO;

namespace Grocery.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly DBContext _dBContext;
        public ProductController(DBContext dbContext)
        {
            _dBContext = dbContext;
        }
        [HttpPost]
        [Route("add-product")]
        public async Task<IActionResult> AddProduct(Product product)
        {
            if (product == null)
            {
                return BadRequest("Null Product");
            }
            else
            {
                // Check if a product with the same name already exists
                var pro = await _dBContext.Products.FirstOrDefaultAsync(x => x.Name == product.Name);
                if (pro == null)
                {
                    await _dBContext.Products.AddAsync(product);
                    await _dBContext.SaveChangesAsync();
                    return Ok(product);
                }
                else
                {
                    return BadRequest($"Product {product.ProductId} already exists");
                }
            }
        }
        [HttpPost]
        [Route("uploadImage")]
        [DisableRequestSizeLimit]
        public IActionResult UploadFile()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);

                    }
                    // return Ok(new { dbPath });
                    
                    var link = "https://localhost:7292/api/Product/get-image/" + fileName;
                   return Ok(new { link });
                }
                else
                {
                    return BadRequest();
                }
                
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("get-image/{fileName}")]
        public async Task<IActionResult> GetImage([FromRoute] string fileName)
        {
            var path= "Resources/Images/"+fileName;
            if (System.IO.File.Exists(path))
            {
                byte[] b=System.IO.File.ReadAllBytes(path);
                return File(b, "image/jpg");
             
            }
            return BadRequest();

            
        }

        [HttpGet]
        [Route("get-all-products")]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _dBContext.Products.ToListAsync();
            return Ok(products);
        }
        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> getProduct([FromRoute]int id)
        {
            var product=await _dBContext.Products.FirstOrDefaultAsync(x=>x.ProductId == id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }
        [HttpPut]
        [Route("edit-product/{id:int}")]
        public async Task<IActionResult> editProduct([FromRoute] int id,Product updateProductRequest)
        {
            var product = await _dBContext.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            product.Name = updateProductRequest.Name;
            product.Description = updateProductRequest.Description;
            product.Price = updateProductRequest.Price;
            product.Category = updateProductRequest.Category;
            product.AvailableQuantity = updateProductRequest.AvailableQuantity;
            product.ImageUrl= updateProductRequest.ImageUrl;
            product.Specification= updateProductRequest.Specification;
            product.Discount= updateProductRequest.Discount;
            await _dBContext.SaveChangesAsync();
            return Ok(product);

        }
        [HttpDelete]
        [Route("delete-product/{id:int}")]
        public async Task<IActionResult> deleteProduct([FromRoute] int id)
        {
            var product = await _dBContext.Products.FindAsync(id);
            if (product == null) { return NotFound();}
                 _dBContext.Products.Remove(product);
            await _dBContext.SaveChangesAsync();
            return Ok(product);

        }


        [HttpGet]
        [Route("search-product/{category}/{q}")]
        public async Task<IActionResult> productSearch([FromRoute] string q, [FromRoute] string category )
        {
            /*var filteredProducts = products.Where(p =>
               p.Name.Contains(q, System.StringComparison.OrdinalIgnoreCase) &&
            (string.IsNullOrEmpty(category) || p.Category.Equals(category, System.StringComparison.OrdinalIgnoreCase))
            );
            */
            return Ok();
        }

        //    [HttpPost]
        //    [Route("Review")]
        //    public async Task<IActionResult> ProductReview(Review review)
        //    {
        //        if (review == null)
        //        {
        //            return BadRequest("Null Product");
        //        }
        //        else
        //        {
        //            var pro = await _dBContext.Products.Include("Reviews").FirstOrDefaultAsync(x => x.ProductId == review.ProductId);
        //            var r = pro.Reviews;
        //            r.Add(review);
        //            await _dBContext.SaveChangesAsync();
        //            return Ok(review);

        //        }  


        //    }
        //    [HttpGet]
        //    [Route("get-review/{id:int}")]
        //    public async Task<IActionResult> GetReviews ([FromRoute] int id)
        //    {
        //        var product = await _dBContext.Products.Include("Reviews").FirstOrDefaultAsync(x => x.ProductId == id);
        //        if (product == null)
        //        {
        //            return NotFound();
        //        }
        //        return Ok(product.Reviews);
        //    }


    }
}
