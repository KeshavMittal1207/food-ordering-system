    package in.keshavcreates.foodieapi.service;

    import com.cloudinary.Cloudinary;
    import com.cloudinary.utils.ObjectUtils;
    import in.keshavcreates.foodieapi.entity.FoodEntity;
    import in.keshavcreates.foodieapi.exception.ResourceNotFoundException;
    import in.keshavcreates.foodieapi.io.FoodRequest;
    import in.keshavcreates.foodieapi.io.FoodResponse;
    import in.keshavcreates.foodieapi.io.UploadedImage;
    import in.keshavcreates.foodieapi.repository.FoodRepository;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;
    import org.springframework.web.multipart.MultipartFile;

    import java.io.File;
    import java.io.IOException;
    import java.util.List;
    import java.util.Map;
    import java.util.UUID;
    import java.util.stream.Collectors;

    @Service
    public class FoodServiceImpl implements FoodService{

        @Autowired
        private FoodRepository foodRepository;

        @Autowired
        private Cloudinary cloudinary;

        public UploadedImage uploadFile(MultipartFile multipartFile) {
            try {
                File file = File.createTempFile(UUID.randomUUID().toString() , multipartFile.getOriginalFilename());
                multipartFile.transferTo(file);

                Map uploadResult = cloudinary.uploader().upload(file , ObjectUtils.emptyMap());
                file.deleteOnExit();
                String publicId = uploadResult.get("public_id").toString();
                String imageUrl = uploadResult.get("secure_url").toString();
                return new UploadedImage(imageUrl , publicId);
            } catch (IOException e) {
                throw new IllegalStateException("Image upload failed", e);
            }
        }
        public FoodResponse addFood(FoodRequest request , MultipartFile file){
            FoodEntity foodEntity  = convertToEntity(request);
            UploadedImage uploadedImage = uploadFile(file);
            foodEntity.setImageUrl(uploadedImage.getImageUrl());
            foodEntity.setImagePublicId(uploadedImage.getPublicId());
            FoodEntity foodEntity1 = foodRepository.save(foodEntity);
            return convertToResponse(foodEntity1);
        }
        @Override
        public List<FoodResponse> getAll() {
            List<FoodEntity> foodEntities= foodRepository.findAll();
            return foodEntities.stream().map(entity -> convertToResponse(entity)).collect(Collectors.toList());
            }

        public FoodResponse getFoodById(String id) {
            FoodEntity entity = foodRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Food not found for id: " + id));
            return convertToResponse(entity);
        }


        public FoodEntity convertToEntity(FoodRequest request){
            return FoodEntity.builder()
                    .name(request.getName())
                    .description(request.getDescription())
                    .category(request.getCategory())
                    .price(request.getPrice())
                    .build();
        }
        public FoodResponse convertToResponse(FoodEntity foodEntity){
            return FoodResponse.builder()
                    .id(foodEntity.getId())
                    .name(foodEntity.getName())
                    .price(foodEntity.getPrice())
                    .imageUrl((foodEntity.getImageUrl()))
                    .category(foodEntity.getCategory())
                    .description(foodEntity.getDescription())
                    .build();
        }
        public boolean deleteFile(String publicId){
            try {
                Map result = cloudinary.uploader().destroy(publicId,ObjectUtils.emptyMap());
                return "ok".equals(result.get("result"));
            } catch (IOException e) {
                e.printStackTrace();
                return false;
            }
        }
        public void deleteFood(String id) {
            FoodEntity foodEntity = foodRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Food not found for id: " + id));
            boolean isFileDelete = deleteFile(foodEntity.getImagePublicId());
            if (isFileDelete) {
                foodRepository.deleteById(id);
            } else {
                throw new IllegalStateException("Unable to delete food image from Cloudinary");
            }
        }
    }
