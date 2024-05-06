package com.funit.backend.s3;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ImageService {

    private static final String bucketName = "funit";
    private final AmazonS3Client amazonS3Client;
    //private final ImageRepository imageRepository;

    // 이미지 여러개 업로드
    @Transactional
    public List<String> saveManyImage(ImageSaveDto saveDto, String saveDir) {
        List<String> resultList = new ArrayList<>();

        for (MultipartFile multipartFile : saveDto.getImages()) {
            String value = saveImage(multipartFile, saveDir);
            resultList.add(value);
        }

        return resultList;
    }

    // 이미지 1개 업로드
    @Transactional
    public String saveImage(MultipartFile multipartFile, String saveDir) {
        String fileName = multipartFile.getOriginalFilename();
        String FileExt = fileName.substring(fileName.lastIndexOf("."));
        String uuidName = UUID.randomUUID() + FileExt;

        if (!Objects.requireNonNull(multipartFile.getContentType()).contains("image/")) {
            throw new IllegalArgumentException("허용되지 않는 형식의 파일입니다: " + multipartFile.getContentType());
        }

        String bucketNameWithSaveDir = bucketName + saveDir;

        try {
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(multipartFile.getContentType());
            objectMetadata.setContentLength(multipartFile.getInputStream().available());

            amazonS3Client.putObject(bucketNameWithSaveDir, uuidName, multipartFile.getInputStream(), objectMetadata);

            return amazonS3Client.getUrl(bucketNameWithSaveDir, uuidName).toString();
        } catch (IOException e) {
            e.printStackTrace(); // 예외 발생 시 적절한 처리를 수행하도록 수정
            return null;
        }
//        imageRepository.save(image);
//        return image.getAccessUrl();
    }
}