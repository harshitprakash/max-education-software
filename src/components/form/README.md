# Reusable Form Components

This directory contains reusable form components with built-in error handling and accessibility features.

## Components

### Input
A reusable input component for text, email, password, and other input types.

### Textarea
A reusable textarea component for multi-line text input.

### Select
A reusable select/dropdown component.

## Features

- ✅ Automatic error display
- ✅ Accessibility (ARIA labels, roles)
- ✅ Consistent styling
- ✅ Forward ref support
- ✅ Required field indicators
- ✅ Disabled state support
- ✅ Customizable classes

## Usage Examples

### Basic Input

```jsx
import { Input } from '../components/form';

const [email, setEmail] = useState('');
const [errors, setErrors] = useState({});

<Input
  label="Email"
  name="email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
  placeholder="Enter your email"
  required
/>
```

### Password Input

```jsx
<Input
  label="Password"
  name="password"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  error={errors.password}
  autoComplete="current-password"
  required
/>
```

### Textarea

```jsx
import { Textarea } from '../components/form';

<Textarea
  label="Message"
  name="message"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  error={errors.message}
  rows={5}
  required
/>
```

### Select Dropdown

```jsx
import { Select } from '../components/form';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
];

<Select
  label="Choose an option"
  name="option"
  value={selectedOption}
  onChange={(e) => setSelectedOption(e.target.value)}
  options={options}
  error={errors.option}
  placeholder="Select an option"
  required
/>
```

### With Custom Classes

```jsx
<Input
  label="Custom Input"
  name="custom"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  className="custom-input-class"
  wrapperClassName="custom-wrapper-class"
/>
```

### With Ref (for focus management)

```jsx
import { useRef } from 'react';
import { Input } from '../components/form';

const inputRef = useRef(null);

// Focus the input
inputRef.current?.focus();

<Input
  ref={inputRef}
  label="Focusable Input"
  name="focusable"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

## Props

### Input Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | - | Label text for the input |
| name | string | - | Input name attribute |
| type | string | 'text' | Input type (text, email, password, etc.) |
| value | string | - | Input value |
| onChange | function | - | Change handler |
| placeholder | string | - | Placeholder text |
| error | string | - | Error message to display |
| autoComplete | string | - | Autocomplete attribute |
| required | boolean | false | Whether field is required |
| disabled | boolean | false | Whether input is disabled |
| className | string | '' | Additional CSS classes for input |
| wrapperClassName | string | '' | Additional CSS classes for wrapper |
| id | string | - | Input ID (auto-generated if not provided) |

### Textarea Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | - | Label text for the textarea |
| name | string | - | Textarea name attribute |
| value | string | - | Textarea value |
| onChange | function | - | Change handler |
| placeholder | string | - | Placeholder text |
| error | string | - | Error message to display |
| required | boolean | false | Whether field is required |
| disabled | boolean | false | Whether textarea is disabled |
| rows | number | 4 | Number of rows |
| className | string | '' | Additional CSS classes |
| wrapperClassName | string | '' | Additional CSS classes for wrapper |
| id | string | - | Textarea ID (auto-generated if not provided) |

### Select Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | - | Label text for the select |
| name | string | - | Select name attribute |
| value | string | - | Select value |
| onChange | function | - | Change handler |
| options | array | [] | Array of {value, label} objects |
| placeholder | string | - | Placeholder option text |
| error | string | - | Error message to display |
| required | boolean | false | Whether field is required |
| disabled | boolean | false | Whether select is disabled |
| className | string | '' | Additional CSS classes |
| wrapperClassName | string | '' | Additional CSS classes for wrapper |
| id | string | - | Select ID (auto-generated if not provided) |

## Accessibility

All components include:
- Proper ARIA labels and roles
- Error announcements (aria-live)
- Required field indicators
- Invalid state indicators (aria-invalid)
- Associated error messages (aria-describedby)

## Error Handling

Errors are displayed automatically when the `error` prop is provided:

```jsx
const [errors, setErrors] = useState({
  email: 'Email is required',
  password: 'Password must be at least 8 characters'
});

<Input
  label="Email"
  name="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
/>
```

The error message will appear below the input with proper ARIA attributes for screen readers.

