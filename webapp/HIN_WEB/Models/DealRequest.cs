using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class DealRequest
    {
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }

        public List<Users> users { get; set; }
    }
    public class WinLossRequest : DealRequest
    {

    }
    public class WonDealsRequest : DealRequest
    {

    }
    public class DealsLostByReasonRequest : DealRequest
    {
        public List<Reason> reasons { get; set; }
    }
    public class RevenueforecastbyrepRequest : DealRequest
    {

    }
    public class LeadConversionRequest : DealRequest
    {

    }
    public class ProposalClosedByRepRequest : DealRequest
    {

    }
    public class OpportunitiesovertimeRepRequest : DealRequest
    {

    }
    public class OpportunitieslostbyreasonRequest : DealRequest
    {

    }
    public class ProposalsclosedbycustomerRequest : DealRequest
    {

    }



}
