namespace AccountingDashboard.Server.Models.DTOs
{
    public class RulesQueryParameters
    {
        private const int MaxPageSize = 100;
        private int _pageSize = 20;

        public int Page { get; set; } = 1;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
        }

        public string? Search { get; set; }
        public string? SortBy { get; set; } = "Client";
        public string? SortDirection { get; set; } = "asc";
    }
}
