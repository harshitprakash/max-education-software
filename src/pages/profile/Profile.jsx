import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ProfileHeader from './ProfileHeader';
import { apiClient } from '../../services/infrastructure/apiClient';
import { showError, showSuccess } from '../../services/application/toastService';
import { Input, Textarea, Select } from '../../components/form';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                // Use apiClient which automatically injects Bearer token
                // Rules: Token injection MUST be centralized (rule 18.3)
                const response = await apiClient.get('/api/students/profile');
                
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    // Rules: Generic error messages (rule 20.10 - Information Leakage)
                    throw new Error(errorData.message || 'Failed to load profile data');
                }

                const apiResponse = await response.json();
                
                // Validate response structure
                if (apiResponse.status === 200 && apiResponse.data) {
                    setProfileData(apiResponse.data);
                    // Initialize form data with all profile data
                    const data = apiResponse.data;
                    setFormData({
                        firstName: data.firstName || '',
                        middleName: data.middleName || '',
                        lastName: data.lastName || '',
                        phoneNumber: data.phoneNumber || '',
                        dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : '',
                        address: data.address || '',
                        city: data.city || '',
                        state: data.state || '',
                        country: data.country || '',
                        pincode: data.pincode || '',
                        gender: data.gender || '',
                        qualification: data.qualification || '',
                        occupation: data.occupation || '',
                        fatherName: data.fatherName || '',
                        fatherMobile: data.fatherMobile || '',
                        husbandName: data.husbandName || '',
                        guardianType: data.guardianType || '',
                        guardianName: data.guardianName || '',
                        aadharNumber: data.aadharNumber || '',
                        category: data.category || '',
                        batchTiming: data.batchTiming || '',
                    });
                } else {
                    throw new Error(apiResponse.message || 'Invalid response from server');
                }
            } catch (error) {
                // Rules: Generic error messages (rule 20.10)
                const errorMessage = error.message || 'An error occurred while loading profile';
                setError(errorMessage);
                showError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

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

    const handleCancel = () => {
        // Reset form data to original profile data
        if (profileData) {
            const data = profileData;
            setFormData({
                firstName: data.firstName || '',
                middleName: data.middleName || '',
                lastName: data.lastName || '',
                phoneNumber: data.phoneNumber || '',
                dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : '',
                address: data.address || '',
                city: data.city || '',
                state: data.state || '',
                country: data.country || '',
                pincode: data.pincode || '',
                gender: data.gender || '',
                qualification: data.qualification || '',
                occupation: data.occupation || '',
                fatherName: data.fatherName || '',
                fatherMobile: data.fatherMobile || '',
                husbandName: data.husbandName || '',
                guardianType: data.guardianType || '',
                guardianName: data.guardianName || '',
                aadharNumber: data.aadharNumber || '',
                category: data.category || '',
                batchTiming: data.batchTiming || '',
            });
        }
        setFormErrors({});
        setIsEditing(false);
    };

    const validateForm = () => {
        const errors = {};
        
        if (!formData.firstName?.trim()) {
            errors.firstName = 'First name is required';
        }
        
        if (!formData.lastName?.trim()) {
            errors.lastName = 'Last name is required';
        }

        if (formData.phoneNumber && formData.phoneNumber.trim() && !/^[+]?[\d\s-()]+$/.test(formData.phoneNumber.trim())) {
            errors.phoneNumber = 'Please enter a valid phone number';
        }

        if (formData.pincode && formData.pincode.trim() && !/^\d{6}$/.test(formData.pincode.trim())) {
            errors.pincode = 'Pincode must be 6 digits';
        }

        if (formData.aadharNumber && formData.aadharNumber.trim() && !/^\d{12}$/.test(formData.aadharNumber.trim())) {
            errors.aadharNumber = 'Aadhar number must be 12 digits';
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
            setIsSaving(true);
            setFormErrors({});

            // Prepare update payload (only send fields that can be updated)
            // Rules: Email is NOT updatable
            const updatePayload = {
                FirstName: formData.firstName.trim(),
                MiddleName: formData.middleName?.trim() || null,
                LastName: formData.lastName.trim(),
                PhoneNumber: formData.phoneNumber?.trim() || null,
                DateOfBirth: formData.dateOfBirth || null,
                Address: formData.address?.trim() || null,
                City: formData.city?.trim() || null,
                State: formData.state?.trim() || null,
                Country: formData.country?.trim() || null,
                Pincode: formData.pincode?.trim() || null,
                Gender: formData.gender || null,
                Qualification: formData.qualification?.trim() || null,
                Occupation: formData.occupation?.trim() || null,
                FatherName: formData.fatherName?.trim() || null,
                FatherMobile: formData.fatherMobile?.trim() || null,
                HusbandName: formData.husbandName?.trim() || null,
                GuardianType: formData.guardianType || null,
                GuardianName: formData.guardianName?.trim() || null,
                AadharNumber: formData.aadharNumber?.trim() || null,
                Category: formData.category || null,
                BatchTiming: formData.batchTiming || null,
            };

            // Use apiClient which automatically injects Bearer token
            // Rules: Token injection MUST be centralized (rule 18.3)
            const response = await apiClient.put('/api/students/profile', updatePayload);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                // Rules: Generic error messages (rule 20.10)
                throw new Error(errorData.message || 'Failed to update profile');
            }

            const apiResponse = await response.json();

            // Validate response structure
            if (apiResponse.status === 200) {
                showSuccess('Profile updated successfully!');
                setIsEditing(false);
                
                // Refresh profile data
                const refreshResponse = await apiClient.get('/api/students/profile');
                if (refreshResponse.ok) {
                    const refreshData = await refreshResponse.json();
                    if (refreshData.status === 200 && refreshData.data) {
                        const data = refreshData.data;
                        setProfileData(data);
                        setFormData({
                            firstName: data.firstName || '',
                            middleName: data.middleName || '',
                            lastName: data.lastName || '',
                            phoneNumber: data.phoneNumber || '',
                            dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : '',
                            address: data.address || '',
                            city: data.city || '',
                            state: data.state || '',
                            country: data.country || '',
                            pincode: data.pincode || '',
                            gender: data.gender || '',
                            qualification: data.qualification || '',
                            occupation: data.occupation || '',
                            fatherName: data.fatherName || '',
                            fatherMobile: data.fatherMobile || '',
                            husbandName: data.husbandName || '',
                            guardianType: data.guardianType || '',
                            guardianName: data.guardianName || '',
                            aadharNumber: data.aadharNumber || '',
                            category: data.category || '',
                            batchTiming: data.batchTiming || '',
                        });
                    }
                }
            } else {
                throw new Error(apiResponse.message || 'Invalid response from server');
            }
        } catch (error) {
            // Rules: Generic error messages (rule 20.10)
            const errorMessage = error.message || 'An error occurred while updating profile';
            showError(errorMessage);
            
            // Handle validation errors
            if (error.message && error.message.includes('Validation')) {
                // Could parse validation errors here if API returns them
            }
        } finally {
            setIsSaving(false);
        }
    };

    // Format date helper
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch {
            return dateString;
        }
    };

    // Format date only (without time)
    const formatDateOnly = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } catch {
            return dateString;
        }
    };

    // Gender options
    const genderOptions = [
        { value: 'MALE', label: 'Male' },
        { value: 'FEMALE', label: 'Female' },
        { value: 'OTHER', label: 'Other' },
    ];

    // Guardian type options
    const guardianTypeOptions = [
        { value: 'FATHER', label: 'Father' },
        { value: 'MOTHER', label: 'Mother' },
        { value: 'HUSBAND', label: 'Husband' },
        { value: 'WIFE', label: 'Wife' },
        { value: 'OTHER', label: 'Other' },
    ];

    // Category options
    const categoryOptions = [
        { value: 'GENERAL', label: 'General' },
        { value: 'OBC', label: 'OBC' },
        { value: 'SC', label: 'SC' },
        { value: 'ST', label: 'ST' },
        { value: 'OTHER', label: 'Other' },
    ];

    return (
<>
            <ProfileHeader />
        <div className="dashboard">
            <div className="container-fluid full__width__padding">
                <div className="row">
                    <Sidebar />
                    <div className="col-xl-9 col-lg-9 col-md-12">
                        <div className="dashboard__content__wraper">
                                <div className="dashboard__section__title d-flex justify-content-between align-items-center">
                                <h4>My Profile</h4>
                                    {!isEditing && profileData && (
                                        <button
                                            type="button"
                                            className="default__button"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            <i className="icofont-edit me-2"></i>
                                            Edit Profile
                                        </button>
                                    )}
                                </div>

                                {isLoading && (
                                    <div className="text-center" style={{ padding: '40px' }}>
                                        <p>Loading profile...</p>
                                    </div>
                                )}

                                {error && !isLoading && (
                                    <div className="text-center" style={{ padding: '40px' }}>
                                        <p className="text-danger">{error}</p>
                                    </div>
                                )}

                                {profileData && !isLoading && (
                                    <>
                                        {isEditing ? (
                                            <form onSubmit={handleSubmit}>

                                        {/* Personal Information Section */}
                                        <div className="dashboard__content__wraper">
                                            <h5 className="mb-1" style={{ color: '#5f2ded', borderBottom: '2px solid #5f2ded', paddingBottom: '10px' }}>
                                            Personal Information
                                            </h5>
                                            <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <Input
                                                label="First Name"
                                                name="firstName"
                                                type="text"
                                                value={formData.firstName || ''}
                                                onChange={handleInputChange}
                                                error={formErrors.firstName}
                                                required
                                                wrapperClassName="dashboard"
                                                />
                                            </div>

                                            <div className="col-lg-6 col-md-6 mb-sm-auto">
                                                <Input
                                                label="Middle Name"
                                                name="middleName"
                                                type="text"
                                                value={formData.middleName || ''}
                                                onChange={handleInputChange}
                                                error={formErrors.middleName}
                                                wrapperClassName="dashboard"
                                                />
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <Input
                                                label="Last Name"
                                                name="lastName"
                                                type="text"
                                                value={formData.lastName || ''}
                                                onChange={handleInputChange}
                                                error={formErrors.lastName}
                                                required
                                                wrapperClassName="dashboard"
                                                />
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <Input
                                                label="Date of Birth"
                                                name="dateOfBirth"
                                                type="date"
                                                value={formData.dateOfBirth || ''}
                                                onChange={handleInputChange}
                                                error={formErrors.dateOfBirth}
                                                wrapperClassName="dashboard"
                                                />
                                            </div>

                                            {/* Gender Select (REPLACED) */}
                                            <div className="col-lg-6 col-md-6">
                                                <div className="dashboard">
                                                <label className="form-label" style={{fontSize:'13px',fontWeight:'bold',marginBottom:'-1px'}}>Gender</label>
                                                <select
                                                    name="gender"
                                                    value={formData.gender || ''}
                                                    onChange={handleInputChange}
                                                    wrapperClassName="dashboard"
                                                >
                                                    <option value="">Select Gender</option>
                                                    {genderOptions.map(opt => (
                                                    <option key={opt.value || opt} value={opt.value || opt}>
                                                        {opt.label || opt}
                                                    </option>
                                                    ))}
                                                </select>
                                                {formErrors.gender && <div className="text-danger mt-1">{formErrors.gender}</div>}
                                                </div>
                                            </div>

                                            {/* Category Select (REPLACED) */}
                                            <div className="col-lg-6 col-md-6">
                                                <div className="dashboard">
                                                <label className="form-label" style={{fontSize:'13px',fontWeight:'bold',marginBottom:'-1px'}}>Category</label>
                                                <select
                                                    name="category"
                                                    value={formData.category || ''}
                                                    onChange={handleInputChange}
                                                    wrapperClassName="dashboard"
                                                >
                                                    <option value="">Select Category</option>
                                                    {categoryOptions.map(opt => (
                                                    <option key={opt.value || opt} value={opt.value || opt}>
                                                        {opt.label || opt}
                                                    </option>
                                                    ))}
                                                </select>
                                                {formErrors.category && <div className="text-danger mt-1">{formErrors.category}</div>}
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <Input
                                                label="Aadhar Number"
                                                name="aadharNumber"
                                                type="text"
                                                value={formData.aadharNumber || ''}
                                                onChange={handleInputChange}
                                                error={formErrors.aadharNumber}
                                                placeholder="12-digit Aadhar number"
                                                maxLength={12}
                                                wrapperClassName="dashboard"
                                                />
                                            </div>
                                            </div>
                                        </div>

                                        {/* Contact Information Section */}
                                        <div className="dashboard__content__wraper mb-3">
                                            <h5 className="mb-3" style={{ color: '#5f2ded', borderBottom: '2px solid #5f2ded', paddingBottom: '10px' }}>
                                            Contact Information
                                            </h5>
                                            <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <Input
                                                label="Email"
                                                name="email"
                                                type="email"
                                                value={profileData.email || ''}
                                                disabled
                                                wrapperClassName="dashboard"
                                                />
                                                <small className="text-muted">Email cannot be changed</small>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <Input
                                                label="Phone Number"
                                                name="phoneNumber"
                                                type="tel"
                                                value={formData.phoneNumber || ''}
                                                onChange={handleInputChange}
                                                error={formErrors.phoneNumber}
                                                placeholder="+91 9876543210"
                                                wrapperClassName="dashboard"
                                                />
                                            </div>
                                            </div>
                                        </div>

                                        {/* Address Information Section */}
                                        <div className="dashboard__content__wraper mb-3">
                                            <h5 className="mb-3" style={{ color: '#5f2ded', borderBottom: '2px solid #5f2ded', paddingBottom: '10px' }}>
                                            Address Information
                                            </h5>
                                            <div className="row">
                                            <div className="col-lg-12">
                                                <Textarea
                                                label="Address"
                                                name="address"
                                                value={formData.address || ''}
                                                onChange={handleInputChange}
                                                error={formErrors.address}
                                                rows={3}
                                                placeholder="Enter your complete address"
                                                wrapperClassName="dashboard"
                                                />
                                            </div>

                                            <div className="col-lg-4 col-md-6">
                                                <Input
                                                label="City"
                                                name="city"
                                                type="text"
                                                value={formData.city || ''}
                                                onChange={handleInputChange}
                                                error={formErrors.city}
                                                wrapperClassName="dashboard"
                                                />
                                            </div>

                                            <div className="col-lg-4 col-md-6">
                                                <Input
                                                label="State"
                                                name="state"
                                                type="text"
                                                value={formData.state || ''}
                                                onChange={handleInputChange}
                                                error={formErrors.state}
                                                wrapperClassName="dashboard"
                                                />
                                            </div>

                                            <div className="col-lg-4 col-md-6">
                                                <Input
                                                label="Country"
                                                name="country"
                                                type="text"
                                                value={formData.country || ''}
                                                onChange={handleInputChange}
                                                error={formErrors.country}
                                                wrapperClassName="dashboard"
                                                />
                                            </div>

                                            <div className="col-lg-4 col-md-6">
                                                <Input
                                                label="Pincode"
                                                name="pincode"
                                                type="text"
                                                value={formData.pincode || ''}
                                                onChange={handleInputChange}
                                                error={formErrors.pincode}
                                                placeholder="6-digit pincode"
                                                maxLength={6}
                                                wrapperClassName="dashboard"
                                                />
                                            </div>
                                            </div>
                                        </div>

                                        {/* Academic Information Section */}
                                        <div className="dashboard__content__wraper mb-3">
                                            <h5 className="mb-3" style={{ color: '#5f2ded', borderBottom: '2px solid #5f2ded', paddingBottom: '10px' }}>
                                            Academic Information
                                            </h5>
                                            <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <Input
                                                label="Qualification"
                                                name="qualification"
                                                type="text"
                                                value={formData.qualification || ''}
                                                onChange={handleInputChange}
                                                error={formErrors.qualification}
                                                placeholder="e.g., 10th, 12th, Graduation"
                                                wrapperClassName="dashboard"
                                                />
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <Input
                                                label="Occupation"
                                                name="occupation"
                                                type="text"
                                                value={formData.occupation || ''}
                                                onChange={handleInputChange}
                                                error={formErrors.occupation}
                                                placeholder="Your current occupation"
                                                wrapperClassName="dashboard"
                                                />
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <Input
                                                label="Batch Timing"
                                                name="batchTiming"
                                                type="text"
                                                value={formData.batchTiming || ''}
                                                onChange={handleInputChange}
                                                error={formErrors.batchTiming}
                                                placeholder="e.g., Morning 9:00 AM - 12:00 PM"
                                                wrapperClassName="dashboard"
                                                />
                                            </div>
                                            </div>
                                        </div>

                                        {/* Guardian Information Section */}
                                        <div className="dashboard__content__wraper mb-3">
                                            <h5 className="mb-3" style={{ color: '#5f2ded', borderBottom: '2px solid #5f2ded', paddingBottom: '10px' }}>
                                            Guardian Information
                                            </h5>
                                            <div className="row">

                                            {/* Guardian Type (REPLACED) */}
                                            <div className="col-lg-6 col-md-6">
                                                <div className="dashboard mb-3">
                                                <label className="form-label" style={{fontSize:'13px',fontWeight:'bold',marginBottom:'-1px'}}>Guardian Type</label>
                                                <select
                                                    name="guardianType"
                                                    value={formData.guardianType || ''}
                                                    onChange={handleInputChange}
                                                    wrapperClassName="dashboard"
                                                >
                                                    <option value="">Select Guardian Type</option>
                                                    {guardianTypeOptions.map(opt => (
                                                    <option key={opt.value || opt} value={opt.value || opt}>
                                                        {opt.label || opt}
                                                    </option>
                                                    ))}
                                                </select>
                                                {formErrors.guardianType && <div className="text-danger mt-1">{formErrors.guardianType}</div>}
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <Input
                                                label="Guardian Name"
                                                name="guardianName"
                                                type="text"
                                                value={formData.guardianName || ''}
                                                onChange={handleInputChange}
                                                error={formErrors.guardianName}
                                                wrapperClassName="dashboard"
                                                />
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <Input
                                                label="Father's Name"
                                                name="fatherName"
                                                type="text"
                                                value={formData.fatherName || ''}
                                                onChange={handleInputChange}
                                                error={formErrors.fatherName}
                                                wrapperClassName="dashboard"
                                                />
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <Input
                                                label="Father's Mobile"
                                                name="fatherMobile"
                                                type="tel"
                                                value={formData.fatherMobile || ''}
                                                onChange={handleInputChange}
                                                error={formErrors.fatherMobile}
                                                placeholder="+91 9876543210"
                                                wrapperClassName="dashboard"
                                                />
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <Input
                                                label="Husband's Name"
                                                name="husbandName"
                                                type="text"
                                                value={formData.husbandName || ''}
                                                onChange={handleInputChange}
                                                error={formErrors.husbandName}
                                                wrapperClassName="dashboard"
                                                />
                                            </div>
                                            </div>
                                        </div>

                                        {/* Registration Section */}
                                        <div className="dashboard__content__wraper mb-3">
                                            <h5 className="mb-3" style={{ color: '#5f2ded', borderBottom: '2px solid #5f2ded', paddingBottom: '10px' }}>
                                            Registration Information
                                            </h5>
                                            <div className="row">
                                            {profileData.registrationNumber && (
                                                <>
                                                <div className="col-lg-4 col-md-4">
                                                    <div className="dashboard__form">Registration Number</div>
                                                </div>
                                                <div className="col-lg-8 col-md-8">
                                                    <div className="dashboard__form">{profileData.registrationNumber}</div>
                                                </div>
                                                </>
                                            )}

                                            {profileData.enrollmentDate && (
                                                <>
                                                <div className="col-lg-4 col-md-4">
                                                    <div className="dashboard__form dashboard__form__margin">Enrollment Date</div>
                                                </div>
                                                <div className="col-lg-8 col-md-8">
                                                    <div className="dashboard__form dashboard__form__margin">
                                                    {formatDate(profileData.enrollmentDate)}
                                                    </div>
                                                </div>
                                                </>
                                            )}

                                            {profileData.branchName && (
                                                <>
                                                <div className="col-lg-4 col-md-4">
                                                    <div className="dashboard__form dashboard__form__margin">Branch</div>
                                                </div>
                                                <div className="col-lg-8 col-md-8">
                                                    <div className="dashboard__form dashboard__form__margin">
                                                    {profileData.branchName}
                                                    </div>
                                                </div>
                                                </>
                                            )}
                                            </div>
                                        </div>

                                       {/* Actions */}
                                        <div className="col-lg-12">
                                        <div className="d-flex gap-2 mt-3 justify-content-end">
                                            <button type="submit" className="default__button" disabled={isSaving}>
                                            {isSaving ? 'Saving...' : 'Save Changes'}
                                            </button>

                                            <button
                                            type="button"
                                            className="default__button"
                                            onClick={handleCancel}
                                            disabled={isSaving}
                                            style={{ backgroundColor: '#6c757d', borderColor: '#6c757d' }}
                                            >
                                            Cancel
                                            </button>
                                        </div>
                                        </div>


                                        </form>

                                        ) : (
                                            <>
                                                {/* Personal Information Section */}
                                                <div className="dashboard__content__wraper mb-3">
                                                    <h5 className="mb-3" style={{ color: '#5f2ded', borderBottom: '2px solid #5f2ded', paddingBottom: '10px' }}>
                                                        Personal Information
                                                    </h5>
                                                    <div className="row">
                                                        {profileData.fullName && (
                                                            <>
                                                        <div className="col-lg-4 col-md-4">
                                                        <div className="dashboard__form">Full Name</div>
                                                        </div>
                                                        <div className="col-lg-8 col-md-8">
                                                            <div className="dashboard__form">
                                                                {profileData.fullName}
                                                            </div>
                                                        </div>
                                                            </>
                                                        )}
                                                        {profileData.firstName && (
                                                            <>
                                                        <div className="col-lg-4 col-md-4">
                                                            <div className="dashboard__form dashboard__form__margin">First Name</div>
                                                        </div>
                                                        <div className="col-lg-8 col-md-8">
                                                            <div className="dashboard__form dashboard__form__margin">
                                                                        {profileData.firstName}
                                                            </div>
                                                        </div>
                                                            </>
                                                        )}
                                                        {profileData.middleName && (
                                                            <>
                                                                <div className="col-lg-4 col-md-4">
                                                                    <div className="dashboard__form dashboard__form__margin">Middle Name</div>
                                                                </div>
                                                                <div className="col-lg-8 col-md-8">
                                                                    <div className="dashboard__form dashboard__form__margin">
                                                                        {profileData.middleName}
                                                                    </div>
                                </div>
                                                            </>
                                                        )}
                                                        {profileData.lastName && (
                                                            <>
                                <div className="col-lg-4 col-md-4">
                                    <div className="dashboard__form dashboard__form__margin">Last Name</div>
                                </div>
                                <div className="col-lg-8 col-md-8">
                                                                    <div className="dashboard__form dashboard__form__margin">
                                                                        {profileData.lastName}
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                        {profileData.dateOfBirth && (
                                                            <>
                                                                <div className="col-lg-4 col-md-4">
                                                                    <div className="dashboard__form dashboard__form__margin">Date of Birth</div>
                                                                </div>
                                                                <div className="col-lg-8 col-md-8">
                                                                    <div className="dashboard__form dashboard__form__margin">
                                                                        {formatDateOnly(profileData.dateOfBirth)}
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                        {profileData.gender && (
                                                            <>
                                                                <div className="col-lg-4 col-md-4">
                                                                    <div className="dashboard__form dashboard__form__margin">Gender</div>
                                                                </div>
                                                                <div className="col-lg-8 col-md-8">
                                                                    <div className="dashboard__form dashboard__form__margin">
                                                                        {profileData.gender}
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                        {profileData.category && (
                                                            <>
                                                                <div className="col-lg-4 col-md-4">
                                                                    <div className="dashboard__form dashboard__form__margin">Category</div>
                                                                </div>
                                                                <div className="col-lg-8 col-md-8">
                                                                    <div className="dashboard__form dashboard__form__margin">
                                                                        {profileData.category}
                                                                    </div>
                                </div>
                                                            </>
                                                        )}
                                                        {profileData.aadharNumber && (
                                                            <>
                                <div className="col-lg-4 col-md-4">
                                                                    <div className="dashboard__form dashboard__form__margin">Aadhar Number</div>
                                </div>
                                <div className="col-lg-8 col-md-8">
                                                                    <div className="dashboard__form dashboard__form__margin">
                                                                        {profileData.aadharNumber}
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Contact Information Section */}
                                                <div className="dashboard__content__wraper mb-3">
                                                    <h5 className="mb-3" style={{ color: '#5f2ded', borderBottom: '2px solid #5f2ded', paddingBottom: '10px' }}>
                                                        Contact Information
                                                    </h5>
                                                    <div className="row">
                                                        {profileData.email && (
                                                            <>
                                <div className="col-lg-4 col-md-4">
                                                                    <div className="dashboard__form">Email</div>
                                </div>
                                <div className="col-lg-8 col-md-8">
                                                                    <div className="dashboard__form">
                                                                        {profileData.email}
                                                                    </div>
                                </div>
                                                            </>
                                                        )}
                                                        {profileData.phoneNumber && (
                                                            <>
                                <div className="col-lg-4 col-md-4">
                                    <div className="dashboard__form dashboard__form__margin">Phone Number</div>
                                </div>
                                <div className="col-lg-8 col-md-8">
                                                                    <div className="dashboard__form dashboard__form__margin">
                                                                        {profileData.phoneNumber}
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Address Information Section */}
                                                {(profileData.address || profileData.city || profileData.state || profileData.country || profileData.pincode) && (
                                                    <div className="dashboard__content__wraper mb-3">
                                                        <h5 className="mb-3" style={{ color: '#5f2ded', borderBottom: '2px solid #5f2ded', paddingBottom: '10px' }}>
                                                            Address Information
                                                        </h5>
                                                        <div className="row">
                                                            {profileData.address && (
                                                                <>
                                                                    <div className="col-lg-4 col-md-4">
                                                                        <div className="dashboard__form">Address</div>
                                                                    </div>
                                                                    <div className="col-lg-8 col-md-8">
                                                                        <div className="dashboard__form">
                                                                            {profileData.address}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                            {profileData.city && (
                                                                <>
                                                                    <div className="col-lg-4 col-md-4">
                                                                        <div className="dashboard__form dashboard__form__margin">City</div>
                                                                    </div>
                                                                    <div className="col-lg-8 col-md-8">
                                                                        <div className="dashboard__form dashboard__form__margin">
                                                                            {profileData.city}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                            {profileData.state && (
                                                                <>
                                                                    <div className="col-lg-4 col-md-4">
                                                                        <div className="dashboard__form dashboard__form__margin">State</div>
                                                                    </div>
                                                                    <div className="col-lg-8 col-md-8">
                                                                        <div className="dashboard__form dashboard__form__margin">
                                                                            {profileData.state}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                            {profileData.country && (
                                                                <>
                                                                    <div className="col-lg-4 col-md-4">
                                                                        <div className="dashboard__form dashboard__form__margin">Country</div>
                                                                    </div>
                                                                    <div className="col-lg-8 col-md-8">
                                                                        <div className="dashboard__form dashboard__form__margin">
                                                                            {profileData.country}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                            {profileData.pincode && (
                                                                <>
                                                                    <div className="col-lg-4 col-md-4">
                                                                        <div className="dashboard__form dashboard__form__margin">Pincode</div>
                                                                    </div>
                                                                    <div className="col-lg-8 col-md-8">
                                                                        <div className="dashboard__form dashboard__form__margin">
                                                                            {profileData.pincode}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Academic Information Section */}
                                                {(profileData.qualification || profileData.occupation || profileData.batchTiming) && (
                                                    <div className="dashboard__content__wraper mb-3">
                                                        <h5 className="mb-3" style={{ color: '#5f2ded', borderBottom: '2px solid #5f2ded', paddingBottom: '10px' }}>
                                                            Academic Information
                                                        </h5>
                                                        <div className="row">
                                                            {profileData.qualification && (
                                                                <>
                                                                    <div className="col-lg-4 col-md-4">
                                                                        <div className="dashboard__form">Qualification</div>
                                                                    </div>
                                                                    <div className="col-lg-8 col-md-8">
                                                                        <div className="dashboard__form">
                                                                            {profileData.qualification}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                            {profileData.occupation && (
                                                                <>
                                                                    <div className="col-lg-4 col-md-4">
                                                                        <div className="dashboard__form dashboard__form__margin">Occupation</div>
                                                                    </div>
                                                                    <div className="col-lg-8 col-md-8">
                                                                        <div className="dashboard__form dashboard__form__margin">
                                                                            {profileData.occupation}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                            {profileData.batchTiming && (
                                                                <>
                                                                    <div className="col-lg-4 col-md-4">
                                                                        <div className="dashboard__form dashboard__form__margin">Batch Timing</div>
                                                                    </div>
                                                                    <div className="col-lg-8 col-md-8">
                                                                        <div className="dashboard__form dashboard__form__margin">
                                                                            {profileData.batchTiming}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Guardian Information Section */}
                                                {(profileData.guardianType || profileData.guardianName || profileData.fatherName || profileData.fatherMobile || profileData.husbandName) && (
                                                    <div className="dashboard__content__wraper mb-3">
                                                        <h5 className="mb-3" style={{ color: '#5f2ded', borderBottom: '2px solid #5f2ded', paddingBottom: '10px' }}>
                                                            Guardian Information
                                                        </h5>
                                                        <div className="row">
                                                            {profileData.guardianType && (
                                                                <>
                                                                    <div className="col-lg-4 col-md-4">
                                                                        <div className="dashboard__form">Guardian Type</div>
                                                                    </div>
                                                                    <div className="col-lg-8 col-md-8">
                                                                        <div className="dashboard__form">
                                                                            {profileData.guardianType}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                            {profileData.guardianName && (
                                                                <>
                                                                    <div className="col-lg-4 col-md-4">
                                                                        <div className="dashboard__form dashboard__form__margin">Guardian Name</div>
                                                                    </div>
                                                                    <div className="col-lg-8 col-md-8">
                                                                        <div className="dashboard__form dashboard__form__margin">
                                                                            {profileData.guardianName}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                            {profileData.fatherName && (
                                                                <>
                                                                    <div className="col-lg-4 col-md-4">
                                                                        <div className="dashboard__form dashboard__form__margin">Father's Name</div>
                                                                    </div>
                                                                    <div className="col-lg-8 col-md-8">
                                                                        <div className="dashboard__form dashboard__form__margin">
                                                                            {profileData.fatherName}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                            {profileData.fatherMobile && (
                                                                <>
                                                                    <div className="col-lg-4 col-md-4">
                                                                        <div className="dashboard__form dashboard__form__margin">Father's Mobile</div>
                                                                    </div>
                                                                    <div className="col-lg-8 col-md-8">
                                                                        <div className="dashboard__form dashboard__form__margin">
                                                                            {profileData.fatherMobile}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                            {profileData.husbandName && (
                                                                <>
                                                                    <div className="col-lg-4 col-md-4">
                                                                        <div className="dashboard__form dashboard__form__margin">Husband's Name</div>
                                                                    </div>
                                                                    <div className="col-lg-8 col-md-8">
                                                                        <div className="dashboard__form dashboard__form__margin">
                                                                            {profileData.husbandName}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Registration Information Section */}
                                                <div className="dashboard__content__wraper mb-3">
                                                    <h5 className="mb-3" style={{ color: '#5f2ded', borderBottom: '2px solid #5f2ded', paddingBottom: '10px' }}>
                                                        Registration Information
                                                    </h5>
                                                    <div className="row">
                                                        {profileData.registrationNumber && (
                                                            <>
                                                                <div className="col-lg-4 col-md-4">
                                                                    <div className="dashboard__form">Registration Number</div>
                                                                </div>
                                                                <div className="col-lg-8 col-md-8">
                                                                    <div className="dashboard__form">
                                                                        {profileData.registrationNumber}
                                                                    </div>
                                </div>
                                                            </>
                                                        )}
                                                        {profileData.enrollmentDate && (
                                                            <>
                                <div className="col-lg-4 col-md-4">
                                                                    <div className="dashboard__form dashboard__form__margin">Enrollment Date</div>
                                </div>
                                <div className="col-lg-8 col-md-8">
                                                                    <div className="dashboard__form dashboard__form__margin">
                                                                        {formatDate(profileData.enrollmentDate)}
                                                                    </div>
                                </div>
                                                            </>
                                                        )}
                                                        {profileData.branchName && (
                                                            <>
                                <div className="col-lg-4 col-md-4">
                                                                    <div className="dashboard__form dashboard__form__margin">Branch</div>
                                </div>
                                <div className="col-lg-8 col-md-8">
                                    <div className="dashboard__form dashboard__form__margin">
                                                                        {profileData.branchName}
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                                    </div>
                                </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Profile;
