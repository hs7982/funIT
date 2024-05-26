package com.funit.backend.comment.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.funit.backend.movie.domain.Movie;
import com.funit.backend.user.domain.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id", updatable = false)
    private int id;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    @JsonIgnore
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "movie_id", referencedColumnName = "movie_id")
    private Movie movie;

    @Column(name = "content")
    private String content;

    @UpdateTimestamp
    @Column(name = "write_date", nullable = false)
    private LocalDateTime writeDate;
}
