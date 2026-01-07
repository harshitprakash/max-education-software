import React, { forwardRef } from 'react';

/**
 * Reusable Input Component with Error Handling
 * 
 * Features:
 * - Supports all standard input types
 * - Automatic error display
 * - Accessibility features (ARIA labels, roles)
 * - Consistent styling
 * - Forward ref support
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Label text for the input
 * @param {string} props.name - Input name attribute
 * @param {string} props.type - Input type (text, email, password, etc.)
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.error - Error message to display
 * @param {string} props.autoComplete - Autocomplete attribute
 * @param {boolean} props.required - Whether field is required
 * @param {boolean} props.disabled - Whether input is disabled
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.wrapperClassName - Additional CSS classes for wrapper
 * @param {Object} props.rest - Other standard HTML input props
 */
const Input = forwardRef(({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
  required = false,
  disabled = false,
  className = '',
  wrapperClassName = '',
  id,
  ...rest
}, ref) => {
  // Generate ID if not provided
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${inputId}-error`;

  // Check if dashboard styling should be used (when wrapperClassName contains dashboard)
  const isDashboard = wrapperClassName.includes('dashboard') || className.includes('dashboard');
  
  // Determine input classes - use dashboard styles if in dashboard context
  const inputClasses = isDashboard 
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
          htmlFor={inputId}
        >
          {label}
          {required && <span className="text-danger" aria-label="required"> *</span>}
        </label>
      )}
      
      <input
        ref={ref}
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        disabled={disabled}
        className={inputClasses}
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

Input.displayName = 'Input';

export default Input;

