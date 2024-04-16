package com.funit.backend.Like;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LikeRepository extends JpaRepository<LikeEntity, Integer> {
    //TODO: 영화 id 받아서 그 id에 해당하는 좋아요 갯수만 표시하도록 수정

    @Query(value = "select count(*) from LikeEntity l where l.movie.id = :movieId")
    Integer getCount(Integer movieId);

}
