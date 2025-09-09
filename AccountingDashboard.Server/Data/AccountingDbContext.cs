using AccountingDashboard.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace AccountingDashboard.Server.Data
{
    public class AccountingDbContext : DbContext
    {
        public AccountingDbContext(DbContextOptions<AccountingDbContext> options) : base(options)
        {
        }

        public DbSet<Rule> Rules { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed data
            modelBuilder.Entity<Rule>().HasData(
                new Rule { Id = 1, Client = "Monday", Program = "Impact", DepositDestination = "PayPal ...1234", Updated = DateTime.UtcNow.AddDays(-5) },
                new Rule { Id = 2, Client = "Wrike", Program = "PartnerStack", DepositDestination = "Wise ...9876", Updated = DateTime.UtcNow.AddDays(-3) },
                new Rule { Id = 3, Client = "Asana", Program = "Awin", DepositDestination = "PayPal ...5678", Updated = DateTime.UtcNow.AddDays(-10) },
                new Rule { Id = 4, Client = "Notion", Program = "Commission Junction", DepositDestination = "Stripe ...2345", Updated = DateTime.UtcNow.AddDays(-7) },
                new Rule { Id = 5, Client = "Slack", Program = "ShareASale", DepositDestination = "PayPal ...8765", Updated = DateTime.UtcNow.AddDays(-2) },
                new Rule { Id = 6, Client = "Discord", Program = "Impact", DepositDestination = "Wise ...4321", Updated = DateTime.UtcNow.AddDays(-1) },
                new Rule { Id = 7, Client = "Zoom", Program = "PartnerStack", DepositDestination = "Stripe ...6789", Updated = DateTime.UtcNow.AddDays(-8) },
                new Rule { Id = 8, Client = "Figma", Program = "Awin", DepositDestination = "PayPal ...3456", Updated = DateTime.UtcNow.AddDays(-4) },
                new Rule { Id = 9, Client = "Canva", Program = "Commission Junction", DepositDestination = "Wise ...7890", Updated = DateTime.UtcNow.AddDays(-6) },
                new Rule { Id = 10, Client = "Trello", Program = "ShareASale", DepositDestination = "Stripe ...1098", Updated = DateTime.UtcNow.AddDays(-9) },
                new Rule { Id = 11, Client = "Dropbox", Program = "Impact", DepositDestination = "PayPal ...2109", Updated = DateTime.UtcNow.AddDays(-12) },
                new Rule { Id = 12, Client = "Google Workspace", Program = "PartnerStack", DepositDestination = "Wise ...3210", Updated = DateTime.UtcNow.AddDays(-11) },
                new Rule { Id = 13, Client = "Microsoft Teams", Program = "Awin", DepositDestination = "Stripe ...4321", Updated = DateTime.UtcNow.AddDays(-15) },
                new Rule { Id = 14, Client = "Salesforce", Program = "Commission Junction", DepositDestination = "PayPal ...5432", Updated = DateTime.UtcNow.AddDays(-13) },
                new Rule { Id = 15, Client = "HubSpot", Program = "ShareASale", DepositDestination = "Wise ...6543", Updated = DateTime.UtcNow.AddDays(-14) },
                new Rule { Id = 16, Client = "Mailchimp", Program = "Impact", DepositDestination = "Stripe ...7654", Updated = DateTime.UtcNow.AddDays(-16) },
                new Rule { Id = 17, Client = "Shopify", Program = "PartnerStack", DepositDestination = "PayPal ...8765", Updated = DateTime.UtcNow.AddDays(-18) },
                new Rule { Id = 18, Client = "WooCommerce", Program = "Awin", DepositDestination = "Wise ...9876", Updated = DateTime.UtcNow.AddDays(-17) },
                new Rule { Id = 19, Client = "BigCommerce", Program = "Commission Junction", DepositDestination = "Stripe ...0987", Updated = DateTime.UtcNow.AddDays(-19) },
                new Rule { Id = 20, Client = "Square", Program = "ShareASale", DepositDestination = "PayPal ...1876", Updated = DateTime.UtcNow.AddDays(-20) },
                new Rule { Id = 21, Client = "Stripe", Program = "Impact", DepositDestination = "Wise ...2765", Updated = DateTime.UtcNow.AddDays(-21) },
                new Rule { Id = 22, Client = "PayPal", Program = "PartnerStack", DepositDestination = "Stripe ...3654", Updated = DateTime.UtcNow.AddDays(-22) },
                new Rule { Id = 23, Client = "Wise", Program = "Awin", DepositDestination = "PayPal ...4543", Updated = DateTime.UtcNow.AddDays(-23) },
                new Rule { Id = 24, Client = "Revolut", Program = "Commission Junction", DepositDestination = "Wise ...5432", Updated = DateTime.UtcNow.AddDays(-24) },
                new Rule { Id = 25, Client = "N26", Program = "ShareASale", DepositDestination = "Stripe ...6321", Updated = DateTime.UtcNow.AddDays(-25) }
            );
        }
    }
}
