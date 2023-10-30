using System;
using System.Collections.Generic;

namespace backend_api.Models
{
	public class ProfileUser
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
        public string Email { get; set; }
        public long Phone { get; set; }
		public string password { get; set; }
        public bool IsAdmin { get; set; }
        public List<Order> Orders { get; set; }
        public Cart Cart { get; set; }
        public string CartId { get; set; }

        public ProfileUser()
        {
            Orders = new List<Order>();
        }

    }
}

