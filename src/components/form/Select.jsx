import React, { forwardRef } from 'react';

/**
 * Reusable Select Component with Error Handling
 * 
 * Features:
 * - Automatic error display
 * - Accessibility features (ARIA labels, roles)
 * - Consistent styling
 * - Forward ref support
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Label text for the select
 * @param {string} props.name - Select name attribute
 * @param {string} props.value - Select value
 * @param {Function} props.onChange - Change handler
 * @param {Array} props.options - Array of options {value, label}
 * @param {string} props.placeholder - Placeholder option text
 * @param {string} props.error - Error message to display
 * @param {boolean} props.required - Whether field is required
 * @param {boolean} props.disabled - Whether select is disabled
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.wrapperClassName - Additional CSS classes for wrapper
 * @param {Object} props.rest - Other standard HTML select props
 */
const Select = forwardRef(({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder,
  error,
  required = false,
  disabled = false,
  className = '',
  wrapperClassName = '',
  id,
  ...rest
}, ref) => {
  // Generate ID if not provided
  const selectId = id || name || `select-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${selectId}-error`;

  // Check if dashboard styling should be used (when wrapperClassName contains dashboard)
  const isDashboard = wrapperClassName.includes('dashboard') || className.includes('dashboard');
  
  // Determine select classes - use dashboard styles if in dashboard context
  const selectClasses = isDashboard
    ? `${error ? 'input--error' : ''} ${className}`.trim()
    : `form-select ${error ? 'input--error' : ''} ${className}`.trim();

  // Determine wrapper classes - use dashboard form input wrapper if in dashboard context
  const wrapperClasses = isDashboard
    ? `dashboard__form__input ${wrapperClassName}`.trim()
    : `login__form ${wrapperClassName}`.trim();

  return (
    <div className={wrapperClasses}>
      {label && (
        <label 
          className="form__label" 
          htmlFor={selectId}
        >
          {label}
          {required && <span className="text-danger" aria-label="required"> *</span>}
        </label>
      )}
      
      <select
        ref={ref}
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={selectClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        aria-required={required}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p 
          id={errorId}
          className="form__error" 
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;

