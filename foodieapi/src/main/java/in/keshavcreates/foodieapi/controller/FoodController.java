package in.keshavcreates.foodieapi.controller;

import com.cloudinary.Cloudinary;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import in.keshavcreates.foodieapi.io.FoodRequest;
import in.keshavcreates.foodieapi.io.FoodResponse;
import in.keshavcreates.foodieapi.service.FoodService;
import in.keshavcreates.foodieapi.service.FoodServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @PostMapping("")
    public FoodResponse addFood(@RequestPart("food") String foodString,
                                @RequestPart("file") MultipartFile file) {
        ObjectMapper objectMapper = new ObjectMapper();
        FoodRequest request = null;
        try {
            request = objectMapper.readValue(foodString, FoodRequest.class);
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST , "Invalid JSON format");
        }
        return foodService.addFood(request , file);

    }

    @GetMapping("/getAll")
    public List<FoodResponse> getAll(){
        return foodService.getAll();
    }

    @GetMapping("/getFood/{id}")
    public FoodResponse getFoodById(@PathVariable("id") String id){
        return foodService.getFoodById(id);
    }

    @DeleteMapping("/deleteFood/{id}")
    public void deleteFoodById(@PathVariable("id") String id){
        foodService.deleteFood(id);
    }

}
