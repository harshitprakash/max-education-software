import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ProfileHeader from "./ProfileHeader";
import { studentService } from "../../services/application/studentService";
import { toast } from "react-toastify";

const FeeSection = () => {
  const [key, setKey] = useState("all");
  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState({
    totalPaid: 0,
    totalPayments: 0,
    lastPaymentDate: null,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Format date to display format
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Format amount to currency
  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Fetch payment data
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await studentService.getPayments({
          page: currentPage,
          pageSize: 10,
        });

        // Map API response to component format
        const mappedPayments = data.payments.map((payment) => ({
          id: `#${payment.receiptNumber || `PAY${payment.id}`}`,
          date: formatDate(payment.paymentDate),
          course: payment.courseName,
          amount: formatAmount(payment.amount),
          status: "Paid", // All payments in history are completed
          statusClass: "text-success",
          paymentMode: payment.paymentMode,
          paymentType: payment.paymentType,
          receiptNumber: payment.receiptNumber,
          notes: payment.notes,
          rawAmount: payment.amount,
        }));

        setPayments(mappedPayments);
        setSummary(data.summary || {});
        setPagination(data.pagination || {});
      } catch (err) {
        setError(err.message || "Failed to load payment history");
        toast.error(err.message || "Failed to load payment history");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, [currentPage]);

  // Filter payments based on selected tab
  const filtered =
    key === "all"
      ? payments
      : key === "paid"
      ? payments.filter((t) => t.status === "Paid")
      : key === "pending"
      ? payments.filter((t) => t.status === "Pending")
      : key === "refunded"
      ? payments.filter((t) => t.status === "Refunded")
      : [];

  return (
    <>
    <ProfileHeader/>
      <div className="dashboard">
        <div className="container-fluid full__width__padding">
          <div className="row">
            {/* Sidebar - you already have it in layout */}
            <Sidebar />

            <div className="col-xl-9 col-lg-9 col-md-12">
              <div className="dashboard__content__wraper">
                <div className="dashboard__section__title">
                  <h4>Fee & Payments</h4>
                </div>

                {/* Tabs - Same Tabs Style - */}
                <ul className="nav about__button__wrap dashboard__button__wrap" id="feeTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className={`single__tab__link ${key === "all" ? "active" : ""}`}
                      onClick={() => setKey("all")}
                      type="button"
                    >
                      All Transactions
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`single__tab__link ${key === "paid" ? "active" : ""}`}
                      onClick={() => setKey("paid")}
                      type="button"
                    >
                      Paid
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`single__tab__link ${key === "pending" ? "active" : ""}`}
                      onClick={() => setKey("pending")}
                      type="button"
                    >
                      Pending
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`single__tab__link ${key === "refunded" ? "active" : ""}`}
                      onClick={() => setKey("refunded")}
                      type="button"
                    >
                      Refunded
                    </button>
                  </li>
                </ul>

                <div className="tab-content tab__content__wrapper">

                  {/* Table - Same padding & style */}
                  <div className="tab-pane fade show active">
                    <div className="row">
                      <div className="col-12">
                        <div className="table-responsive">
                          <table className="table table-borderless align-middle">
                            <thead className="bg-light">
                              <tr>
                                <th>Transaction ID</th>
                                <th>Date</th>
                                <th>Course Name</th>
                                <th>Amount</th>
                                <th>Payment Mode</th>
                                <th>Payment Type</th>
                                <th>Status</th>
                                <th>Invoice</th>
                              </tr>
                            </thead>
                            <tbody>
                              {isLoading ? (
                                <tr>
                                  <td colSpan="8" className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                      <span className="visually-hidden">Loading...</span>
                                    </div>
                                  </td>
                                </tr>
                              ) : error ? (
                                <tr>
                                  <td colSpan="8" className="text-center py-5 text-danger">
                                    {error}
                                  </td>
                                </tr>
                              ) : (
                                filtered.map((item) => (
                                  <tr key={item.id} className="border-bottom">
                                    <td className="fw-bold">{item.id}</td>
                                    <td className="text-muted">{item.date}</td>
                                    <td>
                                      <span className="text-dark text-decoration-none">
                                        {item.course}
                                      </span>
                                    </td>
                                    <td className="fw-bold text-primary">{item.amount}</td>
                                    <td>
                                      <span className="badge bg-info text-dark">
                                        {item.paymentMode || "N/A"}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="badge bg-secondary">
                                        {item.paymentType || "N/A"}
                                      </span>
                                    </td>
                                    <td>
                                      <span className={`fw-bold ${item.statusClass}`}>
                                        {item.status}
                                      </span>
                                    </td>
                                    <td>
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() => {
                                          // TODO: Implement receipt download
                                          toast.info("Receipt download feature coming soon");
                                        }}
                                      >
                                        <i className="icofont-download me-1"></i> Download
                                      </button>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>

                          {filtered.length === 0 && (
                            <div className="text-center py-5 text-muted">
                              <i className="icofont-file-document fs-1"></i>
                              <p className="mt-3">No transactions found</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="mt-5 p-4 bg-light rounded">
                      <div className="row text-center text-md-start">
                        <div className="col-md-3 col-6 mb-3">
                          <h6>Total Paid</h6>
                          <h4 className="text-primary mb-0">
                            {formatAmount(summary.totalPaid || 0)}
                          </h4>
                        </div>
                        <div className="col-md-3 col-6 mb-3">
                          <h6>Total Payments</h6>
                          <h4 className="mb-0">{summary.totalPayments || 0}</h4>
                        </div>
                        <div className="col-md-3 col-6 mb-3">
                          <h6>Last Payment</h6>
                          <h4 className="text-success mb-0">
                            {summary.lastPaymentDate
                              ? formatDate(summary.lastPaymentDate)
                              : "N/A"}
                          </h4>
                        </div>
                        <div className="col-md-3 col-6">
                          <h6>Payment Info</h6>
                          <div className="mb-0">
                            {payments.length > 0 ? (
                              <>
                                <span className="badge bg-info text-dark me-1">
                                  {payments[0].paymentMode || "N/A"}
                                </span>
                                <span className="badge bg-secondary">
                                  {payments[0].paymentType || "N/A"}
                                </span>
                              </>
                            ) : (
                              "N/A"
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                      <div className="mt-4 d-flex justify-content-center align-items-center gap-2">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                          disabled={!pagination.hasPreviousPage || isLoading}
                        >
                          <i className="icofont-arrow-left"></i> Previous
                        </button>
                        <span className="mx-3">
                          Page {pagination.page} of {pagination.totalPages} (
                          {pagination.totalCount} total)
                        </span>
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(pagination.totalPages, prev + 1)
                            )
                          }
                          disabled={!pagination.hasNextPage || isLoading}
                        >
                          Next <i className="icofont-arrow-right"></i>
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeeSection;