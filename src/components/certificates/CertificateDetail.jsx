import React, { useState, useEffect } from 'react';
import { certificateService } from '../../services/application/certificateService';
import { showError } from '../../services/application/toastService';

/**
 * Certificate Detail Modal Component
 * 
 * Displays full certificate details in a modal overlay.
 */
const CertificateDetail = ({ certificate, onClose, onDownload, onVerify }) => {
  const [certificateDetails, setCertificateDetails] = useState(certificate);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch full certificate details if only basic info is available
    if (certificate && certificate.id && !certificate.verificationCode) {
      fetchCertificateDetails();
    }
  }, [certificate]);

  const fetchCertificateDetails = async () => {
    try {
      setIsLoading(true);
      const details = await certificateService.getCertificateDetails(certificate.id);
      setCertificateDetails(details || certificate);
    } catch (error) {
      console.warn('Error fetching certificate details:', error);
      // Use provided certificate data if fetch fails
      setCertificateDetails(certificate);
    } finally {
      setIsLoading(false);
    }
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

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      // You can add a toast notification here
      alert(`${label} copied to clipboard!`);
    });
  };

  const getGradeColor = (grade) => {
    if (!grade) return '#6B7280';
    const gradeUpper = grade.toUpperCase();
    if (gradeUpper.includes('A+') || gradeUpper === 'A+') return '#10B981';
    if (gradeUpper === 'A') return '#059669';
    if (gradeUpper === 'B') return '#3B82F6';
    if (gradeUpper === 'C') return '#F59E0B';
    if (gradeUpper === 'D') return '#F97316';
    return '#6B7280';
  };

  if (!certificateDetails) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
        onClick={onClose}
      >
        {/* Modal */}
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            position: 'relative',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            style={{
              padding: '24px',
              borderBottom: '1px solid #E5E7EB',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'sticky',
              top: 0,
              backgroundColor: '#fff',
              zIndex: 1,
            }}
          >
            <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#1F2937' }}>
              Certificate Details
            </h3>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                color: '#6B7280',
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: '4px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#F3F4F6';
                e.target.style.color = '#1F2937';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#6B7280';
              }}
            >
              <i className="icofont-close"></i>
            </button>
          </div>

          {/* Content */}
          <div style={{ padding: '24px' }}>
            {isLoading ? (
              <div className="text-center" style={{ padding: '40px' }}>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3" style={{ color: '#6B7280' }}>Loading certificate details...</p>
              </div>
            ) : (
              <>
                {/* Certificate Number */}
                <div style={{ marginBottom: '24px' }}>
                  <div
                    style={{
                      fontSize: '14px',
                      color: '#6B7280',
                      marginBottom: '8px',
                      fontWeight: '500',
                    }}
                  >
                    Certificate Number
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        color: '#1F2937',
                        fontFamily: 'monospace',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {certificateDetails.certificateNumber || 'N/A'}
                    </div>
                    <button
                      onClick={() => copyToClipboard(certificateDetails.certificateNumber, 'Certificate number')}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: '1px solid #E5E7EB',
                        backgroundColor: '#F9FAFB',
                        color: '#374151',
                        fontSize: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <i className="icofont-copy"></i>
                      Copy
                    </button>
                  </div>
                </div>

                {/* Course Information */}
                <div
                  style={{
                    padding: '20px',
                    backgroundColor: '#F9FAFB',
                    borderRadius: '12px',
                    marginBottom: '24px',
                  }}
                >
                  <h4 style={{ marginBottom: '16px', color: '#1F2937', fontSize: '18px' }}>
                    Course Information
                  </h4>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Course Name</div>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937' }}>
                        {certificateDetails.courseName || 'N/A'}
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Student Name</div>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937' }}>
                        {certificateDetails.studentName || certificateDetails.fullName || 'N/A'}
                      </div>
                    </div>
                    {certificateDetails.grade && (
                      <div className="col-md-6 mb-3">
                        <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Grade</div>
                        <div
                          style={{
                            display: 'inline-block',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            backgroundColor: `${getGradeColor(certificateDetails.grade)}15`,
                            border: `2px solid ${getGradeColor(certificateDetails.grade)}`,
                            fontSize: '16px',
                            fontWeight: '700',
                            color: getGradeColor(certificateDetails.grade),
                          }}
                        >
                          {certificateDetails.grade}
                        </div>
                      </div>
                    )}
                    {certificateDetails.percentage && (
                      <div className="col-md-6 mb-3">
                        <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Percentage</div>
                        <div style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937' }}>
                          {certificateDetails.percentage}%
                        </div>
                      </div>
                    )}
                    <div className="col-md-6 mb-3">
                      <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Date of Issue</div>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937' }}>
                        {formatDate(certificateDetails.dateOfIssue)}
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Certificate Type</div>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937' }}>
                        {certificateDetails.certificateType || 'Certificate'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verification Information */}
                {certificateDetails.verificationCode && (
                  <div
                    style={{
                      padding: '20px',
                      backgroundColor: '#EFF6FF',
                      borderRadius: '12px',
                      marginBottom: '24px',
                      border: '1px solid #BFDBFE',
                    }}
                  >
                    <h4 style={{ marginBottom: '16px', color: '#1F2937', fontSize: '18px' }}>
                      Verification Information
                    </h4>
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>
                          Verification Code
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            flexWrap: 'wrap',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '16px',
                              fontWeight: '600',
                              color: '#1F2937',
                              fontFamily: 'monospace',
                              padding: '12px',
                              backgroundColor: '#fff',
                              borderRadius: '8px',
                              border: '1px solid #BFDBFE',
                              flex: '1',
                              minWidth: '200px',
                            }}
                          >
                            {certificateDetails.verificationCode}
                          </div>
                          <button
                            onClick={() => copyToClipboard(certificateDetails.verificationCode, 'Verification code')}
                            style={{
                              padding: '10px 16px',
                              borderRadius: '8px',
                              border: '1px solid #3B82F6',
                              backgroundColor: '#3B82F6',
                              color: '#fff',
                              fontSize: '14px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                            }}
                          >
                            <i className="icofont-copy"></i>
                            Copy
                          </button>
                        </div>
                      </div>
                      {certificateDetails.qrCode && (
                        <div className="col-md-12">
                          <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>QR Code</div>
                          <div
                            style={{
                              display: 'inline-block',
                              padding: '16px',
                              backgroundColor: '#fff',
                              borderRadius: '8px',
                              border: '1px solid #BFDBFE',
                            }}
                          >
                            <img
                              src={certificateDetails.qrCode}
                              alt="Certificate QR Code"
                              style={{ width: '150px', height: '150px' }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap',
                    marginTop: '24px',
                  }}
                >
                  <button
                    onClick={() => onDownload && onDownload(certificateDetails)}
                    className="default__button"
                    style={{
                      flex: '1',
                      minWidth: '150px',
                      padding: '12px 24px',
                      fontSize: '16px',
                      fontWeight: '600',
                      backgroundColor: '#10B981',
                      borderColor: '#10B981',
                    }}
                  >
                    <i className="icofont-download me-2"></i>
                    Download PDF
                  </button>
                  <button
                    onClick={() => onVerify && onVerify(certificateDetails)}
                    className="default__button"
                    style={{
                      flex: '1',
                      minWidth: '150px',
                      padding: '12px 24px',
                      fontSize: '16px',
                      fontWeight: '600',
                      backgroundColor: '#3B82F6',
                      borderColor: '#3B82F6',
                    }}
                  >
                    <i className="icofont-check-circled me-2"></i>
                    Verify Certificate
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="default__button"
                    style={{
                      flex: '1',
                      minWidth: '150px',
                      padding: '12px 24px',
                      fontSize: '16px',
                      fontWeight: '600',
                      backgroundColor: '#6B7280',
                      borderColor: '#6B7280',
                    }}
                  >
                    <i className="icofont-printer me-2"></i>
                    Print
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificateDetail;

