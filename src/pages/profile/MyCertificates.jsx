import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ProfileHeader from './ProfileHeader';
import CertificateCard from '../../components/certificates/CertificateCard';
import CertificateDetail from '../../components/certificates/CertificateDetail';
import { certificateService } from '../../services/application/certificateService';
import { showSuccess, showError } from '../../services/application/toastService';
import { studentStorage } from '../../services/infrastructure/studentStorage';

const MyCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await certificateService.getMyCertificates();
      setCertificates(data);
    } catch (error) {
      const errorMessage = error.message || 'Failed to load certificates';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    setShowDetailModal(true);
  };

  const handleDownloadCertificate = async (certificate) => {
    // Security: Validate certificate before download
    if (!certificate || !certificate.id) {
      showError('Invalid certificate. Cannot download.');
      return;
    }

    try {
      setIsDownloading(true);
      const blob = await certificateService.downloadCertificate(certificate.id);
      
      // Security: Validate blob
      if (!blob || blob.size === 0) {
        throw new Error('Invalid file received');
      }

      // Security: Sanitize filename
      const sanitizedNumber = (certificate.certificateNumber || certificate.id)
        .replace(/[^a-zA-Z0-9-_]/g, '')
        .substring(0, 50); // Limit filename length
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificate-${sanitizedNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Security: Revoke URL after a delay to prevent memory leaks
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 100);
      
      showSuccess('Certificate downloaded successfully!');
    } catch (error) {
      const errorMessage = error.message || 'Failed to download certificate';
      showError(errorMessage);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleVerifyCertificate = (certificate) => {
    // Navigate to verification page with certificate number
    window.open(`/#/verify-certificate?number=${encodeURIComponent(certificate.certificateNumber)}`, '_blank');
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedCertificate(null);
  };

  // Filter and search certificates
  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch = !searchTerm || 
      cert.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certificateNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || 
      cert.certificateType?.toLowerCase() === filterType.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  // Get student name for display
  const getStudentName = () => {
    const studentData = studentStorage.getStudentData();
    return studentData?.fullName || studentData?.firstName || 'Student';
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
                {/* Header Section */}
                <div className="dashboard__section__title mb-4">
                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <div>
                      <h4>My Certificates</h4>
                      <p className="text-muted mb-0" style={{ fontSize: '14px' }}>
                        View and manage all your certificates
                      </p>
                    </div>
                    <div className="text-end">
                      <div style={{ fontSize: '14px', color: '#6B7280' }}>
                        Total: <strong>{certificates.length}</strong> certificate{certificates.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-4">
                  <div className="row g-3">
                    <div className="col-md-8">
                      <div style={{ position: 'relative' }}>
                        <input
                          type="text"
                          className="dashboard__form"
                          placeholder="Search by course name or certificate number..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '12px 45px 12px 15px',
                            borderRadius: '8px',
                            border: '1px solid #e0e0e0',
                            fontSize: '14px',
                          }}
                        />
                        <i
                          className="icofont-search"
                          style={{
                            position: 'absolute',
                            right: '15px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#6B7280',
                            fontSize: '20px',
                          }}
                        ></i>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <select
                        className="dashboard__form"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px 15px',
                          borderRadius: '8px',
                          border: '1px solid #e0e0e0',
                          fontSize: '14px',
                        }}
                      >
                        <option value="all">All Types</option>
                        <option value="certificate">Certificate</option>
                        <option value="diploma">Diploma</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                  <div className="text-center" style={{ padding: '60px 20px' }}>
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3" style={{ color: '#6B7280' }}>Loading certificates...</p>
                  </div>
                )}

                {/* Error State */}
                {error && !isLoading && (
                  <div className="text-center" style={{ padding: '60px 20px' }}>
                    <div
                      style={{
                        padding: '20px',
                        backgroundColor: '#FEE2E2',
                        border: '1px solid #FCA5A5',
                        borderRadius: '12px',
                        color: '#991B1B',
                      }}
                    >
                      <i className="icofont-close-circled" style={{ fontSize: '48px', marginBottom: '16px' }}></i>
                      <p style={{ fontSize: '16px', marginBottom: '12px' }}>{error}</p>
                      <button
                        onClick={fetchCertificates}
                        className="default__button"
                        style={{ marginTop: '12px' }}
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {!isLoading && !error && filteredCertificates.length === 0 && (
                  <div className="text-center" style={{ padding: '60px 20px' }}>
                    <div
                      style={{
                        padding: '40px',
                        backgroundColor: '#F9FAFB',
                        borderRadius: '12px',
                        border: '2px dashed #E5E7EB',
                      }}
                    >
                      <i
                        className="icofont-certificate-alt"
                        style={{ fontSize: '64px', color: '#9CA3AF', marginBottom: '20px' }}
                      ></i>
                      <h5 style={{ color: '#374151', marginBottom: '12px' }}>
                        {searchTerm || filterType !== 'all' ? 'No certificates found' : 'No Certificates Yet'}
                      </h5>
                      <p style={{ color: '#6B7280', marginBottom: '20px' }}>
                        {searchTerm || filterType !== 'all'
                          ? 'Try adjusting your search or filter criteria.'
                          : "You haven't received any certificates yet. Complete courses to earn certificates!"}
                      </p>
                      {searchTerm || filterType !== 'all' ? (
                        <button
                          onClick={() => {
                            setSearchTerm('');
                            setFilterType('all');
                          }}
                          className="default__button"
                        >
                          Clear Filters
                        </button>
                      ) : (
                        <a href="/#/courses" className="default__button">
                          Browse Courses
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Certificates Grid */}
                {!isLoading && !error && filteredCertificates.length > 0 && (
                  <div className="row">
                    {filteredCertificates.map((certificate) => (
                      <div
                        key={certificate.id}
                        className="col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-4"
                      >
                        <CertificateCard
                          certificate={certificate}
                          onView={handleViewCertificate}
                          onDownload={handleDownloadCertificate}
                          onVerify={handleVerifyCertificate}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Download Loading Overlay */}
                {isDownloading && (
                  <div
                    style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 9999,
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: '#fff',
                        padding: '30px',
                        borderRadius: '12px',
                        textAlign: 'center',
                      }}
                    >
                      <div className="spinner-border text-primary mb-3" role="status">
                        <span className="visually-hidden">Downloading...</span>
                      </div>
                      <p style={{ margin: 0, color: '#374151' }}>Downloading certificate...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Detail Modal */}
      {showDetailModal && selectedCertificate && (
        <CertificateDetail
          certificate={selectedCertificate}
          onClose={handleCloseDetail}
          onDownload={handleDownloadCertificate}
          onVerify={handleVerifyCertificate}
        />
      )}
    </>
  );
};

export default MyCertificates;

