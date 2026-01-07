import React, { forwardRef } from 'react';

/**
 * Reusable Textarea Component with Error Handling
 * 
 * Features:
 * - Automatic error display
 * - Accessibility features (ARIA labels, roles)
 * - Consistent styling
 * - Forward ref support
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Label text for the textarea
 * @param {string} props.name - Textarea name attribute
 * @param {string} props.value - Textarea value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.error - Error message to display
 * @param {boolean} props.required - Whether field is required
 * @param {boolean} props.disabled - Whether textarea is disabled
 * @param {number} props.rows - Number of rows
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.wrapperClassName - Additional CSS classes for wrapper
 * @param {Object} props.rest - Other standard HTML textarea props
 */
const Textarea = forwardRef(({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  rows = 4,
  className = '',
  wrapperClassName = '',
  id,
  ...rest
}, ref) => {
  // Generate ID if not provided
  const textareaId = id || name || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${textareaId}-error`;

  // Check if dashboard styling should be used (when wrapperClassName contains dashboard)
  const isDashboard = wrapperClassName.includes('dashboard') || className.includes('dashboard');
  
  // Determine textarea classes - use dashboard styles if in dashboard context
  const textareaClasses = isDashboard
    ? `${error ? 'input--error' : ''} ${className}`.trim()
    : `common__login__input ${error ? 'input--error' : ''} ${className}`.trim();

  // Determine wrapper classes - use dashboard form input wrapper if in dashboard context
  const wrapperClasses = isDashboard
    ? `dashboard__form__input ${wrapperClassName}`.trim()
    : `login__form ${wrapperClassName}`.trim();

  return (
    <div className={wrapperClasses}>
      {label && (
        <label 
          className="form__label" 
          htmlFor={textareaId}
        >
          {label}
          {required && <span className="text-danger" aria-label="required"> *</span>}
        </label>
      )}
      
      <textarea
        ref={ref}
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={textareaClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        aria-required={required}
        {...rest}
      />
      
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

Textarea.displayName = 'Textarea';

export default Textarea;

