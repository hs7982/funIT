package com.funit.backend.movie.domain;

import com.funit.backend.genre.domain.Genre;
import com.funit.backend.production.domain.Production;
import com.funit.backend.user.domain.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "movie_id", updatable = false)
    private int id;

    @Column(name = "title", nullable = false)
    private String title;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

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

    @ManyToMany(cascade = CascadeType.REMOVE)
    @JoinTable(name = "movie_genre",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id"))
    private List<Genre> genres = new ArrayList<>();


    @ManyToMany
    @JoinTable(name = "movie_production",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "production_id"))
    private List<Production> productions = new ArrayList<>();


}
