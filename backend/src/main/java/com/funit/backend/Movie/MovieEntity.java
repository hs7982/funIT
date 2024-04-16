package com.funit.backend.Movie;

import com.funit.backend.Genre.GenreEntity;
import com.funit.backend.Production.ProductionEntity;
import com.funit.backend.User.UserEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class MovieEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "movie_id", updatable = false)
    private int id;

    @Column(name = "title", nullable = false)
    private String title;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private UserEntity user;

    @Column(name = "detail", columnDefinition = "MEDIUMTEXT")
    private String detail;

    @Column(name = "target_credit", nullable = false, columnDefinition = "BIGINT")
    private long targetCredit;

    @Column(name = "status", nullable = false, columnDefinition = "INT DEFAULT 1")
    private int status; // 진행중, 성공, 실패

    @Column(name = "thumbnail_image")
    private String thumbnailImage;

    @CreationTimestamp
    @Column(name = "create_date")
    private LocalDateTime createDate;

    @UpdateTimestamp
    @Column(name = "update_date")
    private LocalDateTime updateDate;

    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;

    @ManyToMany
    @JoinTable(name = "movie_genre",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id"))
    private Set<GenreEntity> genres = new HashSet<>();


    @ManyToMany
    @JoinTable(name = "movie_production",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "production_id"))
    private Set<ProductionEntity> productions = new HashSet<>();


}
