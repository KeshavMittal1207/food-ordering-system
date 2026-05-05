package in.keshavcreates.foodieapi.service;

import in.keshavcreates.foodieapi.entity.FoodEntity;
import in.keshavcreates.foodieapi.io.FoodRequest;
import in.keshavcreates.foodieapi.io.FoodResponse;
import in.keshavcreates.foodieapi.io.UploadedImage;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FoodService {
    UploadedImage uploadFile(MultipartFile file);

    FoodResponse addFood(FoodRequest request , MultipartFile file);

    List<FoodResponse> getAll();

    FoodResponse getFoodById(String id);

    boolean deleteFile(String publicId);

    void deleteFood(String id);



}
