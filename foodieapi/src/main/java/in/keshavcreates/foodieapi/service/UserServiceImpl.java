package in.keshavcreates.foodieapi.service;

import in.keshavcreates.foodieapi.entity.UserEntity;
import in.keshavcreates.foodieapi.io.UserRequest;
import in.keshavcreates.foodieapi.io.UserResponse;
import in.keshavcreates.foodieapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationFacade authenticationFacade;

    @Override
    public UserResponse registerUser(UserRequest userRequest) {
        UserEntity userEntity = convertToEntity(userRequest);
        userRepository.save(userEntity);
        return convertToResponse(userEntity);
    }

    @Override
    public String getUserId() {
        String loggedInUserEmail = authenticationFacade.getAuthentication().getName();
        UserEntity loggedInUser = userRepository.findByEmail(loggedInUserEmail).orElseThrow(() -> new UsernameNotFoundException("User Not Found"));
        return loggedInUser.getId();
    }

    public UserEntity convertToEntity(UserRequest userRequest){
        UserEntity userEntity = UserEntity.builder().name(userRequest.getName())
                .email(userRequest.getEmail())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .build();
        return userEntity;
    }

    public UserResponse convertToResponse(UserEntity userEntity) {
        UserResponse userResponse = UserResponse.builder()
                .name(userEntity.getName())
                .email(userEntity.getEmail())
                .id(userEntity.getId())
                .build();
        return userResponse;
    }

}
