import React from 'react';

/**
 * Logout Confirmation Dialog Component
 * 
 * Displays a confirmation popup before allowing user to logout.
 */
const LogoutConfirmation = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

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
        }}
        onClick={onCancel}
      >
        {/* Dialog */}
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '30px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
            zIndex: 9999,
            position: 'relative',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Icon */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#fff3cd',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '15px',
              }}
            >
              <i
                className="icofont-logout"
                style={{
                  fontSize: '30px',
                  color: '#ffc107',
                }}
              ></i>
            </div>
          </div>

          {/* Title */}
          <h3
            style={{
              textAlign: 'center',
              marginBottom: '15px',
              fontSize: '20px',
              fontWeight: '600',
              color: '#333',
            }}
          >
            Confirm Logout
          </h3>

          {/* Message */}
          <p
            style={{
              textAlign: 'center',
              marginBottom: '25px',
              fontSize: '14px',
              color: '#666',
              lineHeight: '1.5',
            }}
          >
            Are you sure you want to logout? You will need to login again to access your account.
          </p>

          {/* Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={onCancel}
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                backgroundColor: '#fff',
                color: '#333',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                minWidth: '100px',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f5f5f5';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#fff';
              }}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="default__button"
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                minWidth: '100px',
                border: 'none',
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutConfirmation;

