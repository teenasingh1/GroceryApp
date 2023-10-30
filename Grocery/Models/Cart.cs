using System;
using System.Collections.Generic;

namespace backend_api.Models
{
    public class Cart
    {
        public Guid Id { get; set; }
        public List<CartItem> Items { get; set; }
        //constructor
        public Cart()
        {
            Items = new List<CartItem>();
        }
    }
    public class CartItem
    {
       
        public Guid Id { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        //product table linked to cart and cart to cart items
        public CartItem()
        {
        }
    }
}

