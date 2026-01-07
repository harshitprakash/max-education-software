import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ProfileHeader from './ProfileHeader';
import { authService } from '../../services/application/authService';
import { showSuccess, showError } from '../../services/application/toastService';

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPasswords, setShowPasswords] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        // Clear error for this field
        if (formErrors[name]) {
            setFormErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const togglePasswordVisibility = (fieldName) => {
        setShowPasswords(prev => ({
            ...prev,
            [fieldName]: !prev[fieldName],
        }));
    };

    const validateForm = () => {
        const errors = {};
        
        if (!formData.currentPassword?.trim()) {
            errors.currentPassword = 'Current password is required';
        }
        
        if (!formData.newPassword?.trim()) {
            errors.newPassword = 'New password is required';
        } else if (formData.newPassword.length < 6) {
            errors.newPassword = 'New password must be at least 6 characters long';
        }
        
        if (!formData.confirmPassword?.trim()) {
            errors.confirmPassword = 'Please confirm your new password';
        } else if (formData.newPassword !== formData.confirmPassword) {
            errors.confirmPassword = 'New password and confirm password do not match';
        }
        
        if (formData.currentPassword && formData.newPassword && 
            formData.currentPassword === formData.newPassword) {
            errors.newPassword = 'New password must be different from current password';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            setIsSubmitting(true);
            setFormErrors({});

            const result = await authService.changePassword(
                formData.currentPassword,
                formData.newPassword,
                formData.confirmPassword
            );

            if (result.success) {
                showSuccess(result.message || 'Password changed successfully!');
                // Reset form
                setFormData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                });
            }
        } catch (error) {
            // Rules: Generic error messages (rule 20.10)
            const errorMessage = error.message || 'An error occurred while changing password';
            showError(errorMessage);
            setFormErrors({
                submit: errorMessage
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <ProfileHeader />
            <div className="dashboard">
                <div className="container-fluid full__width__padding">
                    <div className="row">
                        <Sidebar />
                        <div className="col-xl-9 col-lg-9 col-md-12">
                            <div className="dashboard__content__wraper">
                                <div className="dashboard__section__title mb-4">
                                    <h4>Change Password</h4>
                                </div>

                                <form onSubmit={handleSubmit} style={{ maxWidth: '100%' }}>
                                    {/* Current Password Field */}
                                    <div className="mb-4" style={{ width: '70%' }}>
                                        <label 
                                            className="form__label" 
                                            htmlFor="currentPassword"
                                            style={{ 
                                                display: 'block', 
                                                marginBottom: '8px', 
                                                fontWeight: '500',
                                                color: '#333',
                                                fontSize: '14px'
                                            }}
                                        >
                                            Current Password <span className="text-danger">*</span>
                                        </label>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                id="currentPassword"
                                                name="currentPassword"
                                                type={showPasswords.currentPassword ? 'text' : 'password'}
                                                value={formData.currentPassword}
                                                onChange={handleInputChange}
                                                placeholder="Enter your current password"
                                                required
                                                autoComplete="current-password"
                                                className="dashboard__form"
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 45px 12px 15px',
                                                    border: '1px solid #e0e0e0',
                                                    borderRadius: '8px',
                                                    fontSize: '14px',
                                                    transition: 'all 0.3s ease',
                                                    outline: 'none',
                                                    boxSizing: 'border-box'
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.borderColor = '#5f2ded';
                                                    e.target.style.boxShadow = '0 0 0 3px rgba(95, 45, 237, 0.1)';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.borderColor = formErrors.currentPassword ? '#dc3545' : '#e0e0e0';
                                                    e.target.style.boxShadow = 'none';
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => togglePasswordVisibility('currentPassword')}
                                                style={{
                                                    position: 'absolute',
                                                    right: '12px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    padding: '5px',
                                                    color: '#666',
                                                    fontSize: '18px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    transition: 'color 0.2s ease',
                                                    zIndex: 1
                                                }}
                                                onMouseEnter={(e) => e.target.style.color = '#5f2ded'}
                                                onMouseLeave={(e) => e.target.style.color = '#666'}
                                                aria-label={showPasswords.currentPassword ? 'Hide password' : 'Show password'}
                                                tabIndex={0}
                                            >
                                                {showPasswords.currentPassword ? (
                                                    <i className="icofont-eye-blocked"></i>
                                                ) : (
                                                    <i className="icofont-eye"></i>
                                                )}
                                            </button>
                                        </div>
                                        {formErrors.currentPassword && (
                                            <p className="form__error" role="alert" style={{ 
                                                marginTop: '6px', 
                                                marginBottom: '0',
                                                fontSize: '13px',
                                                color: '#dc3545'
                                            }}>
                                                {formErrors.currentPassword}
                                            </p>
                                        )}
                                    </div>

                                    {/* New Password Field */}
                                    <div className="mb-4" style={{ width: '70%' }}>
                                        <label 
                                            className="form__label" 
                                            htmlFor="newPassword"
                                            style={{ 
                                                display: 'block', 
                                                marginBottom: '8px', 
                                                fontWeight: '500',
                                                color: '#333',
                                                fontSize: '14px'
                                            }}
                                        >
                                            New Password <span className="text-danger">*</span>
                                        </label>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                id="newPassword"
                                                name="newPassword"
                                                type={showPasswords.newPassword ? 'text' : 'password'}
                                                value={formData.newPassword}
                                                onChange={handleInputChange}
                                                placeholder="Enter your new password (min. 6 characters)"
                                                required
                                                autoComplete="new-password"
                                                className="dashboard__form"
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 45px 12px 15px',
                                                    border: '1px solid #e0e0e0',
                                                    borderRadius: '8px',
                                                    fontSize: '14px',
                                                    transition: 'all 0.3s ease',
                                                    outline: 'none',
                                                    boxSizing: 'border-box'
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.borderColor = '#5f2ded';
                                                    e.target.style.boxShadow = '0 0 0 3px rgba(95, 45, 237, 0.1)';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.borderColor = formErrors.newPassword ? '#dc3545' : '#e0e0e0';
                                                    e.target.style.boxShadow = 'none';
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => togglePasswordVisibility('newPassword')}
                                                style={{
                                                    position: 'absolute',
                                                    right: '12px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    padding: '5px',
                                                    color: '#666',
                                                    fontSize: '18px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    transition: 'color 0.2s ease',
                                                    zIndex: 1
                                                }}
                                                onMouseEnter={(e) => e.target.style.color = '#5f2ded'}
                                                onMouseLeave={(e) => e.target.style.color = '#666'}
                                                aria-label={showPasswords.newPassword ? 'Hide password' : 'Show password'}
                                                tabIndex={0}
                                            >
                                                {showPasswords.newPassword ? (
                                                    <i className="icofont-eye-blocked"></i>
                                                ) : (
                                                    <i className="icofont-eye"></i>
                                                )}
                                            </button>
                                        </div>
                                        <small className="text-muted" style={{ 
                                            display: 'block', 
                                            marginTop: '6px',
                                            fontSize: '12px',
                                            color: '#6c757d'
                                        }}>
                                            Password must be at least 6 characters long
                                        </small>
                                        {formErrors.newPassword && (
                                            <p className="form__error" role="alert" style={{ 
                                                marginTop: '6px', 
                                                marginBottom: '0',
                                                fontSize: '13px',
                                                color: '#dc3545'
                                            }}>
                                                {formErrors.newPassword}
                                            </p>
                                        )}
                                    </div>

                                    {/* Confirm Password Field */}
                                    <div className="mb-4" style={{ width: '70%' }}>
                                        <label 
                                            className="form__label" 
                                            htmlFor="confirmPassword"
                                            style={{ 
                                                display: 'block', 
                                                marginBottom: '8px', 
                                                fontWeight: '500',
                                                color: '#333',
                                                fontSize: '14px'
                                            }}
                                        >
                                            Confirm New Password <span className="text-danger">*</span>
                                        </label>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type={showPasswords.confirmPassword ? 'text' : 'password'}
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                placeholder="Confirm your new password"
                                                required
                                                autoComplete="new-password"
                                                className="dashboard__form"
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 45px 12px 15px',
                                                    border: '1px solid #e0e0e0',
                                                    borderRadius: '8px',
                                                    fontSize: '14px',
                                                    transition: 'all 0.3s ease',
                                                    outline: 'none',
                                                    boxSizing: 'border-box'
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.borderColor = '#5f2ded';
                                                    e.target.style.boxShadow = '0 0 0 3px rgba(95, 45, 237, 0.1)';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.borderColor = formErrors.confirmPassword ? '#dc3545' : '#e0e0e0';
                                                    e.target.style.boxShadow = 'none';
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => togglePasswordVisibility('confirmPassword')}
                                                style={{
                                                    position: 'absolute',
                                                    right: '12px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    padding: '5px',
                                                    color: '#666',
                                                    fontSize: '18px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    transition: 'color 0.2s ease',
                                                    zIndex: 1
                                                }}
                                                onMouseEnter={(e) => e.target.style.color = '#5f2ded'}
                                                onMouseLeave={(e) => e.target.style.color = '#666'}
                                                aria-label={showPasswords.confirmPassword ? 'Hide password' : 'Show password'}
                                                tabIndex={0}
                                            >
                                                {showPasswords.confirmPassword ? (
                                                    <i className="icofont-eye-blocked"></i>
                                                ) : (
                                                    <i className="icofont-eye"></i>
                                                )}
                                            </button>
                                        </div>
                                        {formErrors.confirmPassword && (
                                            <p className="form__error" role="alert" style={{ 
                                                marginTop: '6px', 
                                                marginBottom: '0',
                                                fontSize: '13px',
                                                color: '#dc3545'
                                            }}>
                                                {formErrors.confirmPassword}
                                            </p>
                                        )}
                                    </div>

                                    {formErrors.submit && (
                                        <div className="mb-3" style={{ width: '70%' }}>
                                            <p className="text-danger" role="alert" style={{
                                                padding: '12px',
                                                backgroundColor: '#f8d7da',
                                                border: '1px solid #f5c6cb',
                                                borderRadius: '8px',
                                                fontSize: '14px',
                                                color: '#721c24'
                                            }}>
                                                {formErrors.submit}
                                            </p>
                                        </div>
                                    )}

                                    {/* Form Actions */}
                                    <div style={{ width: '70%', marginTop: '24px' }}>
                                        <div className="d-flex gap-3">
                                            <button
                                                type="submit"
                                                className="default__button"
                                                disabled={isSubmitting}
                                                style={{
                                                    padding: '12px 24px',
                                                    borderRadius: '8px',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    transition: 'all 0.3s ease',
                                                    minWidth: '140px'
                                                }}
                                            >
                                                {isSubmitting ? 'Changing Password...' : 'Change Password'}
                                            </button>
                                            <button
                                                type="button"
                                                className="default__button"
                                                onClick={() => {
                                                    setFormData({
                                                        currentPassword: '',
                                                        newPassword: '',
                                                        confirmPassword: '',
                                                    });
                                                    setFormErrors({});
                                                    setShowPasswords({
                                                        currentPassword: false,
                                                        newPassword: false,
                                                        confirmPassword: false,
                                                    });
                                                }}
                                                disabled={isSubmitting}
                                                style={{ 
                                                    backgroundColor: '#6c757d', 
                                                    borderColor: '#6c757d',
                                                    padding: '12px 24px',
                                                    borderRadius: '8px',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    transition: 'all 0.3s ease',
                                                    minWidth: '100px'
                                                }}
                                            >
                                                Reset
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangePassword;

