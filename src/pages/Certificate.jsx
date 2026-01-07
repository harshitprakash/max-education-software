import React, { useState } from "react";
import Mode from "../components/Mode";

const Certificate = () => {
  const [studentCode, setStudentCode] = useState("");
  const [error, setError] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);

  const VALID_CODE = "STU12345";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!studentCode) {
      setError("Please enter student code");
      setShowCertificate(false);
      return;
    }

    if (studentCode === VALID_CODE) {
      setError("");
      setShowCertificate(true);
    } else {
      setError("Invalid student code");
      setShowCertificate(false);
    }
  };

  return (
    <>
      <Mode />

      <div className="certificate-page py-5">
        <div className="container">

          {/* ================= Input Section ================= */}
          <div className="row justify-content-center mb-5">
            <div className="col-lg-6 text-center">
              <h3 className="mb-3">Certificate Verification</h3>
              <p className="text-muted">
                Enter your student code to view and download your certificate
              </p>

              <form onSubmit={handleSubmit} className="mt-4">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Enter Student Code"
                  value={studentCode}
                  onChange={(e) => setStudentCode(e.target.value)}
                />

                {error && <p className="text-danger">{error}</p>}

                <button className="btn btn-primary w-100">
                  Verify Certificate
                </button>
              </form>
            </div>
          </div>

          {/* ================= Certificate Section ================= */}
          {showCertificate && (
            <div className="row justify-content-center">
              <div className="col-lg-10">

                <div className="certificate-design p-5 text-center">

                  <p className="text-uppercase text-muted mb-2">
                    Certificate of Achievement
                  </p>

                  <h2 className="fw-bold mb-3">
                    Certificate of Completion
                  </h2>

                  <div className="certificate-line mx-auto mb-4"></div>

                  <p>This is proudly presented to</p>

                  <h3 className="fw-bold text-primary mb-3">
                    Dond Tond
                  </h3>

                  <p>for successfully completing the course</p>

                  <h5 className="fw-semibold mb-4">
                    Full Stack Web Development
                  </h5>

                  <div className="row mt-5">
                    <div className="col-md-4 text-start">
                      <p className="fw-semibold mb-1">Student Code</p>
                      <p>{studentCode}</p>
                    </div>

                    <div className="col-md-4">
                      <p className="fw-semibold mb-1">Date</p>
                      <p>{new Date().toLocaleDateString()}</p>
                    </div>

                    <div className="col-md-4 text-end">
                      <p className="fw-semibold mb-1">Authorized By</p>
                      <p>Academy Admin</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 d-flex justify-content-center gap-3">
                    <button className="btn btn-outline-primary">
                      View Certificate
                    </button>
                    <button className="btn btn-success">
                      Download PDF
                    </button>
                  </div>

                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Certificate;
