//package in.keshavcreates.foodieapi.entity;
//
//import in.keshavcreates.foodieapi.io.OrderItem;
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import java.util.List;
//
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//@Entity
//@Builder
//public class OrderEntity {
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    private String id;
//    private String userId;
//    private String Address;
//    private String phoneNumber;
//    private String email;
//    private String paymentStatus;
//    private double amount;
//    @OneToMany(mappedBy = "order_entity",cascade = CascadeType.ALL)
//    private List<OrderItem> orderItems;
//    private String razorpayOrderId;
//    private String razorpaySignature;
//    private String orderStatus;
//
//
//
//}
