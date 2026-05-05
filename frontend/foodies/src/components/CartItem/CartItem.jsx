// import React from 'react'
// import {StoreContext} from '../context/StoreContext'

// const CartItem = ({foodId , quantity}) => {
//     const {foodList,increaseQuantity,decreaseQuantity} = useContext(StoreContext);
//     const food = foodList.find(item => item.id === foodId);
//     if(!food) return null ; 

//   return (
//     <div className="card mb-4">
//                 <div className="card-body">
//                     <div className="row cart-item mb-3">
//                         <div className="col-md-3">
//                             <img src={food.imageUrl} alt={food.name} className="img-fluid rounded"/>
//                         </div>
//                         <div className="col-md-5">
//                             <h5 className="card-title">{food.name}</h5>
//                             <p className="text-muted">Category: {food.category}</p>
//                         </div>
//                         <div className="col-md-2">
//                             <div className="input-group">
//                                 <button className="btn btn-outline-secondary btn-sm" type="button">-</button>
//                                 <span className="fw-bold">{quantity}</span>
//                                 <button className="btn btn-outline-secondary btn-sm" type="button">+</button>
//                             </div>
//                         </div>
//                         <div className="col-md-2 text-end">
//                             <p className="fw-bold">{food.price * quantity}</p>
//                             <button className="btn btn-sm btn-outline-danger">
//                                     <i className="bi bi-trash"></i>
//                                 </button>
//                         </div>
//                     </div>
//                     <hr/>
//                 </div>
//             </div>
//             <div className="text-start mb-4">
//                 <Link to="/">
//                     <a href="#" className="btn btn-outline-primary">
//                         <i className="bi bi-arrow-left me-2"></i>Continue Shopping
//                     </a>
//                 </Link>
//             </div>
//         </div>
//         // <div className="col-lg-4">
//         //     <div className="card cart-summary">
//         //         <div className="card-body">
//         //             <h5 className="card-title mb-4">Order Summary</h5>
//         //             <div className="d-flex justify-content-between mb-3">
//         //                 <span>Subtotal</span>
//         //                 <span>$199.97</span>
//         //             </div>
//         //             <div className="d-flex justify-content-between mb-3">
//         //                 <span>Shipping</span>
//         //                 <span>$10.00</span>
//         //             </div>
//         //             <div className="d-flex justify-content-between mb-3">
//         //                 <span>Tax</span>
//         //                 <span>$20.00</span>
//         //             </div>
//         //             <hr/>
//         //             <div className="d-flex justify-content-between mb-4">
//         //                 <strong>Total</strong>
//         //                 <strong>$229.97</strong>
//         //             </div>
//         //             <button className="btn btn-primary w-100">Proceed to Checkout</button>
//         //         </div>
//         //     </div>
//   )
// }

// export default CartItem
