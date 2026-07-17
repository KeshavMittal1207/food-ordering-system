import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { addFood } from '../../services/foodService.js'; 

const AddFood = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("/upload.png");
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Veg Biryani',
    available: true,
    bestSeller: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!image) {
      setPreview("/upload.png");
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const onchangeHandler = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === 'checkbox' ? checked : value;
    setData((prev) => ({ ...prev, [name]: val }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    if (!image) {
      toast.error('Please select an image.');
      return;
    }

    setLoading(true);
    
    try {
      await addFood(data, image);
      toast.success('Food added successfully.');
      setData({ name: '', description: '', category: 'Veg Biryani', price: '', available: true, bestSeller: false });
      setImage(null);
      
      const fileInput = document.getElementById('image');
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (error) {
      console.error('Error adding food:', error);
      toast.error('Error adding food. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-7 col-md-9">
        <div className="card admin-card p-4 shadow-sm border-0 rounded-4" style={{ backgroundColor: '#ffffff' }}>
          <div className="card-body">
            <h2 className="mb-4 fw-bold text-dark"><i className="bi bi-plus-circle me-3 text-success"></i>Add New Food</h2>
            <form onSubmit={onSubmitHandler}>
              
              {/* Image Preview & Upload */}
              <div className="mb-4 text-center">
                <label htmlFor="image" className="form-label d-block text-start mb-3 text-dark small fw-bold">Food Image</label>
                <label htmlFor="image" className="position-relative d-inline-block rounded-4 overflow-hidden border border-dashed p-2" style={{ cursor: 'pointer', background: '#f8f9fa', borderColor: '#cbd5e0' }}>
                  <img
                    src={preview}
                    alt="Upload Preview"
                    style={{ maxHeight: '140px', maxWidth: '100%', objectFit: 'contain', borderRadius: '12px' }}
                  />
                  <div className="position-absolute bottom-0 end-0 bg-success text-white p-2 rounded-start shadow">
                    <i className="bi bi-camera-fill"></i>
                  </div>
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              {/* Name */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label text-dark small fw-bold">Food Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="e.g. Premium Paneer Butter Masala"
                  required
                  name="name"
                  value={data.name}
                  onChange={onchangeHandler}
                  disabled={loading}
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label htmlFor="description" className="form-label text-dark small fw-bold">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  placeholder="Describe the taste, ingredients, and preparation of the dish..."
                  required
                  name="description"
                  value={data.description}
                  onChange={onchangeHandler}
                  disabled={loading}
                ></textarea>
              </div>

              <div className="row">
                {/* Price */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="price" className="form-label text-dark small fw-bold">Price (&#8377;)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    placeholder="e.g. 299"
                    required
                    name="price"
                    value={data.price}
                    onChange={onchangeHandler}
                    disabled={loading}
                    min="0"
                    step="0.01"
                  />
                </div>

                {/* Category */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="category" className="form-label text-dark small fw-bold">Category</label>
                  <select
                    name="category"
                    id="category"
                    className="form-select"
                    value={data.category}
                    onChange={onchangeHandler}
                    disabled={loading}
                  >
                    <option value="Veg Biryani">Veg Biryani</option>
                    <option value="Veg Burgers">Veg Burgers</option>
                    <option value="Eggless Cakes">Eggless Cakes</option>
                    <option value="Desserts & Ice cream">Desserts & Ice cream</option>
                    <option value="Pure Veg Pizza">Pure Veg Pizza</option>
                    <option value="Veg Rolls">Veg Rolls</option>
                    <option value="Fresh Salads">Fresh Salads</option>
                  </select>
                </div>
              </div>

              {/* Toggles: Available & Best Seller */}
              <div className="row g-3 mb-4 p-3 bg-light rounded-4 border">
                <div className="col-md-6">
                  <div className="form-check form-switch mt-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="available"
                      name="available"
                      checked={data.available}
                      onChange={onchangeHandler}
                      disabled={loading}
                    />
                    <label className="form-check-label fw-semibold text-dark" htmlFor="available">
                      Available (In Stock)
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-check form-switch mt-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="bestSeller"
                      name="bestSeller"
                      checked={data.bestSeller}
                      onChange={onchangeHandler}
                      disabled={loading}
                    />
                    <label className="form-check-label fw-semibold text-dark" htmlFor="bestSeller">
                      Mark as Best Seller
                    </label>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-success w-100 py-3 rounded-pill fw-bold text-uppercase text-white shadow-sm"
                style={{ backgroundColor: '#2d6a4f', border: 'none' }}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Upload to Menu'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;