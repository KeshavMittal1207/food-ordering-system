package in.keshavcreates.foodieapi.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class CartEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String userId;
    @ElementCollection
    @CollectionTable(name = "cart_items",joinColumns = @JoinColumn(name = "cart_id"))
    @MapKeyColumn(name = "foodId")
    @Column(name = "quantity")
    private Map<String , Integer> items = new HashMap<>();


    public CartEntity(String userId , Map<String, Integer> items) {
        this.userId = userId;
        this.items = items;
    }
}
