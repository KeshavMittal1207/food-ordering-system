import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getFoodList, deleteFood, toggleAvailability, toggleBestSeller } from '../../services/foodService'; 

const ListFood = () => {
    const [foodList, setFoodList] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchList = async () => {
        setLoading(true);
        try {
          const data = await getFoodList();
          setFoodList(data);
        } catch (error) {
            console.error('Fetch list error:', error);
            toast.error('Failed to load food items. Please check connection.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    const removeFood = async (foodId) => {
        if (!window.confirm('Are you sure you want to delete this food item?')) {
            return;
        }
        try {
            const success = await deleteFood(foodId);
            if (success) {
                toast.success('Food item removed successfully!');
                await fetchList();
            } else {
                toast.error('Failed to remove food item.');
            }
        } catch (error) {
            console.error('Remove food error:', error);
            toast.error('Error occurred while deleting.');
        }
    };

    const handleToggleAvailability = async (foodId) => {
        try {
            await toggleAvailability(foodId);
            toast.success('Availability status updated!');
            // Locally update the list state for instant UI update
            setFoodList(prev => prev.map(item => item.id === foodId ? { ...item, available: !item.available } : item));
        } catch (error) {
            toast.error('Failed to update availability.');
        }
    };

    const handleToggleBestSeller = async (foodId) => {
        try {
            await toggleBestSeller(foodId);
            toast.success('Best seller recommendation status updated!');
            // Locally update the list state for instant UI update
            setFoodList(prev => prev.map(item => item.id === foodId ? { ...item, bestSeller: !item.bestSeller } : item));
        } catch (error) {
            toast.error('Failed to update best seller status.');
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading food items...</span>
                </div>
                <p className="text-muted mt-3">Loading food items...</p>
            </div>
        );
    }

    return (
        <div className="card admin-card p-4 shadow-sm border-0 rounded-4" style={{ backgroundColor: '#ffffff' }}>
            <div className="card-body">
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
                    <div>
                        <h2 className="fw-bold text-dark mb-1" style={{ color: '#1b4332' }}>
                            <i className="bi bi-grid-3x3-gap me-3 text-success"></i>Food Items Menu
                        </h2>
                        <p className="text-muted mb-0">Manage food items, stock availability, and best-seller recommendations.</p>
                    </div>
                    <span className="badge bg-success text-white px-3 py-2 rounded-pill fw-bold" style={{ backgroundColor: '#2d6a4f !important' }}>
                        Total Items: {foodList.length}
                    </span>
                </div>
                
                <hr></hr>

                {foodList.length === 0 ? (
                    <div className="text-center py-5 rounded-4 bg-light">
                        <i className="bi bi-egg-fried display-3 text-muted mb-3 d-block"></i>
                        <h4 className="text-secondary">No food items found</h4>
                        <p className="text-muted">Start by adding some delicious pure veg dishes to the menu.</p>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead className="table-dark" style={{ backgroundColor: '#1b4332' }}>
                                <tr>
                                    <th scope="col" style={{ width: '80px' }}>Image</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Availability</th>
                                    <th scope="col">Best Seller</th>
                                    <th scope="col" className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foodList.map((item, index) => (
                                    <tr key={item.id || index}>
                                        <td>
                                            <img 
                                                src={item.imageUrl} 
                                                alt={item.name} 
                                                className="rounded-3 shadow-sm border"
                                                style={{ width: '55px', height: '55px', objectFit: 'cover', filter: item.available ? 'none' : 'grayscale(50%)' }}
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/60x60?text=No+Image';
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <div>
                                                <span className="fw-semibold text-dark d-block">{item.name}</span>
                                                <small className="text-muted d-block text-truncate" style={{ maxWidth: '250px' }}>{item.description || 'No description'}</small>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge bg-light text-success border border-success-subtle px-2.5 py-1.5 rounded-pill" style={{ fontSize: '0.75rem' }}>
                                                {item.category}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="fw-bold text-dark">&#8377;{item.price}</span>
                                        </td>
                                        <td>
                                            <div className="form-check form-switch">
                                                <input 
                                                    className="form-check-input" 
                                                    type="checkbox" 
                                                    role="switch"
                                                    checked={item.available} 
                                                    onChange={() => handleToggleAvailability(item.id)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                                <span className={`small ms-1 fw-bold ${item.available ? 'text-success' : 'text-danger'}`} style={{ fontSize: '0.8rem' }}>
                                                    {item.available ? 'In Stock' : 'Out of Stock'}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="form-check form-switch">
                                                <input 
                                                    className="form-check-input" 
                                                    type="checkbox" 
                                                    role="switch"
                                                    checked={item.bestSeller} 
                                                    onChange={() => handleToggleBestSeller(item.id)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                                <span className={`small ms-1 fw-bold ${item.bestSeller ? 'text-warning' : 'text-muted'}`} style={{ fontSize: '0.8rem' }}>
                                                    {item.bestSeller ? '★ Featured' : 'Standard'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="text-end">
                                            <button
                                                onClick={() => removeFood(item.id)}
                                                className="btn btn-sm btn-outline-danger px-3 py-1.5 rounded-pill fw-semibold"
                                            >
                                                <i className="bi bi-trash3 me-1.5"></i>Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListFood;