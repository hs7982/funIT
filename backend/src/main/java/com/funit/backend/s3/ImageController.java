package com.funit.backend.s3;

import com.funit.backend.user.domain.AuthUser;
import com.funit.backend.user.domain.User;
import com.funit.backend.utils.response.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/image")
public class ImageController {
    private final ImageService imageService;

    @PostMapping()
    public ResponseEntity<Object> uploadImage(@AuthUser User user, @ModelAttribute ImageSaveDto dto) {
        String imageUrl = imageService.saveImage(dto.getImage(), "postContentImage");
        return ResponseHandler.responseBuilder(
                HttpStatus.CREATED,
                "이미지가 다음 위치에 성공적으로 업로드되었습니다.",
                imageUrl
        );
    }
}
