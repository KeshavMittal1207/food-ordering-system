package in.keshavcreates.foodieapi.filters;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class UsernameValidationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        if (request.getServletPath().equals("/api/register") && request.getMethod().equalsIgnoreCase("POST")) {
            System.out.println("UsernameValidationFilter triggered ");

            ContentCachingRequestWrapper wrapper = new ContentCachingRequestWrapper (request);
            filterChain.doFilter(wrapper, response);

            String body = new String(wrapper.getContentAsByteArray(), StandardCharsets.UTF_8);
            ObjectMapper mapper = new ObjectMapper();
            JsonNode node = mapper.readTree(body);
            String username = node.get("email").asText();
            System.out.println("Email received: " + username);

            if (username.equals(username.toLowerCase()) &&
                        username.length() > 10 &&
                        username.endsWith("@gmail.com")) {
                System.out.println("Email is valid ");

                filterChain.doFilter(wrapper, response);
            } else {
                System.out.println("Invalid email");

                response.setStatus(HttpStatus.BAD_REQUEST.value());

            }
        } else {
            filterChain.doFilter(request
                    , response);
        }
    }
}
