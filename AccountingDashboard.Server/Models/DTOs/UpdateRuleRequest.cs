using System.ComponentModel.DataAnnotations;

namespace AccountingDashboard.Server.Models.DTOs
{
    public class UpdateRuleRequest
    {
        [Required]
        [MaxLength(100)]
        public string Client { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Program { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string DepositDestination { get; set; } = string.Empty;
    }
}
