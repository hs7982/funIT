package com.funit.backend.Credit;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CreditRepository extends JpaRepository<CreditEntity, Integer> {
}
