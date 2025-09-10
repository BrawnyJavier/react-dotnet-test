import { useState, useEffect, useCallback } from 'react';
import { Search, Edit, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { RulesService } from '../api';
import type { Rule, RulePagedResponse } from '../api';
import EditRuleModal from './EditRuleModal';

export default function RulesTable() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string>('client');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const pageSize = 20;

  const loadRules = useCallback(async () => {
    setLoading(true);
    try {
      const response: RulePagedResponse = await RulesService.getApiRules(
        currentPage,
        pageSize,
        searchTerm || undefined,
        sortBy,
        sortDirection
      );
      
      setRules(response.data || []);
      setTotalPages(response.totalPages || 1);
      setTotalCount(response.totalCount || 0);
    } catch (error) {
      console.error('Failed to load rules:', error);
      setRules([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, sortBy, sortDirection]);

  useEffect(() => {
    loadRules();
  }, [loadRules]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
    setCurrentPage(1); // Reset to first page when sorting
  };

  const handleEdit = (rule: Rule) => {
    setSelectedRule(rule);
    setIsEditModalOpen(true);
  };

  const handleSaveRule = async (updatedRule: Rule) => {
    try {
      if (updatedRule.id) {
        await RulesService.putApiRules(updatedRule.id, {
          client: updatedRule.client,
          program: updatedRule.program,
          depositDestination: updatedRule.depositDestination
        });
        await loadRules(); // Refresh the table
      }
    } catch (error) {
      console.error('Failed to update rule:', error);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getSortIcon = (column: string) => {
    if (sortBy !== column) return null;
    return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className="rules-table-container">
      <div className="rules-header">
        <h1>Receivables Monitoring - Rules</h1>
        <div className="search-container">
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search by client, program, or deposit destination..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading rules...</div>
      ) : (
        <>
          <div className="table-container">
            <table className="rules-table">
              <thead>
                <tr>
                  <th>
                    <button 
                      className="sort-header"
                      onClick={() => handleSort('client')}
                    >
                      Client {getSortIcon('client')}
                    </button>
                  </th>
                  <th>Program</th>
                  <th>Deposit Destination</th>
                  <th>
                    <button 
                      className="sort-header"
                      onClick={() => handleSort('updated')}
                    >
                      Updated {getSortIcon('updated')}
                    </button>
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rules.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="no-data">
                      No rules found
                    </td>
                  </tr>
                ) : (
                  rules.map((rule) => (
                    <tr key={rule.id}>
                      <td className="client-cell">{rule.client}</td>
                      <td className="program-cell">{rule.program}</td>
                      <td className="destination-cell">{rule.depositDestination}</td>
                      <td className="updated-cell">{formatDate(rule.updated)}</td>
                      <td className="action-cell">
                        <button
                          className="edit-button"
                          onClick={() => handleEdit(rule)}
                        >
                          <Edit size={16} />
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <div className="pagination-info">
              Showing {startIndex}-{endIndex} of {totalCount} rules
            </div>
            <div className="pagination-controls">
              <button
                className="pagination-button"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              
              <span className="page-info">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                className="pagination-button"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}

      {isEditModalOpen && selectedRule && (
        <EditRuleModal
          rule={selectedRule}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedRule(null);
          }}
          onSave={handleSaveRule}
        />
      )}
    </div>
  );
}
