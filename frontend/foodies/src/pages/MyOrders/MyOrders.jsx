import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { fetchMyOrders, cancelCustomerOrder } from '../../service/orderService';
import { toast } from 'react-toastify';

const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const loadOrders = async () => {
      try {
        const data = await fetchMyOrders();
        // Show newest orders first
        const sorted = [...data].sort((a, b) => new Date(b.orderDateTime || 0) - new Date(a.orderDateTime || 0));
        setOrders(sorted);
      } catch (error) {
        toast.error('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [token, navigate]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }
    try {
      await cancelCustomerOrder(orderId);
      toast.success('Order canceled successfully!');
      // Update local state instantly
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: 'Canceled', paymentStatus: o.paymentStatus === 'PAID' ? 'REFUNDED' : o.paymentStatus } : o));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel order.');
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading your orders...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-5 fw-bold text-dark"><i className="bi bi-bag-check me-3 text-success"></i>My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-5 shadow-sm rounded-4 bg-light">
          <i className="bi bi-inbox display-1 text-muted mb-4"></i>
          <h3 className="text-secondary">No orders yet</h3>
          <p className="text-muted">Place your first order to see it listed here.</p>
          <button className="btn btn-primary rounded-pill px-5 py-2.5" onClick={() => navigate('/')}>
            Order Now
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {orders.map((order) => (
            <div key={order.id} className="col-12">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-header bg-white py-3 border-bottom-0 rounded-top-4 d-flex flex-wrap justify-content-between align-items-center gap-3">
                  <div className="d-flex flex-wrap align-items-center gap-2">
                    <div>
                      <span className="text-muted">Order ID: </span>
                      <span className="fw-semibold text-dark font-monospace">{order.id}</span>
                    </div>
                    {order.orderDateTime && (
                      <span className="badge bg-light text-dark border px-2.5 py-1.5 rounded-pill small ms-md-2 fw-semibold">
                        <i className="bi bi-calendar3 me-1.5 text-success"></i>
                        {new Date(order.orderDateTime).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                      </span>
                    )}
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill">
                      Payment: {order.paymentStatus}
                    </span>
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill">
                      Status: {order.orderStatus}
                    </span>
                    {order.orderStatus === 'Placed' && (
                      <button 
                        className="btn btn-sm btn-outline-danger px-3 py-1.5 rounded-pill fw-semibold ms-2"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        <i className="bi bi-x-circle me-1.5"></i>Cancel Order
                      </button>
                    )}
                  </div>
                </div>
                <div className="card-body px-4 py-3">
                  <div className="row align-items-center g-3">
                    {/* Items List inside Order */}
                    <div className="col-md-8">
                      <div className="d-flex flex-wrap gap-3">
                        {order.orderItems.map((item, idx) => (
                          <div key={idx} className="d-flex align-items-center gap-2 border rounded p-2 bg-light" style={{ minWidth: '200px' }}>
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="rounded" 
                              style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                            />
                            <div>
                              <h6 className="mb-0 text-dark fw-bold" style={{ fontSize: '0.85rem' }}>{item.name}</h6>
                              <small className="text-muted">Qty: {item.quantity} x &#8377;{item.price}</small>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Pricing & Info */}
                    <div className="col-md-4 text-md-end">
                      <p className="mb-1 text-muted">Total Amount</p>
                      <h4 className="fw-bold text-success">&#8377;{order.amount.toFixed(2)}</h4>
                    </div>
                  </div>

                  {/* Order Tracking Progress Bar */}
                  <hr className="my-3 text-black-50" />
                  {order.orderStatus === 'Canceled' ? (
                    <div className="alert alert-danger border-0 rounded-3 text-center mb-2 py-2 fw-semibold small">
                      <i className="bi bi-x-circle-fill me-2"></i> This order has been canceled.
                    </div>
                  ) : (
                    <div className="py-2 px-3 bg-light rounded-4 my-2 position-relative">
                      <div className="d-flex justify-content-between align-items-center position-relative" style={{ minHeight: '60px' }}>
                        {/* Progress line background */}
                        <div className="position-absolute start-0 end-0 bg-secondary-subtle" style={{ height: '3px', top: '25%', transform: 'translateY(-50%)', zIndex: 0 }}></div>
                        {/* Progress line active */}
                        <div className="position-absolute start-0 bg-success" style={{ 
                          height: '3px', 
                          top: '25%', 
                          transform: 'translateY(-50%)', 
                          width: order.orderStatus === 'Delivered' ? '100%' : order.orderStatus === 'Out for Delivery' ? '66.6%' : order.orderStatus === 'Preparing' ? '33.3%' : '0%', 
                          transition: 'width 0.4s ease', 
                          zIndex: 0 
                        }}></div>

                        {/* Steps */}
                        {[
                          { name: 'Placed', icon: 'bi-file-earmark-check' },
                          { name: 'Preparing', icon: 'bi-fire' },
                          { name: 'Out for Delivery', icon: 'bi-truck' },
                          { name: 'Delivered', icon: 'bi-house-check' }
                        ].map((step, idx) => {
                          const stepStates = ['Placed', 'Preparing', 'Out for Delivery', 'Delivered'];
                          const currentIdx = stepStates.indexOf(order.orderStatus);
                          const stepIdx = stepStates.indexOf(step.name);
                          
                          const isCompleted = stepIdx <= currentIdx;
                          const isActive = stepIdx === currentIdx;

                          return (
                            <div key={step.name} className="d-flex flex-column align-items-center position-relative" style={{ zIndex: 1, width: '25%' }}>
                              <div 
                                className={`rounded-circle d-flex align-items-center justify-content-center border border-3 ${isCompleted ? 'bg-success text-white border-success shadow-sm' : 'bg-white text-muted border-secondary-subtle'}`}
                                style={{ width: '32px', height: '32px', transition: 'all 0.3s ease' }}
                              >
                                <i className={`bi ${step.icon} small`}></i>
                              </div>
                              <span className={`small mt-2 fw-semibold text-center ${isActive ? 'text-success' : isCompleted ? 'text-dark' : 'text-muted'}`} style={{ fontSize: '0.725rem' }}>
                                {step.name}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                <div className="card-footer bg-white border-top-0 py-3 rounded-bottom-4 d-flex justify-content-between align-items-center text-muted" style={{ fontSize: '0.85rem' }}>
                  <span>Delivered to: <strong className="text-dark">{order.address}</strong></span>
                  <span>Phone: <strong className="text-dark">{order.phoneNumber}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
