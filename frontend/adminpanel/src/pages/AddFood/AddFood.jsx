import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { addFood } from '../../services/foodService.js'; 

const AddFood = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Biryani'
  });
  const [loading, setLoading] = useState(false);

  const onchangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    if (!image) {
      toast.error('Please select an image.');
      return;
    }

    setLoading(true);
    
    try {
      await addFood(data, image); // Use the imported function
      console.log("JWT token:", localStorage.getItem("token"));

      toast.success('Food added successfully.');
      setData({ name: '', description: '', category: 'Biryani', price: '' });
      setImage(null);
      
      // Reset file input
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
    <div className="mt-2">
      <div className="row justify-content-center">
        <div className="card col-md-4">
          <div className="card-body">
            <h2 className="mb-4">Add Food</h2>
            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  <img
                    src={image ? URL.createObjectURL(image) : '/upload.png'}
                    alt="Upload"
                    width={98}
                    style={{ cursor: 'pointer' }}
                  />
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  accept="image/*"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  name="name"
                  value={data.name}
                  onChange={onchangeHandler}
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="5"
                  required
                  name="description"
                  value={data.description}
                  onChange={onchangeHandler}
                  disabled={loading}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  required
                  name="price"
                  value={data.price}
                  onChange={onchangeHandler}
                  disabled={loading}
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select
                  name="category"
                  id="category"
                  className="form-control"
                  value={data.category}
                  onChange={onchangeHandler}
                  disabled={loading}
                >
                  <option value="Biryani">Biryani</option>
                  <option value="Cake">Cake</option>
                  <option value="Burger">Burger</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Salad">Salad</option>
                  <option value="Ice cream">Ice cream</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Save'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;