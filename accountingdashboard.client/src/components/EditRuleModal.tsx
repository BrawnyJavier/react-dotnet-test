import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import type { Rule } from '../api';

interface EditRuleModalProps {
  rule: Rule;
  isOpen: boolean;
  onClose: () => void;
  onSave: (rule: Rule) => Promise<void>;
}

export default function EditRuleModal({ rule, isOpen, onClose, onSave }: EditRuleModalProps) {
  const [formData, setFormData] = useState({
    client: rule.client || '',
    program: rule.program || '',
    depositDestination: rule.depositDestination || ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isOpen) {
      setFormData({
        client: rule.client || '',
        program: rule.program || '',
        depositDestination: rule.depositDestination || ''
      });
      setErrors({});
    }
  }, [rule, isOpen]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.client.trim()) {
      newErrors.client = 'Client is required';
    }
    
    if (!formData.program.trim()) {
      newErrors.program = 'Program is required';
    }
    
    if (!formData.depositDestination.trim()) {
      newErrors.depositDestination = 'Deposit destination is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    try {
      const updatedRule: Rule = {
        ...rule,
        client: formData.client.trim(),
        program: formData.program.trim(),
        depositDestination: formData.depositDestination.trim()
      };
      
      await onSave(updatedRule);
      onClose();
    } catch (error) {
      console.error('Failed to save rule:', error);
      setErrors({ submit: 'Failed to save rule. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Rule</h2>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="client">Client</label>
            <input
              id="client"
              type="text"
              value={formData.client}
              onChange={(e) => handleChange('client', e.target.value)}
              className={`form-input ${errors.client ? 'error' : ''}`}
              placeholder="e.g., Monday, Wrike"
            />
            {errors.client && <span className="error-message">{errors.client}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="program">Program</label>
            <select
              id="program"
              value={formData.program}
              onChange={(e) => handleChange('program', e.target.value)}
              className={`form-input ${errors.program ? 'error' : ''}`}
            >
              <option value="">Select a program</option>
              <option value="Impact">Impact</option>
              <option value="PartnerStack">PartnerStack</option>
              <option value="Awin">Awin</option>
              <option value="ShareASale">ShareASale</option>
              <option value="Commission Junction">Commission Junction</option>
              <option value="LinkShare">LinkShare</option>
            </select>
            {errors.program && <span className="error-message">{errors.program}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="depositDestination">Deposit Destination</label>
            <input
              id="depositDestination"
              type="text"
              value={formData.depositDestination}
              onChange={(e) => handleChange('depositDestination', e.target.value)}
              className={`form-input ${errors.depositDestination ? 'error' : ''}`}
              placeholder="e.g., PayPal ...1234, Wise ...9876"
            />
            <small className="form-help">
              Include provider name and last 4 digits (e.g., "PayPal ...1234")
            </small>
            {errors.depositDestination && <span className="error-message">{errors.depositDestination}</span>}
          </div>

          {errors.submit && (
            <div className="submit-error">
              {errors.submit}
            </div>
          )}

          <div className="modal-footer">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="save-button"
              disabled={isSaving}
            >
              <Save size={16} />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
