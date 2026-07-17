import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="p-5 mb-5 hero-jumbotron mt-3 rounded-4 shadow-lg border-start border-4 border-success" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="container-fluid py-4 text-start position-relative" style={{ zIndex: 2 }}>
            <div className="d-flex align-items-center gap-2 mb-3">
                <span className="badge bg-success text-white px-3 py-2 rounded-pill text-uppercase fw-bold d-flex align-items-center gap-1.5" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                  <span className="d-inline-flex justify-content-center align-items-center" style={{ border: '1.5px solid white', padding: '1px', borderRadius: '3px', width: '12px', height: '12px' }}>
                    <span style={{ width: '6px', height: '6px', backgroundColor: 'white', borderRadius: '50%' }}></span>
                  </span>
                  100% Pure Veg
                </span>
                <span className="badge text-bg-warning px-3 py-2 rounded-pill text-uppercase fw-bold" style={{ fontSize: '0.85rem', color: '#111', letterSpacing: '0.5px' }}>Delhi's Best</span>
            </div>
            <h1 className='display-4 fw-bold text-white mb-3' style={{ letterSpacing: '-0.5px', lineHeight: 1.15 }}>
                Savor the Finest <br className="d-none d-md-block" />
                <span style={{ color: '#c5a880' }}>Pure Vegetarian</span> Delicacies
            </h1>
            <p className='col-md-8 fs-5 text-white-50 mb-4' style={{ lineHeight: 1.6 }}>
                Welcome to <strong className="text-white">Urban Bites</strong>. Indulge in our carefully curated, rich culinary heritage from aromatic veg biryanis and authentic starters to artisan eggless desserts, made fresh and delivered hot to your doorstep in Delhi.
            </p>
            <Link to="/explore" className='btn btn-primary btn-lg px-4 py-2.5 rounded-pill shadow-sm transition-btn' style={{ letterSpacing: '0.5px' }}>
                Explore Menu <i className="bi bi-arrow-right ms-2"></i>
            </Link>
        </div>
    </div>
  )
}

export default Header;
