package in.keshavcreates.foodieapi.repository;

import in.keshavcreates.foodieapi.entity.UserEntity;
import in.keshavcreates.foodieapi.io.UserResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity , String> {
    Optional<UserEntity> findByEmail(String email);
}
