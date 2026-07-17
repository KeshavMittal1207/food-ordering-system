package in.keshavcreates.foodieapi.filters;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class UsernameValidationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        if (request.getServletPath().equals("/api/register") && request.getMethod().equalsIgnoreCase("POST")) {
            System.out.println("UsernameValidationFilter triggered ");

            CachedBodyHttpServletRequest wrappedRequest = new CachedBodyHttpServletRequest(request);

            try {
                String body = new String(wrappedRequest.getCachedBody(), StandardCharsets.UTF_8);
                ObjectMapper mapper = new ObjectMapper();
                JsonNode node = mapper.readTree(body);
                
                if (node == null || !node.has("email")) {
                    sendErrorResponse(response, "Email is required");
                    return;
                }
                
                String username = node.get("email").asText();
                System.out.println("Email received: " + username);

                if (username != null &&
                        username.equals(username.toLowerCase()) &&
                        username.length() > 10 &&
                        username.endsWith("@gmail.com")) {
                    System.out.println("Email is valid");
                    filterChain.doFilter(wrappedRequest, response);
                } else {
                    System.out.println("Invalid email");
                    sendErrorResponse(response, "Invalid email. Must be lowercase, more than 10 characters, and end with @gmail.com");
                }
            } catch (Exception e) {
                System.out.println("Error parsing request body: " + e.getMessage());
                sendErrorResponse(response, "Malformed request body");
            }
        } else {
            filterChain.doFilter(request, response);
        }
    }

    private void sendErrorResponse(HttpServletResponse response, String message) throws IOException {
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding(StandardCharsets.UTF_8.name());
        
        String jsonError = String.format("{\"status\":400,\"error\":\"Validation failed\",\"details\":{\"email\":\"%s\"}}", message);
        response.getWriter().write(jsonError);
    }
}
