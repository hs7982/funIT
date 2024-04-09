package com.funit.backend.Production;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ProductionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "production_id", updatable = false)
    private int id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "role", nullable = false)
    private int role; //제작진 감독 배우

    @Column(name = "image")
    private String image;

//    @JsonIgnore
//    @ManyToMany(mappedBy = "productions")
//    private Set<MovieEntity> movies = new HashSet<>();

}
