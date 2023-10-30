using System;
using System.Security.Cryptography.X509Certificates;
using static backend_api.Models.Product;

namespace backend_api.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public int AvailableQuantity { get; set; }
        public string ImageUrl { get; set; }
        public decimal Price { get; set; }
        public decimal Discount { get; set; }
        public string Specification { get; set; }
        
        //public List<Review> Reviews { get; set; }

    public Product()
        {
            
        }
        //public class Review
        //{
        //    public Guid id { get; set; }
        //    public int UserId { get; set; }
        //    public string ProductName { get; set; }
        //    public int ProductId { get; set; }
        //    public string ProductReview { get; set; }
            
        //}
    }

}

