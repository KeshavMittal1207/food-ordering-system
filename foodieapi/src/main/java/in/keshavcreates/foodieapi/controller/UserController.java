package in.keshavcreates.foodieapi.controller;

import in.keshavcreates.foodieapi.io.UserRequest;
import in.keshavcreates.foodieapi.io.UserResponse;
import in.keshavcreates.foodieapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse registerUser(@Valid @RequestBody UserRequest userRequest){
        return userService.registerUser(userRequest);
    }
}
