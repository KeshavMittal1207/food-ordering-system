package in.keshavcreates.foodieapi.service;

import in.keshavcreates.foodieapi.io.ReviewRequest;
import in.keshavcreates.foodieapi.io.ReviewResponse;

import java.util.List;

public interface ReviewService {
    ReviewResponse addReview(ReviewRequest request);
    List<ReviewResponse> getReviewsForFood(String foodId);
    Double getAverageRating(String foodId);
}
