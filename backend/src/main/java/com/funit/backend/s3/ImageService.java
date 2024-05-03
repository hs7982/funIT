package com.funit.backend.s3;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageService {

    private static String bucketName = "funit";

    private final AmazonS3Client amazonS3Client;
    //private final ImageRepository imageRepository;

    // 이미지 여러개 업로드
    @Transactional
    public List<String> saveManyImage(ImageSaveDto saveDto) {
        List<String> resultList = new ArrayList<>();

        for (MultipartFile multipartFile : saveDto.getImages()) {
            String value = saveImage(multipartFile);
            resultList.add(value);
        }

        return resultList;
    }

    // 이미지 1개 업로드
    @Transactional
    public String saveImage(MultipartFile multipartFile) {
        String uuidName = UUID.randomUUID().toString() + "-" + multipartFile.getOriginalFilename();
//        Image image = new Image(originalName);
//        String filename = image.getStoredName();

        try {
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(multipartFile.getContentType());
            objectMetadata.setContentLength(multipartFile.getInputStream().available());

            amazonS3Client.putObject(bucketName, uuidName, multipartFile.getInputStream(), objectMetadata);

            String accessUrl = amazonS3Client.getUrl(bucketName, uuidName).toString();
            //image.setAccessUrl(accessUrl);
            return accessUrl;
        } catch (IOException e) {
            e.printStackTrace(); // 예외 발생 시 적절한 처리를 수행하도록 수정
            return null;
        }
//        imageRepository.save(image);
//        return image.getAccessUrl();
    }
}