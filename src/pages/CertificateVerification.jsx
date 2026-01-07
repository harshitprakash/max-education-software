import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { certificateService } from '../services/application/certificateService';
import { showError, showSuccess } from '../services/application/toastService';
import Mode from '../components/Mode';

/**
 * Public Certificate Verification Page
 * 
 * Allows anyone to verify certificate authenticity without login.
 */
const CertificateVerification = () => {
  const location = useLocation();
  const [certificateNumber, setCertificateNumber] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState(null);

  const handleVerify = async (number = null) => {
    const certNumber = number || certificateNumber.trim();
    
    if (!certNumber) {
      setError('Please enter a certificate number');
      return;
    }

    // Security: Use service validation instead of inline regex
    if (!certificateService.validateCertificateNumber(certNumber)) {
      setError('Invalid certificate number format. Must be in format: CERT-YYYY-BRANCH-SEQ or DIP-YYYY-BRANCH-SEQ');
      return;
    }

    try {
      setIsVerifying(true);
      setError(null);
      setVerificationResult(null);

      const result = await certificateService.verifyCertificate(certNumber);
      setVerificationResult(result);
      
      if (result.isValid) {
        showSuccess('Certificate verified successfully!');
      } else {
        showError('Certificate verification failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'Failed to verify certificate';
      setError(errorMessage);
      setVerificationResult({
        isValid: false,
        message: errorMessage,
      });
      showError(errorMessage);
    } finally {
      setIsVerifying(false);
    }
  };

  // Check if certificate number is provided in URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const numberFromUrl = searchParams.get('number');
    if (numberFromUrl) {
      setCertificateNumber(numberFromUrl);
      handleVerify(numberFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleVerify();
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      showSuccess(`${label} copied to clipboard!`);
    });
  };

  const formatDate = (dateString) => {
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

  return (
    <>
      <Mode />
      <div className="container" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-12">
            {/* Header Section */}
            <div className="text-center mb-5">
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#5f2ded',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                <i className="icofont-certificate-alt" style={{ fontSize: '40px', color: '#fff' }}></i>
              </div>
              <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#1F2937', marginBottom: '12px' }}>
                Certificate Verification
              </h1>
              <p style={{ fontSize: '18px', color: '#6B7280', maxWidth: '600px', margin: '0 auto' }}>
                Verify the authenticity of certificates issued by Max Education. Enter the certificate number below to verify.
              </p>
            </div>

            {/* Verification Form */}
            <div
              style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                marginBottom: '32px',
              }}
            >
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="certificateNumber"
                    style={{
                      display: 'block',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '12px',
                    }}
                  >
                    Certificate Number
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      id="certificateNumber"
                      type="text"
                      value={certificateNumber}
                      onChange={(e) => {
                        setCertificateNumber(e.target.value);
                        setError(null);
                        setVerificationResult(null);
                      }}
                      placeholder="Enter certificate number (e.g., CERT-2025-012-000001)"
                      className="dashboard__form"
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        borderRadius: '8px',
                        border: error ? '2px solid #EF4444' : '1px solid #E5E7EB',
                        fontSize: '16px',
                        fontFamily: 'monospace',
                        letterSpacing: '0.5px',
                      }}
                      disabled={isVerifying}
                    />
                  </div>
                  {error && !verificationResult && (
                    <p style={{ color: '#EF4444', fontSize: '14px', marginTop: '8px', marginBottom: '0' }}>
                      {error}
                    </p>
                  )}
                  <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '8px', marginBottom: '0' }}>
                    Example: CERT-2025-012-000001 or DIP-2025-012-000001
                  </p>
                </div>

                <button
                  type="submit"
                  className="default__button w-100"
                  disabled={isVerifying || !certificateNumber.trim()}
                  style={{
                    padding: '14px 24px',
                    fontSize: '16px',
                    fontWeight: '600',
                    borderRadius: '8px',
                  }}
                >
                  {isVerifying ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <i className="icofont-search me-2"></i>
                      Verify Certificate
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Verification Results */}
            {verificationResult && (
              <div
                style={{
                  backgroundColor: verificationResult.isValid ? '#D1FAE5' : '#FEE2E2',
                  border: `2px solid ${verificationResult.isValid ? '#10B981' : '#EF4444'}`,
                  borderRadius: '16px',
                  padding: '32px',
                  marginBottom: '32px',
                }}
              >
                {/* Result Header */}
                <div className="text-center mb-4">
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: verificationResult.isValid ? '#10B981' : '#EF4444',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    <i
                      className={verificationResult.isValid ? 'icofont-check-circled' : 'icofont-close-circled'}
                      style={{ fontSize: '32px', color: '#fff' }}
                    ></i>
                  </div>
                  <h2
                    style={{
                      fontSize: '28px',
                      fontWeight: '700',
                      color: verificationResult.isValid ? '#065F46' : '#991B1B',
                      marginBottom: '8px',
                    }}
                  >
                    {verificationResult.isValid
                      ? 'Certificate Verified'
                      : verificationResult.isTampered
                      ? 'Certificate Verification Failed'
                      : 'Certificate Not Found'}
                  </h2>
                  <p
                    style={{
                      fontSize: '16px',
                      color: verificationResult.isValid ? '#047857' : '#DC2626',
                      marginBottom: '0',
                    }}
                  >
                    {verificationResult.message ||
                      (verificationResult.isValid
                        ? 'This certificate is authentic and valid.'
                        : verificationResult.isTampered
                        ? 'This certificate may have been tampered with or is invalid.'
                        : 'The certificate number you entered does not exist in our system.')}
                  </p>
                </div>

                {/* Verification Status Breakdown */}
                {verificationResult.verificationStatus && (
                  <div
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      padding: '20px',
                      marginBottom: '24px',
                    }}
                  >
                    <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '16px' }}>
                      Verification Status
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {verificationResult.verificationStatus.digitalSignature !== undefined && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {verificationResult.verificationStatus.digitalSignature ? (
                            <i className="icofont-check-circled" style={{ fontSize: '20px', color: '#10B981' }}></i>
                          ) : (
                            <i className="icofont-close-circled" style={{ fontSize: '20px', color: '#EF4444' }}></i>
                          )}
                          <span style={{ fontSize: '16px', color: '#374151' }}>
                            Digital Signature:{' '}
                            <strong>{verificationResult.verificationStatus.digitalSignature ? 'Valid' : 'Invalid'}</strong>
                          </span>
                        </div>
                      )}
                      {verificationResult.verificationStatus.certificateHash !== undefined && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {verificationResult.verificationStatus.certificateHash ? (
                            <i className="icofont-check-circled" style={{ fontSize: '20px', color: '#10B981' }}></i>
                          ) : (
                            <i className="icofont-close-circled" style={{ fontSize: '20px', color: '#EF4444' }}></i>
                          )}
                          <span style={{ fontSize: '16px', color: '#374151' }}>
                            Certificate Hash:{' '}
                            <strong>{verificationResult.verificationStatus.certificateHash ? 'Valid' : 'Invalid'}</strong>
                          </span>
                        </div>
                      )}
                      {verificationResult.verificationStatus.templateIntegrity !== undefined && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {verificationResult.verificationStatus.templateIntegrity ? (
                            <i className="icofont-check-circled" style={{ fontSize: '20px', color: '#10B981' }}></i>
                          ) : (
                            <i className="icofont-close-circled" style={{ fontSize: '20px', color: '#EF4444' }}></i>
                          )}
                          <span style={{ fontSize: '16px', color: '#374151' }}>
                            Template Integrity:{' '}
                            <strong>
                              {verificationResult.verificationStatus.templateIntegrity ? 'Valid' : 'Invalid'}
                            </strong>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Certificate Details (if valid) */}
                {verificationResult.isValid && verificationResult.certificate && (
                  <div
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      padding: '24px',
                      marginTop: '24px',
                    }}
                  >
                    <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '20px' }}>
                      Certificate Details
                    </h4>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Certificate Number</div>
                        <div
                          style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#1F2937',
                            fontFamily: 'monospace',
                          }}
                        >
                          {verificationResult.certificate.certificateNumber}
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Student Name</div>
                        <div style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937' }}>
                          {verificationResult.certificate.studentName || verificationResult.certificate.fullName}
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Course</div>
                        <div style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937' }}>
                          {verificationResult.certificate.courseName}
                        </div>
                      </div>
                      {verificationResult.certificate.grade && (
                        <div className="col-md-6 mb-3">
                          <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Grade</div>
                          <div style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937' }}>
                            {verificationResult.certificate.grade}
                          </div>
                        </div>
                      )}
                      {verificationResult.certificate.percentage && (
                        <div className="col-md-6 mb-3">
                          <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Percentage</div>
                          <div style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937' }}>
                            {verificationResult.certificate.percentage}%
                          </div>
                        </div>
                      )}
                      <div className="col-md-6 mb-3">
                        <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Date of Issue</div>
                        <div style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937' }}>
                          {formatDate(verificationResult.certificate.dateOfIssue)}
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Certificate Type</div>
                        <div style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937' }}>
                          {verificationResult.certificate.certificateType || 'Certificate'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Warnings (if tampered) */}
                {verificationResult.isTampered && verificationResult.warnings && (
                  <div
                    style={{
                      backgroundColor: '#FEF3C7',
                      border: '1px solid #FCD34D',
                      borderRadius: '12px',
                      padding: '20px',
                      marginTop: '24px',
                    }}
                  >
                    <h5 style={{ fontSize: '16px', fontWeight: '600', color: '#92400E', marginBottom: '12px' }}>
                      ⚠️ Warnings
                    </h5>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: '#92400E' }}>
                      {verificationResult.warnings.map((warning, index) => (
                        <li key={index} style={{ marginBottom: '8px' }}>
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
                  {verificationResult.isValid && (
                    <button
                      onClick={() => {
                        const url = `/#/verify-certificate?number=${encodeURIComponent(certificateNumber)}`;
                        navigator.clipboard.writeText(window.location.origin + url);
                        showSuccess('Verification link copied to clipboard!');
                      }}
                      className="default__button"
                      style={{
                        padding: '12px 24px',
                        fontSize: '14px',
                        backgroundColor: '#3B82F6',
                        borderColor: '#3B82F6',
                      }}
                    >
                      <i className="icofont-link me-2"></i>
                      Copy Verification Link
                    </button>
                  )}
                  <button
                    onClick={() => window.print()}
                    className="default__button"
                    style={{
                      padding: '12px 24px',
                      fontSize: '14px',
                      backgroundColor: '#6B7280',
                      borderColor: '#6B7280',
                    }}
                  >
                    <i className="icofont-printer me-2"></i>
                    Print Report
                  </button>
                  <button
                    onClick={() => {
                      setCertificateNumber('');
                      setVerificationResult(null);
                      setError(null);
                    }}
                    className="default__button"
                    style={{
                      padding: '12px 24px',
                      fontSize: '14px',
                      backgroundColor: '#6B7280',
                      borderColor: '#6B7280',
                    }}
                  >
                    <i className="icofont-refresh me-2"></i>
                    Verify Another
                  </button>
                </div>
              </div>
            )}

            {/* Help Section */}
            <div
              style={{
                backgroundColor: '#F9FAFB',
                borderRadius: '12px',
                padding: '24px',
                border: '1px solid #E5E7EB',
              }}
            >
              <h5 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '16px' }}>
                Need Help?
              </h5>
              <div style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.6' }}>
                <p style={{ marginBottom: '12px' }}>
                  <strong>Certificate Number Format:</strong> Certificates follow the format{' '}
                  <code style={{ backgroundColor: '#E5E7EB', padding: '2px 6px', borderRadius: '4px' }}>
                    CERT-YYYY-BRANCH-SEQ
                  </code>{' '}
                  or{' '}
                  <code style={{ backgroundColor: '#E5E7EB', padding: '2px 6px', borderRadius: '4px' }}>
                    DIP-YYYY-BRANCH-SEQ
                  </code>
                </p>
                <p style={{ marginBottom: '12px' }}>
                  <strong>If verification fails:</strong> Please check that you entered the certificate number correctly.
                  If the problem persists, contact the institution administrator.
                </p>
                <p style={{ marginBottom: '0' }}>
                  <strong>Contact Support:</strong> For assistance, please contact{' '}
                  <a href="/#/contact" style={{ color: '#5f2ded', textDecoration: 'none' }}>
                    Max Education Support
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificateVerification;

