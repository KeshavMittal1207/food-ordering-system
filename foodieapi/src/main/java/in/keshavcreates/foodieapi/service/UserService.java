package in.keshavcreates.foodieapi.service;

import in.keshavcreates.foodieapi.io.UserRequest;
import in.keshavcreates.foodieapi.io.UserResponse;

public interface UserService {

    UserResponse registerUser(UserRequest userRequest);

    String getUserId();

}
