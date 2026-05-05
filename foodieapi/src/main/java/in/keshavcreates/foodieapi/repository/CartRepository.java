package in.keshavcreates.foodieapi.repository;

import in.keshavcreates.foodieapi.entity.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<CartEntity , String> {
    Optional<CartEntity> findByUserId(String loggedInUserId);

    void deleteByUserId(String loggedInUserId);
}
