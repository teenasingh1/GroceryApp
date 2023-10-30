using System;
using System.Collections.Generic;

namespace backend_api.Models
{
    //main class
	public class Order
	{
        public int OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public Guid UserId { get; set; }
        public decimal TotalAmount { get; set; }
        //enum
        public OrderStatus Status { get; set; }

        public List<OrderItem> OrderItems { get; set; }

        public Order()
        {
            OrderItems = new List<OrderItem>();
        }
    }
    public enum OrderStatus
    {
        Pending,
        Shipped,
        Delivered,
        Cancelled
    }
    public class OrderItem
    {
        public int OrderItemId { get; set; }
        public string ProductName { get; set; }
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
    }
}

