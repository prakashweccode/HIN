using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class Quote
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Customer { get; set; }
        public DateTime? Date { get; set; }
        public string QuoteDescription { get; set; }
        public string DocumentNumber { get; set; }
        public string Status { get; set; }
        public int? AssignedTo { get; set; }
        public int? SalesRep { get; set; }
        public int? PaymentTerms { get; set; }
        public int? TypeOfSale { get; set; }
        public int? Tax { get; set; }
        public int? ProfitDollar { get; set; }
        public int? Total { get; set; }
        public int? ProfitPercentage { get; set; }
        public decimal? DiscountValue { get; set; }
        public int? DiscountType { get; set; }
        public int? TotalAfterDiscount { get; set; }
        public int? TotalTax { get; set; }
        public int? FinalPrice { get; set; }
        public int? Pieces { get; set; }
        public int? ExpectedClose { get; set; }
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
    }
}
