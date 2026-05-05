import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getFoodList, deleteFood } from '../../services/foodService'; 


const ListFood = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch food list from API
    const fetchList = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await getFoodList();
          setList(data);
          console.log('Food list received:', data);
        } 
        catch (error) {
            console.error('Fetch list error:', error);
            setError('Failed to load food items. Please try again.');
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
            console.log('Removing food with ID:', foodId);
            const success = await deleteFood(foodId);
            
            if (success) {
                toast.success('Food item removed successfully!');
                await fetchList();
            } else {
                toast.error('Failed to remove food item.');
            }
        } catch (error) {
            console.error('Remove food error:', error);
        }
    };
    // Loading state
    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading food items...</p>
            </div>
        );
    }

    return (
        <div className="list-food-container">
            <div className="list-food-header">
                <h2>Food Items List</h2>
                <p>Total items: {list.length}</p>
            </div>

            {list.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">🍽️</div>
                    <h3>No food items found</h3>
                    <p>Start by adding some delicious food items to your menu!</p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="food-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item, index) => (
                                <tr key={item.id || index}>
                                    <td className="image-cell">
                                        {item.image ? (
                                            <img 
                                                src={item.image} 
                                                alt={item.name || 'Food item'} 
                                                className="food-image"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/60x60?text=No+Image';
                                                }}
                                            />
                                        ) : (
                                            <div className="no-image-placeholder">
                                                <span>📷</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="name-cell">
                                        <strong>{item.name || 'Unnamed Item'}</strong>
                                    </td>
                                    <td className="category-cell">
                                        <span className="category-tag">
                                            {item.category || 'Uncategorized'}
                                        </span>
                                    </td>
                                    <td className="price-cell">
                                        <span className="price">
                                            ₹{parseFloat(item.price || 0).toFixed(2)}
                                        </span>
                                    </td>
                                    <td className="description-cell">
                                        <span className="description" title={item.description}>
                                            {item.description ? 
                                                (item.description.length > 50 ? 
                                                    `${item.description.substring(0, 50)}...` : 
                                                    item.description
                                                ) : 
                                                'No description'
                                            }
                                        </span>
                                    </td>
                                    <td className="action-cell">
                                        <div className="action-buttons">
                                            <button
                                                onClick={() => removeFood(item.id)}
                                                className="delete-button"
                                                title="Delete this food item"
                                                disabled={!item.id}
                                            >
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ListFood;