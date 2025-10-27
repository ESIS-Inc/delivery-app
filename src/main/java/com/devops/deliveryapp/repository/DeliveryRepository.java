package com.devops.deliveryapp.repository;

import com.devops.deliveryapp.model.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    // Spring Data JPA automatically creates methods like findAll(), findById(), save(), deleteById()
}