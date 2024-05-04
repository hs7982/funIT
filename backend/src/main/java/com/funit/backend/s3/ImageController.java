package com.funit.backend.s3;

import com.funit.backend.response.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ImageController {
    @Autowired
    ImageService imageService;

    @PostMapping("/api/image")
    public ResponseEntity<Object> uploadImage(@ModelAttribute ImageSaveDto dto) {
        String imageUrl = imageService.saveImage(dto.getImage(), "/postContentImage");
        return ResponseHandler.responseBuilder(
                HttpStatus.CREATED,
                "이미지가 다음 위치에 성공적으로 업로드되었습니다.",
                imageUrl
        );
    }
}
