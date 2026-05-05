package in.keshavcreates.foodieapi.config;

import in.keshavcreates.foodieapi.filters.JwtAuthenticationFilter;
import in.keshavcreates.foodieapi.filters.RequestWrapperFilter;
import in.keshavcreates.foodieapi.filters.UsernameValidationFilter;
import in.keshavcreates.foodieapi.service.AppUserDetailsService;
import in.keshavcreates.foodieapi.util.JwtUtil;
import jakarta.servlet.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
        private final JwtUtil jwtUtil;
        private final AppUserDetailsService appUserDetailsService;

        public SecurityConfig(JwtUtil jwtUtil , AppUserDetailsService appUserDetailsService){
            this.jwtUtil = jwtUtil;
            this.appUserDetailsService=appUserDetailsService;
        }
    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(jwtUtil, appUserDetailsService);
    }

    @Bean
    public UsernameValidationFilter usernameValidationFilter() {
        return new UsernameValidationFilter();
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http ) throws Exception {
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/login", "/api/register").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // Add this line
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
//                .addFilterBefore(usernameValidationFilter(), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public FilterRegistrationBean<Filter> requestWrapperFilter(){
            FilterRegistrationBean<Filter> registrationBean = new FilterRegistrationBean<>();
            registrationBean.setFilter(new RequestWrapperFilter());
            registrationBean.setOrder(Ordered.HIGHEST_PRECEDENCE);
            return registrationBean;
    }
    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Remove trailing slash from allowed origins
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));

        // Add all necessary HTTP methods
        configuration.setAllowedMethods(Arrays.asList(
                "GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"
        ));

        // Add all necessary headers
        configuration.setAllowedHeaders(Arrays.asList(
                "Authorization",
                "Content-Type",
                "Accept",
                "Origin",
                "Access-Control-Request-Method",
                "Access-Control-Request-Headers"
        ));

        // Expose headers that the client can access
        configuration.setExposedHeaders(Arrays.asList("Authorization"));

        // Allow credentials (cookies, authorization headers, etc.)
        configuration.setAllowCredentials(true);

        // Cache preflight response for 1 hour
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider(appUserDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(authenticationProvider);
    }
}