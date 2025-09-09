using System.ComponentModel.DataAnnotations;

namespace AccountingDashboard.Server.Models
{
    public class Rule
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Client { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Program { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string DepositDestination { get; set; } = string.Empty;

        public DateTime Updated { get; set; } = DateTime.UtcNow;
    }
}
