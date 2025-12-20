import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ProfileHeader from "./ProfileHeader";
const FeeSection = () => {
  const [key, setKey] = useState("all");

  const transactions = [
    { id: "#TRX1290", date: "10 Dec 2025", course: "Foundation course to understand about software", amount: "$32.00", status: "Paid", statusClass: "text-success" },
    { id: "#TRX1289", date: "08 Dec 2025", course: "Nidnies course to understand about software", amount: "$32.00", status: "Paid", statusClass: "text-success" },
    { id: "#TRX1288", date: "05 Dec 2025", course: "React Masterclass 2025", amount: "$199.00", status: "Pending", statusClass: "text-warning" },
    { id: "#TRX1287", date: "01 Dec 2025", course: "UI/UX Design Mastery", amount: "$85.00", status: "Refunded", statusClass: "text-danger" },
    { id: "#TRX1286", date: "28 Nov 2025", course: "Node.js & Express Bootcamp", amount: "$149.00", status: "Paid", statusClass: "text-success" },
  ];

  const filtered = 
    key === "all" ? transactions :
    key === "paid" ? transactions.filter(t => t.status === "Paid") :
    key === "pending" ? transactions.filter(t => t.status === "Pending") :
    key === "refunded" ? transactions.filter(t => t.status === "Refunded") : [];

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
                                <th>Status</th>
                                <th>Invoice</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filtered.map((item) => (
                                <tr key={item.id} className="border-bottom">
                                  <td className="fw-bold">{item.id}</td>
                                  <td className="text-muted">{item.date}</td>
                                  <td>
                                    <a href="#" className="text-dark text-decoration-none">
                                      {item.course}
                                    </a>
                                  </td>
                                  <td className="fw-bold text-primary">{item.amount}</td>
                                  <td>
                                    <span className={`fw-bold ${item.statusClass}`}>
                                      {item.status}
                                    </span>
                                  </td>
                                  <td>
                                    <a href="#" className="btn btn-sm btn-outline-primary">
                                      <i className="icofont-download me-1"></i> Download
                                    </a>
                                  </td>
                                </tr>
                              ))}
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

                    {/* Summary Cards - Optional but looks great */}
                    <div className="mt-5 p-4 bg-light rounded">
                      <div className="row text-center text-md-start">
                        <div className="col-md-3 col-6 mb-3">
                          <h6>Total Spent</h6>
                          <h4 className="text-primary mb-0">$412.00</h4>
                        </div>
                        <div className="col-md-3 col-6 mb-3">
                          <h6>Courses Purchased</h6>
                          <h4 className="mb-0">5</h4>
                        </div>
                        <div className="col-md-3 col-6">
                          <h6>Pending</h6>
                          <h4 className="text-warning mb-0">$199.00</h4>
                        </div>
                        <div className="col-md-3 col-6">
                          <h6>Refunded</h6>
                          <h4 className="text-danger mb-0">$85.00</h4>
                        </div>
                      </div>
                    </div>
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