import React from 'react';

/**
 * Certificate Card Component
 * 
 * Displays a single certificate in card format with all relevant information
 * and action buttons.
 */
const CertificateCard = ({ certificate, onView, onDownload, onVerify }) => {
  // Get grade badge color
  const getGradeColor = (grade) => {
    if (!grade) return '#6B7280'; // Gray for no grade
    
    const gradeUpper = grade.toUpperCase();
    if (gradeUpper.includes('A+') || gradeUpper === 'A+') return '#10B981'; // Green
    if (gradeUpper === 'A') return '#059669'; // Green
    if (gradeUpper === 'B') return '#3B82F6'; // Blue
    if (gradeUpper === 'C') return '#F59E0B'; // Yellow
    if (gradeUpper === 'D') return '#F97316'; // Orange
    return '#6B7280'; // Gray
  };

  // Format date
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

  // Get certificate type badge
  const getCertificateType = () => {
    return certificate.certificateType || 'Certificate';
  };

  const gradeColor = getGradeColor(certificate.grade);

  return (
    <div
      className="certificate-card"
      style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        border: '1px solid #e5e7eb',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      onClick={() => onView && onView(certificate)}
    >
      {/* Certificate Type Badge */}
      <div style={{ marginBottom: '16px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '600',
            backgroundColor: '#5f2ded',
            color: '#fff',
            textTransform: 'uppercase',
          }}
        >
          {getCertificateType()}
        </span>
      </div>

      {/* Certificate Number */}
      <div style={{ marginBottom: '12px' }}>
        <div
          style={{
            fontSize: '14px',
            color: '#6B7280',
            marginBottom: '4px',
            fontWeight: '500',
          }}
        >
          Certificate Number
        </div>
        <div
          style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#1F2937',
            fontFamily: 'monospace',
            letterSpacing: '0.5px',
          }}
        >
          {certificate.certificateNumber || 'N/A'}
        </div>
      </div>

      {/* Course Name */}
      <div style={{ marginBottom: '16px', flexGrow: 1 }}>
        <div
          style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#1F2937',
            marginBottom: '8px',
            lineHeight: '1.4',
          }}
        >
          {certificate.courseName || 'Course Name'}
        </div>
      </div>

      {/* Grade and Percentage */}
      {(certificate.grade || certificate.percentage) && (
        <div style={{ marginBottom: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {certificate.grade && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: `${gradeColor}15`,
                border: `2px solid ${gradeColor}`,
              }}
            >
              <span
                style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: gradeColor,
                }}
              >
                Grade: {certificate.grade}
              </span>
            </div>
          )}
          {certificate.percentage && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: '#F3F4F6',
                border: '2px solid #E5E7EB',
              }}
            >
              <span
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#374151',
                }}
              >
                {certificate.percentage}%
              </span>
            </div>
          )}
        </div>
      )}

      {/* Date of Issue */}
      <div style={{ marginBottom: '20px' }}>
        <div
          style={{
            fontSize: '14px',
            color: '#6B7280',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <i className="icofont-calendar" style={{ fontSize: '16px' }}></i>
          <span>Issued: {formatDate(certificate.dateOfIssue)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginTop: 'auto',
          flexWrap: 'wrap',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onView && onView(certificate);
          }}
          className="default__button"
          style={{
            flex: '1',
            minWidth: '80px',
            padding: '10px 16px',
            fontSize: '14px',
            borderRadius: '8px',
          }}
        >
          <i className="icofont-eye me-2"></i>
          View
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDownload && onDownload(certificate);
          }}
          className="default__button"
          style={{
            flex: '1',
            minWidth: '80px',
            padding: '10px 16px',
            fontSize: '14px',
            borderRadius: '8px',
            backgroundColor: '#10B981',
            borderColor: '#10B981',
          }}
        >
          <i className="icofont-download me-2"></i>
          Download
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onVerify && onVerify(certificate);
          }}
          className="default__button"
          style={{
            flex: '1',
            minWidth: '80px',
            padding: '10px 16px',
            fontSize: '14px',
            borderRadius: '8px',
            backgroundColor: '#3B82F6',
            borderColor: '#3B82F6',
          }}
        >
          <i className="icofont-check-circled me-2"></i>
          Verify
        </button>
      </div>
    </div>
  );
};

export default CertificateCard;

