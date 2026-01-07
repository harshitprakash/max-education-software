# Toast Notification Service

Centralized toast notification service using `react-toastify` for consistent messaging throughout the application.

## Installation

The service uses `react-toastify` which is already installed. The `ToastContainer` is set up in `App.jsx`.

## Usage

### Basic Usage

```jsx
import { showSuccess, showError, showWarning, showInfo } from '../services/application/toastService';

// Success message
showSuccess('Operation completed successfully!');

// Error message
showError('Something went wrong. Please try again.');

// Warning message
showWarning('Please check your input.');

// Info message
showInfo('New updates available.');
```

### With Custom Options

```jsx
import { showSuccess } from '../services/application/toastService';

showSuccess('Saved!', {
  autoClose: 2000, // Close after 2 seconds
  position: 'top-center',
});
```

### Using ToastType Enum

```jsx
import { showToast, ToastType } from '../services/application/toastService';

showToast(ToastType.SUCCESS, 'Success message');
showToast(ToastType.ERROR, 'Error message');
showToast(ToastType.WARNING, 'Warning message');
showToast(ToastType.INFO, 'Info message');
```

### Dismiss All Toasts

```jsx
import { dismissAll } from '../services/application/toastService';

dismissAll();
```

## Available Functions

| Function | Description | Default Auto-Close |
|----------|-------------|-------------------|
| `showSuccess(message, options?)` | Show success toast | 3000ms |
| `showError(message, options?)` | Show error toast | 5000ms |
| `showWarning(message, options?)` | Show warning toast | 3000ms |
| `showInfo(message, options?)` | Show info toast | 3000ms |
| `showToast(type, message, options?)` | Show toast with custom type | 3000ms |
| `dismissAll()` | Dismiss all active toasts | - |

## Default Configuration

- **Position**: `top-right`
- **Auto Close**: `3000ms` (errors: `5000ms`)
- **Hide Progress Bar**: `false`
- **Close On Click**: `true`
- **Pause On Hover**: `true`
- **Draggable**: `true`
- **Theme**: `light`

## Custom Options

You can override any default option:

```jsx
showSuccess('Message', {
  position: 'bottom-left',
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: false,
});
```

## Available Positions

- `top-right` (default)
- `top-center`
- `top-left`
- `bottom-right`
- `bottom-center`
- `bottom-left`

## Examples in Application

### Login Success

```jsx
import { showSuccess } from '../services/application/toastService';

if (result.success) {
  showSuccess('Login successful! Redirecting...');
  navigate('/dashboard');
}
```

### Login Error

```jsx
import { showError } from '../services/application/toastService';

if (!result.success) {
  showError(result.error || 'Invalid credentials');
}
```

### Logout Success

```jsx
import { showSuccess } from '../services/application/toastService';

const handleLogout = async () => {
  await logout();
  showSuccess('Logged out successfully');
  navigate('/login');
};
```

### API Error Handling

```jsx
import { showError } from '../services/application/toastService';

try {
  await apiCall();
} catch (error) {
  showError(error.message || 'An error occurred');
}
```

## Best Practices

1. **Use appropriate toast types**: Success for positive actions, Error for failures, Warning for cautions, Info for general information.

2. **Keep messages concise**: Toast messages should be short and clear.

3. **Don't overuse**: Too many toasts can be annoying. Use them for important actions.

4. **Error messages**: Use error toasts for API errors, validation failures, etc.

5. **Success messages**: Use success toasts for completed actions (save, delete, update, etc.).

6. **Auto-close timing**: 
   - Success/Info: 3 seconds
   - Errors: 5 seconds (longer for users to read)
   - Warnings: 3 seconds

## Integration with Forms

```jsx
import { showSuccess, showError } from '../services/application/toastService';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    await submitForm();
    showSuccess('Form submitted successfully!');
    // Clear form or redirect
  } catch (error) {
    showError(error.message || 'Failed to submit form');
  }
};
```

## Integration with API Calls

```jsx
import { showSuccess, showError } from '../services/application/toastService';
import { apiClient } from '../services/infrastructure/apiClient';

const fetchData = async () => {
  try {
    const response = await apiClient.get('/api/data');
    const data = await response.json();
    showSuccess('Data loaded successfully');
    return data;
  } catch (error) {
    showError('Failed to load data');
    throw error;
  }
};
```

