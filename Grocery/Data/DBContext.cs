using backend_api.Models;
using Microsoft.EntityFrameworkCore;
using System;
namespace backend_api.Data
{
    //connecting server to asp.net
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions options) : base(options)
        {
        }
        // after migrate fetching data
        public DbSet<ProfileUser> ProfileUser { get; set; }
        public DbSet<Product> Products{ get; set; }
        public DbSet<Cart> Cart { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<CartItem> CartItems { get; set; }

    }
}

