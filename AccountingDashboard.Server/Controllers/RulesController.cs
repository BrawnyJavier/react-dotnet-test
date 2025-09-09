using AccountingDashboard.Server.Data;
using AccountingDashboard.Server.Models;
using AccountingDashboard.Server.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AccountingDashboard.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RulesController : ControllerBase
    {
        private readonly AccountingDbContext _context;
        private readonly ILogger<RulesController> _logger;

        public RulesController(AccountingDbContext context, ILogger<RulesController> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Get rules with pagination, search, and sorting
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<PagedResponse<Rule>>> GetRules([FromQuery] RulesQueryParameters parameters)
        {
            var query = _context.Rules.AsQueryable();

            // Apply search filter
            if (!string.IsNullOrWhiteSpace(parameters.Search))
            {
                var searchTerm = parameters.Search.ToLower();
                query = query.Where(r => 
                    r.Client.ToLower().Contains(searchTerm) ||
                    r.Program.ToLower().Contains(searchTerm) ||
                    r.DepositDestination.ToLower().Contains(searchTerm));
            }

            // Apply sorting
            query = parameters.SortBy?.ToLower() switch
            {
                "client" => parameters.SortDirection?.ToLower() == "desc" 
                    ? query.OrderByDescending(r => r.Client)
                    : query.OrderBy(r => r.Client),
                "updated" => parameters.SortDirection?.ToLower() == "desc" 
                    ? query.OrderByDescending(r => r.Updated)
                    : query.OrderBy(r => r.Updated),
                "program" => parameters.SortDirection?.ToLower() == "desc" 
                    ? query.OrderByDescending(r => r.Program)
                    : query.OrderBy(r => r.Program),
                "depositdestination" => parameters.SortDirection?.ToLower() == "desc" 
                    ? query.OrderByDescending(r => r.DepositDestination)
                    : query.OrderBy(r => r.DepositDestination),
                _ => query.OrderBy(r => r.Client)
            };

            var totalCount = await query.CountAsync();

            var rules = await query
                .Skip((parameters.Page - 1) * parameters.PageSize)
                .Take(parameters.PageSize)
                .ToListAsync();

            var response = new PagedResponse<Rule>
            {
                Data = rules,
                TotalCount = totalCount,
                Page = parameters.Page,
                PageSize = parameters.PageSize
            };

            return Ok(response);
        }

        /// <summary>
        /// Get a specific rule by ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<Rule>> GetRule(int id)
        {
            var rule = await _context.Rules.FindAsync(id);

            if (rule == null)
            {
                return NotFound($"Rule with ID {id} not found.");
            }

            return Ok(rule);
        }

        /// <summary>
        /// Create a new rule
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Rule>> CreateRule(CreateRuleRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var rule = new Rule
            {
                Client = request.Client,
                Program = request.Program,
                DepositDestination = request.DepositDestination,
                Updated = DateTime.UtcNow
            };

            _context.Rules.Add(rule);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRule), new { id = rule.Id }, rule);
        }

        /// <summary>
        /// Update an existing rule
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<Rule>> UpdateRule(int id, UpdateRuleRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var rule = await _context.Rules.FindAsync(id);

            if (rule == null)
            {
                return NotFound($"Rule with ID {id} not found.");
            }

            rule.Client = request.Client;
            rule.Program = request.Program;
            rule.DepositDestination = request.DepositDestination;
            rule.Updated = DateTime.UtcNow;

            _context.Entry(rule).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(rule);
        }

        /// <summary>
        /// Delete a rule
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRule(int id)
        {
            var rule = await _context.Rules.FindAsync(id);

            if (rule == null)
            {
                return NotFound($"Rule with ID {id} not found.");
            }

            _context.Rules.Remove(rule);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
