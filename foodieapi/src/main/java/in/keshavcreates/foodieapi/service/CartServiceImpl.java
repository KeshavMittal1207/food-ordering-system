package in.keshavcreates.foodieapi.service;

import in.keshavcreates.foodieapi.entity.CartEntity;
import in.keshavcreates.foodieapi.entity.UserEntity;
import in.keshavcreates.foodieapi.io.CartRequest;
import in.keshavcreates.foodieapi.io.CartResponse;
import in.keshavcreates.foodieapi.repository.CartRepository;
import jakarta.transaction.Transactional;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService{

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserService userService;

    @Override
    public CartResponse addToCart(CartRequest cartRequest) {
        String loggedInUserId = userService.getUserId();
        CartEntity cartEntity = cartRepository.findByUserId(loggedInUserId).orElseGet(() -> new CartEntity(loggedInUserId,new HashMap<>()));
        Map<String, Integer> items = cartEntity.getItems();
        items.put(cartRequest.getFoodId() , items.getOrDefault(cartRequest.getFoodId() ,0) + 1);
        cartEntity.setItems(items);
        cartEntity = cartRepository.save(cartEntity);
        return convertToResponse(cartEntity);
    }
    public CartResponse convertToResponse(CartEntity cartEntity){
        return  CartResponse.builder()
                .id(cartEntity.getId())
                .userId(cartEntity.getUserId())
                .items(cartEntity.getItems())
                .build();
    }

    @Override
    public CartResponse getCart() {
        String loggedInUserId = userService.getUserId();
        CartEntity cartEntity = cartRepository.findByUserId(loggedInUserId).orElse(CartEntity.builder()
                .userId(null)
                .items(new HashMap<>())
                .build());
        return convertToResponse(cartEntity);
    }

    @Override
    @Transactional
    public void clearCart() {
        String loggedInUserId = userService.getUserId();
        Optional<CartEntity> cartEntity = cartRepository.findByUserId(loggedInUserId);
        if(cartEntity.isPresent()){
            cartRepository.deleteByUserId(loggedInUserId);
        }
        else{
            throw new IllegalStateException("Cart Does not exist");
        }
    }

    @Override
    public CartResponse removeFromCart(CartRequest cartRequest) {
        String loggedInUserId = userService.getUserId();
        CartEntity cartEntity = cartRepository.findByUserId(loggedInUserId).orElseThrow(() -> new RuntimeException("Cart not found"));
            Map<String, Integer> items = cartEntity.getItems();
            if (items.get(cartRequest.getFoodId()) > 1) {
                items.put(cartRequest.getFoodId(), items.get(cartRequest.getFoodId()) - 1);
            } else {
                items.remove(cartRequest.getFoodId());
            }
            cartEntity = cartRepository.save(cartEntity);
            return convertToResponse(cartEntity);
        }
    }

