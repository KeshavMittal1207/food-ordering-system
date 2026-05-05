package in.keshavcreates.foodieapi.repository;

import in.keshavcreates.foodieapi.entity.FoodEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodRepository extends JpaRepository<FoodEntity , String> {
}
