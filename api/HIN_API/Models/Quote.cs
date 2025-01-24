using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class Quote
    {
        public Quote()
        {
            LinePart = new HashSet<LinePart>();
            PartCatalog = new HashSet<PartCatalog>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(250)]
        public string Name { get; set; }
        [StringLength(250)]
        public string Customer { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Date { get; set; }
        [StringLength(250)]
        public string QuoteDescription { get; set; }
        [StringLength(50)]
        public string DocumentNumber { get; set; }
        [StringLength(250)]
        public string Status { get; set; }
        public int? AssignedTo { get; set; }
        public int? SalesRep { get; set; }
        public int? PaymentTerms { get; set; }
        public int? TypeOfSale { get; set; }
        public int? Tax { get; set; }
        public int? ProfitDollar { get; set; }
        public int? Total { get; set; }
        public int? ProfitPercentage { get; set; }
        public int? TotalAfterDiscount { get; set; }
        public int? TotalTax { get; set; }
        public int? FinalPrice { get; set; }
        public int? Pieces { get; set; }
        public int? ExpectedClose { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? ExpirationDate { get; set; }
        public int? Probability { get; set; }
        public int? CostCenter { get; set; }
        public int? CustomerId { get; set; }
        public int? PaymentTermsId { get; set; }
        public int? TypeOfSaleId { get; set; }
        public int? DiscountId { get; set; }
        public int? CostCenterId { get; set; }
        public int? StatusId { get; set; }
        public int? TaxId { get; set; }
        public int? AssignedToId { get; set; }
        public int? DealId { get; set; }
        public int? IdentYear { get; set; }
        public int? LastIdentNo { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? DiscountValue { get; set; }
        public int? DiscountType { get; set; }

        [ForeignKey(nameof(AssignedToId))]
        [InverseProperty(nameof(AssignedToDropdown.Quote))]
        public virtual AssignedToDropdown AssignedToNavigation { get; set; }
        [ForeignKey(nameof(CostCenterId))]
        [InverseProperty(nameof(CostCenterDropdown.Quote))]
        public virtual CostCenterDropdown CostCenterNavigation { get; set; }
        [ForeignKey(nameof(CustomerId))]
        [InverseProperty(nameof(CustomerDropdown.Quote))]
        public virtual CustomerDropdown CustomerNavigation { get; set; }
        [ForeignKey(nameof(DealId))]
        [InverseProperty("Quote")]
        public virtual Deal Deal { get; set; }
        [ForeignKey(nameof(DiscountId))]
        [InverseProperty(nameof(DiscountDropdown.Quote))]
        public virtual DiscountDropdown Discount { get; set; }
        [ForeignKey(nameof(PaymentTermsId))]
        [InverseProperty(nameof(PaymentTermsDropdown.Quote))]
        public virtual PaymentTermsDropdown PaymentTermsNavigation { get; set; }
        [ForeignKey(nameof(StatusId))]
        [InverseProperty(nameof(StatusDropdown.Quote))]
        public virtual StatusDropdown StatusNavigation { get; set; }
        [ForeignKey(nameof(TaxId))]
        [InverseProperty(nameof(TaxDropdown.Quote))]
        public virtual TaxDropdown TaxNavigation { get; set; }
        [ForeignKey(nameof(TypeOfSaleId))]
        [InverseProperty(nameof(TypeSaleDropdown.Quote))]
        public virtual TypeSaleDropdown TypeOfSaleNavigation { get; set; }
        [InverseProperty("Quote")]
        public virtual ICollection<LinePart> LinePart { get; set; }
        [InverseProperty("Quote")]
        public virtual ICollection<PartCatalog> PartCatalog { get; set; }
    }
}
