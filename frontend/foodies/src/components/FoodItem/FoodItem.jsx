import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext"; 
const FoodItem = ({ name, description, id, imageUrl, price, available = true, bestSeller = false, rating }) => {
  const { increaseQuantity, decreaseQuantity, quantities } = useContext(StoreContext);
  

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
      <div className="card h-100 shadow-sm border-0 rounded-4" style={{ maxWidth: "320px", textDecoration: "none", overflow: 'hidden' }}>
        <div className="position-relative">
          <Link to={available ? `/getFood/${id}` : '#'}>
            <img
              src={imageUrl}
              className="card-img-top"
              alt={name}
              height={220}
              style={{ objectFit: 'cover', filter: available ? 'none' : 'grayscale(60%) opacity(50%)' }}
            />
          </Link>
          {bestSeller && (
            <span className="position-absolute top-0 start-0 m-3 badge bg-warning text-dark fw-bold shadow-sm" style={{ zIndex: 1, fontSize: '0.75rem' }}>
              <i className="bi bi-star-fill me-1"></i>Best Seller
            </span>
          )}
          {!available && (
            <span className="position-absolute top-50 start-50 translate-middle badge bg-danger px-3 py-2 rounded-3 fw-bold text-uppercase shadow-lg" style={{ zIndex: 1, fontSize: '0.8rem' }}>
              Out of Stock
            </span>
          )}
        </div>
        <div className="card-body d-flex flex-column justify-content-between p-3">
          <div>
            <h5 className="card-title fw-bold mb-2 text-dark">{name}</h5>
            <p className="card-text text-muted small mb-3" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{description}</p>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <span className="h5 mb-0 fw-bold text-success">&#8377;{price}</span>
            <div className="small text-muted d-flex align-items-center gap-1">
              <i className="bi bi-star-fill text-warning"></i>
              <span>{rating !== undefined && rating !== null ? rating.toFixed(1) : '0.0'}</span>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between bg-light border-0 py-2.5 px-3">
          <Link className={`btn ${available ? 'btn-outline-success' : 'btn-outline-secondary disabled'} btn-sm px-3 rounded-pill`} to={`/getFood/${id}`}>
            View Item
          </Link>
          {!available ? (
            <button className="btn btn-secondary btn-sm rounded-pill px-3" disabled>Sold Out</button>
          ) : quantities[id] > 0 ? (
            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-outline-danger btn-sm rounded-circle p-1" style={{ width: '28px', height: '28px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => decreaseQuantity(id)}>
                <i className="bi bi-dash"></i>
              </button>
              <span className="fw-bold px-1">{quantities[id]}</span>
              <button className="btn btn-outline-success btn-sm rounded-circle p-1" style={{ width: '28px', height: '28px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => increaseQuantity(id)}>
                <i className="bi bi-plus"></i>
              </button>
            </div>
          ) : (
            <button className="btn btn-success btn-sm rounded-pill px-3" onClick={() => increaseQuantity(id)}>
              <i className="bi bi-cart-plus me-1.5"></i>Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
