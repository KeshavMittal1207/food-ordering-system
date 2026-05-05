package in.keshavcreates.foodieapi.service;

import in.keshavcreates.foodieapi.entity.CartEntity;
import in.keshavcreates.foodieapi.io.CartRequest;
import in.keshavcreates.foodieapi.io.CartResponse;

public interface CartService {

    CartResponse addToCart(CartRequest cartRequest);
    CartResponse convertToResponse(CartEntity cartEntity);
    CartResponse getCart();
    void clearCart();
    CartResponse removeFromCart(CartRequest cartRequest);
}
