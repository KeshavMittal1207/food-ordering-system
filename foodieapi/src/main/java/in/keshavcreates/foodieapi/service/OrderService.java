package in.keshavcreates.foodieapi.service;

import in.keshavcreates.foodieapi.io.OrderRequest;
import in.keshavcreates.foodieapi.io.OrderResponse;

import java.util.List;

public interface OrderService {
    OrderResponse placeOrder(OrderRequest orderRequest);
    List<OrderResponse> getOrdersForUser();
    List<OrderResponse> getAllOrders();
    OrderResponse verifyPayment(String orderId, String paymentId, String signature);
    OrderResponse updateOrderStatus(String id, String status);
    OrderResponse cancelOrder(String orderId);
}
