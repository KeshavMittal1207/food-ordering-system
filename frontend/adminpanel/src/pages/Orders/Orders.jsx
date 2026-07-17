import React, { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus } from '../../services/orderService';
import { toast } from 'react-toastify';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const data = await getAllOrders();
      // Show newest orders first
      const sorted = [...data].sort((a, b) => new Date(b.orderDateTime || 0) - new Date(a.orderDateTime || 0));
      setOrders(sorted);
    } catch (error) {
      toast.error('Failed to load orders list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success('Order status updated successfully!');
      // Update local state instantly
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: newStatus } : o));
    } catch (err) {
      toast.error('Failed to update order status');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading orders...</span>
        </div>
        <p className="text-muted mt-3">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="card admin-card p-4 shadow-sm border-0 rounded-4" style={{ backgroundColor: '#ffffff' }}>
      <div className="card-body">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
          <div>
            <h2 className="fw-bold text-dark mb-1" style={{ color: '#1b4332' }}>
              <i className="bi bi-cart-check me-3 text-success"></i>Customer Orders
            </h2>
            <p className="text-muted mb-0">Overview and tracking status of all customer orders.</p>
          </div>
          <span className="badge bg-success text-white px-3 py-2 rounded-pill fw-bold">
            Total Orders: {orders.length}
          </span>
        </div>

        <hr></hr>

        {orders.length === 0 ? (
          <div className="text-center py-5 rounded-4 bg-light">
            <i className="bi bi-receipt-cutoff display-3 text-muted mb-3 d-block"></i>
            <h4 className="text-secondary">No orders placed yet</h4>
            <p className="text-muted">Customer orders will appear here once placed.</p>
          </div>
        ) : (
          <div className="row g-4">
            {orders.map((order) => (
              <div key={order.id} className="col-12">
                <div className="card border rounded-4 p-3 bg-light bg-opacity-50">
                  {/* Order Header */}
                  <div className="d-flex flex-wrap justify-content-between align-items-center border-bottom pb-3 mb-3 gap-3">
                    <div>
                      <div className="d-flex flex-wrap align-items-center gap-2">
                        <span>
                          <span className="text-muted small">Order ID: </span>
                          <strong className="text-dark small font-monospace">{order.id}</strong>
                        </span>
                        {order.orderDateTime && (
                          <span className="badge bg-white text-dark border px-2.5 py-1.5 rounded-pill small ms-md-2 fw-semibold">
                            <i className="bi bi-calendar3 me-1.5 text-success"></i>
                            {new Date(order.orderDateTime).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="d-flex flex-wrap align-items-center gap-3">
                      <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2.5 rounded-pill fw-bold">
                        Payment: {order.paymentStatus}
                      </span>
                      <span className="badge bg-secondary-subtle text-dark border px-3 py-2.5 rounded-pill fw-semibold">
                        Method: {order.paymentMethod || 'CASH'}
                      </span>
                      <div className="d-flex align-items-center gap-2">
                        <span className="small text-muted fw-bold">Status:</span>
                        <select 
                          className="form-select form-select-sm rounded-pill px-3 py-1.5 fw-semibold border-success text-success"
                          value={order.orderStatus}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          style={{ minWidth: '160px', cursor: 'pointer' }}
                        >
                          <option value="Placed">Placed</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Canceled">Canceled</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="row align-items-center g-3">
                    <div className="col-lg-8 col-md-7">
                      <h6 className="text-dark mb-3 fw-bold"><i className="bi bi-egg-fried text-success me-2"></i>Ordered Items:</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {order.orderItems.map((item, idx) => (
                          <div key={idx} className="d-flex align-items-center gap-2 border rounded-3 p-2 bg-white" style={{ minWidth: '220px' }}>
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="rounded border" 
                              style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/40x40?text=No+Image';
                              }}
                            />
                            <div>
                              <h6 className="mb-0 text-dark fw-bold" style={{ fontSize: '0.8rem' }}>{item.name}</h6>
                              <small className="text-muted">Qty: {item.quantity} x &#8377;{item.price}</small>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-5 text-md-end">
                      <span className="text-muted d-block small mb-1">Grand Total (Incl. Taxes & Packing)</span>
                      <h3 className="fw-bold text-success mb-0">&#8377;{order.amount.toFixed(2)}</h3>
                    </div>
                  </div>

                  {/* Shipping/Contact details */}
                  <div className="mt-3 pt-3 border-top d-flex flex-wrap justify-content-between text-muted gap-3" style={{ fontSize: '0.85rem' }}>
                    <div>
                      <i className="bi bi-geo-alt me-2 text-success"></i>Delivery Address: <strong className="text-dark">{order.address}</strong>
                    </div>
                    <div className="d-flex gap-4">
                      <span><i className="bi bi-telephone me-2 text-success"></i>Phone: <strong className="text-dark">{order.phoneNumber}</strong></span>
                      <span><i className="bi bi-envelope me-2 text-success"></i>Email: <strong className="text-dark">{order.email}</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;