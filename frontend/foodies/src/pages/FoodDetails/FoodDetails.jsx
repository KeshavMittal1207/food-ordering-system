import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchFoodDetails, fetchReviews, fetchAverageRating, addReview } from '../../service/foodService.js';
import { StoreContext } from '../../context/StoreContext.jsx';
import { toast } from 'react-toastify';

const FoodDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState(0.0);
    const [userRating, setUserRating] = useState(5);
    const [userComment, setUserComment] = useState('');
    const [submittingReview, setSubmittingReview] = useState(false);
    const { increaseQuantity, decreaseQuantity, quantities, token } = useContext(StoreContext);

    const loadReviewData = async () => {
        try {
            const revList = await fetchReviews(id);
            setReviews(revList);
            const avg = await fetchAverageRating(id);
            setAvgRating(avg);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    useEffect(() => {
        const loadFoodDetails = async () => {
            try {
                const foodData = await fetchFoodDetails(id);
                setData(foodData);
            } catch (error) {
                toast.error('Error Displaying the food Details');
            }
        };
        loadFoodDetails();
        loadReviewData();
    }, [id]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            toast.error('Please login to write a review!');
            return;
        }
        setSubmittingReview(true);
        try {
            await addReview({
                foodId: id,
                rating: userRating,
                comment: userComment
            });
            toast.success('Thank you! Review submitted.');
            setUserComment('');
            setUserRating(5);
            await loadReviewData();
        } catch (error) {
            console.error(error);
            toast.error('Failed to submit review. Try again.');
        } finally {
            setSubmittingReview(false);
        }
    };

    const renderStars = (ratingVal) => {
        const stars = [];
        const floor = Math.floor(ratingVal);
        for (let i = 1; i <= 5; i++) {
            if (i <= floor) {
                stars.push(<i key={i} className="bi bi-star-fill text-warning me-1"></i>);
            } else if (i - 0.5 <= ratingVal) {
                stars.push(<i key={i} className="bi bi-star-half text-warning me-1"></i>);
            } else {
                stars.push(<i key={i} className="bi bi-star text-muted me-1"></i>);
            }
        }
        return stars;
    };

    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 my-5">
                {/* Food Details Row */}
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6">
                        <img 
                            className="card-img-top mb-5 mb-md-0 rounded-4 shadow-sm border" 
                            src={data.imageUrl} 
                            alt={data.name} 
                            style={{ maxHeight: "400px", width: "100%", objectFit: "cover", filter: data.available ? 'none' : 'grayscale(60%) opacity(70%)' }} 
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="fs-6 mb-2 text-uppercase fw-semibold" style={{ color: '#2d6a4f' }}>
                            Category: <span className='badge bg-success-subtle text-success border border-success-subtle px-2.5 py-1.5 rounded-pill ms-1'>{data.category}</span>
                        </div>
                        <h1 className="display-5 fw-bold text-dark mb-2">{data.name}</h1>
                        
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <div className="d-flex">
                                {renderStars(avgRating)}
                            </div>
                            <span className="text-muted small fw-semibold">({avgRating ? avgRating.toFixed(1) : 0})</span>
                        </div>

                        <div className="fs-4 mb-4">
                            <span className="text-decoration-line-through text-muted small me-2">&#8377;{data.price ? (data.price + 50) : 0}.00</span>
                            <span className="fw-bold text-success fs-3">&#8377;{data.price}.00</span>
                        </div>
                        
                        <p className="lead text-muted mb-4">{data.description}</p>
                        
                        <div className="d-flex align-items-center gap-3 mt-4">
                            {!data.available ? (
                                <button className="btn btn-secondary btn-lg px-4 py-2.5 rounded-pill" disabled>
                                    Out of Stock
                                </button>
                            ) : quantities[id] > 0 ? (
                                <div className="d-flex align-items-center gap-3 bg-light p-2 rounded-pill border">
                                    <button className="btn btn-outline-danger btn-sm rounded-circle p-2 d-inline-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }} onClick={() => decreaseQuantity(id)}>
                                        <i className="bi bi-dash-lg"></i>
                                    </button>
                                    <span className="fw-bold fs-5 px-2">{quantities[id]}</span>
                                    <button className="btn btn-outline-success btn-sm rounded-circle p-2 d-inline-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }} onClick={() => increaseQuantity(id)}>
                                        <i className="bi bi-plus-lg"></i>
                                    </button>
                                </div>
                            ) : (
                                <button className="btn btn-success btn-lg px-4 py-2.5 rounded-pill" type="button" onClick={() => increaseQuantity(id)}>
                                    <i className="bi-cart-fill me-2"></i>
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <hr className="my-5" />

                {/* Ratings & Reviews Section */}
                <div className="row mt-5">
                    {/* Display Reviews */}
                    <div className="col-lg-7 mb-5">
                        <h4 className="fw-bold mb-4" style={{ color: '#1b4332' }}>
                            Customer Reviews ({reviews.length})
                        </h4>
                        {reviews.length === 0 ? (
                            <div className="bg-light p-4 rounded-4 text-center text-muted">
                                <i className="bi bi-chat-left-text text-muted mb-2 d-block" style={{ fontSize: '2rem' }}></i>
                                <span>No reviews yet for this food item. Be the first to share your thoughts!</span>
                            </div>
                        ) : (
                            <div className="d-flex flex-column gap-3 overflow-auto" style={{ maxHeight: '480px', paddingRight: '5px' }}>
                                {reviews.map((rev) => (
                                    <div key={rev.id} className="card border-0 bg-light p-3 rounded-4">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="fw-bold text-dark">{rev.userName}</span>
                                            <span className="text-muted small" style={{ fontSize: '0.8rem' }}>
                                                {new Date(rev.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </span>
                                        </div>
                                        <div className="mb-2">
                                            {renderStars(rev.rating)}
                                        </div>
                                        <p className="text-muted mb-0 small">{rev.comment}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Add Review Form */}
                    <div className="col-lg-5">
                        <div className="card border border-light shadow-sm rounded-4 p-4">
                            <h4 className="fw-bold mb-3" style={{ color: '#1b4332' }}>
                                Write a Review
                            </h4>
                            {token ? (
                                <form onSubmit={handleReviewSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label text-muted small fw-bold">Your Rating</label>
                                        <div className="d-flex align-items-center gap-1 fs-4">
                                            {[1, 2, 3, 4, 5].map((val) => (
                                                <i 
                                                    key={val} 
                                                    className={`bi ${val <= userRating ? 'bi-star-fill text-warning' : 'bi-star text-muted'} cursor-pointer`}
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => setUserRating(val)}
                                                ></i>
                                            ))}
                                            <span className="ms-2 fs-6 text-muted small">({userRating} Stars)</span>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label text-muted small fw-bold">Review Description</label>
                                        <textarea
                                            rows="4"
                                            className="form-control rounded-3"
                                            placeholder="What did you like or dislike about this dish?"
                                            value={userComment}
                                            onChange={(e) => setUserComment(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-success w-100 py-2.5 rounded-pill"
                                        style={{ background: '#2d6a4f', border: 'none' }}
                                        disabled={submittingReview}
                                    >
                                        {submittingReview ? 'Submitting...' : 'Submit Review'}
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center py-4 bg-light rounded-4 text-muted small">
                                    <p className="mb-3">You must be signed in to submit a rating or review.</p>
                                    <Link to="/login" className="btn btn-outline-success btn-sm rounded-pill px-4">
                                        Sign In Now
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FoodDetails;
