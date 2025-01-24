namespace DTO.Models
{
	public class TenantUserDataModel
	{
		public int Id { get; set; }
		public int? CompanyId { get; set; }
		public string Email { get; set; }
		public string UserName { get; set; }
		public string Tenant { get; set; }
		public int? UserId { get; set; }
		public bool? IsActive { get; set; }
	}
	public class TenantUserListDTO
    {
		public int Id { get; set; }
		public int? CompanyId { get; set; }
		public string Email { get; set; }
		public string UserName { get; set; }
		public string Tenant { get; set; }
		public int? UserId { get; set; }
		public bool? IsActive { get; set; }
	}
}

