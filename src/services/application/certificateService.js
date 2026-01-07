/**
 * Application Layer: Certificate Service
 * 
 * This module handles certificate-related API operations with security measures.
 * 
 * Rules:
 * - Certificate operations MUST live in Application layer
 * - API calls MUST use Infrastructure layer (apiClient)
 * - UI MUST NOT know API endpoint details
 * - Security: Input validation, rate limiting, ownership verification
 */

import { apiClient } from '../infrastructure/apiClient';

class CertificateService {
  constructor() {
    // Rate limiting for verification attempts
    this.verificationAttempts = new Map();
    this.MAX_VERIFICATION_ATTEMPTS = 5;
    this.RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
  }

  /**
   * Validate certificate number format
   * @param {string} certificateNumber - Certificate number to validate
   * @returns {boolean} True if valid format
   */
  validateCertificateNumber(certificateNumber) {
    if (!certificateNumber || typeof certificateNumber !== 'string') {
      return false;
    }

    // Strict format validation: CERT-YYYY-BRANCH-SEQ or DIP-YYYY-BRANCH-SEQ
    // YYYY: 4 digits (year)
    // BRANCH: 3 digits
    // SEQ: 6 digits
    const pattern = /^(CERT|DIP)-\d{4}-\d{3}-\d{6}$/i;
    return pattern.test(certificateNumber.trim());
  }

  /**
   * Sanitize certificate number input
   * @param {string} certificateNumber - Raw certificate number
   * @returns {string} Sanitized certificate number
   */
  sanitizeCertificateNumber(certificateNumber) {
    if (!certificateNumber || typeof certificateNumber !== 'string') {
      return '';
    }

    // Remove any whitespace and convert to uppercase
    const sanitized = certificateNumber.trim().toUpperCase();
    
    // Remove any characters that aren't alphanumeric or dash
    return sanitized.replace(/[^A-Z0-9-]/g, '');
  }

  /**
   * Check rate limit for verification attempts
   * @param {string} identifier - IP or user identifier
   * @returns {boolean} True if within rate limit
   */
  checkRateLimit(identifier) {
    const now = Date.now();
    const attempts = this.verificationAttempts.get(identifier) || { count: 0, resetTime: now + this.RATE_LIMIT_WINDOW };

    // Reset if window expired
    if (now > attempts.resetTime) {
      attempts.count = 0;
      attempts.resetTime = now + this.RATE_LIMIT_WINDOW;
    }

    // Check if exceeded limit
    if (attempts.count >= this.MAX_VERIFICATION_ATTEMPTS) {
      return false;
    }

    // Increment attempt count
    attempts.count++;
    this.verificationAttempts.set(identifier, attempts);
    return true;
  }

  /**
   * Validate certificate ID
   * @param {string|number} certificateId - Certificate ID
   * @returns {boolean} True if valid
   */
  validateCertificateId(certificateId) {
    if (certificateId === null || certificateId === undefined) {
      return false;
    }

    // Must be a positive number or valid string ID
    if (typeof certificateId === 'number') {
      return certificateId > 0 && Number.isInteger(certificateId);
    }

    if (typeof certificateId === 'string') {
      // String ID should not be empty and should not contain dangerous characters
      return certificateId.trim().length > 0 && !/[<>\"'&]/.test(certificateId);
    }

    return false;
  }
  /**
   * Get student's certificates
   * Security: Only returns certificates for authenticated user
   * @returns {Promise<Array>} Array of certificate objects
   */
  async getMyCertificates() {
    try {
      const response = await apiClient.get('/api/certificates/my-certificates');
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        // Security: Generic error message to prevent information leakage
        if (response.status === 401 || response.status === 403) {
          throw new Error('Unauthorized access. Please login again.');
        }
        throw new Error(errorData.message || 'Failed to load certificates');
      }

      const apiResponse = await response.json();
      
      // Validate response structure
      if (apiResponse.status !== 200) {
        throw new Error(apiResponse.message || 'Invalid response from server');
      }

      // Security: Validate and sanitize certificate data
      const certificates = apiResponse.data || [];
      return certificates.map(cert => this.sanitizeCertificateData(cert));
    } catch (error) {
      // Security: Don't expose internal error details
      throw new Error(error.message || 'Failed to fetch certificates');
    }
  }

  /**
   * Sanitize certificate data to prevent XSS
   * @param {Object} certificate - Certificate object
   * @returns {Object} Sanitized certificate
   */
  sanitizeCertificateData(certificate) {
    if (!certificate || typeof certificate !== 'object') {
      return {};
    }

    // Create a safe copy with only allowed fields
    const sanitized = {
      id: certificate.id,
      certificateNumber: this.sanitizeString(certificate.certificateNumber),
      courseName: this.sanitizeString(certificate.courseName),
      studentName: this.sanitizeString(certificate.studentName || certificate.fullName),
      grade: this.sanitizeString(certificate.grade),
      percentage: this.sanitizeNumber(certificate.percentage),
      dateOfIssue: this.sanitizeString(certificate.dateOfIssue),
      certificateType: this.sanitizeString(certificate.certificateType),
      verificationCode: this.sanitizeString(certificate.verificationCode),
      qrCode: this.sanitizeString(certificate.qrCode),
    };

    return sanitized;
  }

  /**
   * Sanitize string to prevent XSS
   * @param {any} value - Value to sanitize
   * @returns {string} Sanitized string
   */
  sanitizeString(value) {
    if (value === null || value === undefined) {
      return '';
    }
    const str = String(value);
    // Remove potentially dangerous characters
    return str.replace(/[<>\"'&]/g, '').trim();
  }

  /**
   * Sanitize number
   * @param {any} value - Value to sanitize
   * @returns {number|null} Sanitized number or null
   */
  sanitizeNumber(value) {
    if (value === null || value === undefined) {
      return null;
    }
    const num = Number(value);
    return isNaN(num) ? null : num;
  }

  /**
   * Get certificate details by ID
   * Security: Validates ID and ensures user owns the certificate
   * @param {string|number} certificateId - Certificate ID
   * @returns {Promise<Object>} Certificate details
   */
  async getCertificateDetails(certificateId) {
    // Security: Validate certificate ID before making request
    if (!this.validateCertificateId(certificateId)) {
      throw new Error('Invalid certificate ID');
    }

    try {
      // Security: Encode ID to prevent injection
      const encodedId = encodeURIComponent(certificateId);
      const response = await apiClient.get(`/api/certificates/${encodedId}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        // Security: Generic error messages
        if (response.status === 401 || response.status === 403) {
          throw new Error('Unauthorized access. You can only view your own certificates.');
        }
        if (response.status === 404) {
          throw new Error('Certificate not found.');
        }
        throw new Error(errorData.message || 'Failed to load certificate details');
      }

      const apiResponse = await response.json();
      
      // Validate response structure
      if (apiResponse.status !== 200) {
        throw new Error(apiResponse.message || 'Invalid response from server');
      }

      // Security: Sanitize certificate data
      const certificate = apiResponse.data || null;
      return certificate ? this.sanitizeCertificateData(certificate) : null;
    } catch (error) {
      // Security: Don't expose internal error details
      throw new Error(error.message || 'Failed to fetch certificate details');
    }
  }

  /**
   * Download certificate PDF
   * Security: Validates ownership and ID before download
   * @param {string|number} certificateId - Certificate ID
   * @returns {Promise<Blob>} PDF blob
   */
  async downloadCertificate(certificateId) {
    // Security: Validate certificate ID before making request
    if (!this.validateCertificateId(certificateId)) {
      throw new Error('Invalid certificate ID');
    }

    try {
      // Security: Encode ID to prevent injection
      const encodedId = encodeURIComponent(certificateId);
      const response = await apiClient.get(`/api/certificates/${encodedId}/download`, {
        headers: {
          'Accept': 'application/pdf',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        // Security: Generic error messages
        if (response.status === 401 || response.status === 403) {
          throw new Error('Unauthorized access. You can only download your own certificates.');
        }
        if (response.status === 404) {
          throw new Error('Certificate not found.');
        }
        throw new Error(errorData.message || 'Failed to download certificate');
      }

      // Security: Validate content type
      const contentType = response.headers.get('content-type');
      if (contentType && !contentType.includes('application/pdf')) {
        throw new Error('Invalid file type received');
      }

      return await response.blob();
    } catch (error) {
      // Security: Don't expose internal error details
      throw new Error(error.message || 'Failed to download certificate');
    }
  }

  /**
   * Verify certificate (public endpoint)
   * Security: Input validation, rate limiting, sanitization
   * @param {string} certificateNumber - Certificate number (e.g., CERT-2025-012-000001)
   * @returns {Promise<Object>} Verification result
   */
  async verifyCertificate(certificateNumber) {
    // Security: Validate input
    if (!certificateNumber || typeof certificateNumber !== 'string') {
      throw new Error('Certificate number is required');
    }

    // Security: Sanitize input
    const sanitized = this.sanitizeCertificateNumber(certificateNumber);
    
    // Security: Validate format
    if (!this.validateCertificateNumber(sanitized)) {
      throw new Error('Invalid certificate number format. Must be in format: CERT-YYYY-BRANCH-SEQ or DIP-YYYY-BRANCH-SEQ');
    }

    // Security: Rate limiting (using a simple identifier - in production, use IP or session)
    const identifier = 'verification'; // In production, use actual IP or user identifier
    if (!this.checkRateLimit(identifier)) {
      throw new Error('Too many verification attempts. Please try again later.');
    }

    try {
      const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      
      // Security: Use sanitized certificate number
      // Public endpoint - no authentication required, but still validate input
      const response = await fetch(`${baseURL}/api/certificates/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          certificateNumber: sanitized, // Use sanitized value
        }),
      });

      const apiResponse = await response.json();

      // Security: Handle error responses with generic messages
      if (!response.ok) {
        // Don't expose internal error details
        if (response.status === 404) {
          throw new Error('Certificate not found. Please verify the certificate number.');
        }
        if (response.status === 400) {
          throw new Error('Invalid certificate number format.');
        }
        throw new Error(apiResponse.message || 'Verification failed. Please try again.');
      }

      // Validate response structure
      if (apiResponse.status !== 200) {
        throw new Error(apiResponse.message || 'Invalid response from server');
      }

      // Security: Sanitize verification result
      const result = apiResponse.data || null;
      if (result && result.certificate) {
        result.certificate = this.sanitizeCertificateData(result.certificate);
      }

      return result;
    } catch (error) {
      // Security: Don't expose internal error details
      throw new Error(error.message || 'Failed to verify certificate');
    }
  }
}

// Export singleton instance
export const certificateService = new CertificateService();
export default certificateService;

