package in.keshavcreates.foodieapi.service;

import in.keshavcreates.foodieapi.entity.UserEntity;
import in.keshavcreates.foodieapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AppUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @org.springframework.beans.factory.annotation.Value("${admin.email:admin@gmail.com}")
    private String adminEmail;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User Not found"));
        
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        if (adminEmail.equalsIgnoreCase(email)) {
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        } else {
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        }
        
        return new User(userEntity.getEmail(), userEntity.getPassword(), authorities);
    }
}
