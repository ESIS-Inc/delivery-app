package com.devops.deliveryapp.controller;

import com.devops.deliveryapp.model.Delivery;
import com.devops.deliveryapp.repository.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/deliveries")
public class DeliveryController {

    @Autowired
    private DeliveryRepository deliveryRepository;

    // Get all deliveries
    @GetMapping
    public List<Delivery> getAllDeliveries() {
        return deliveryRepository.findAll();
    }

    // Create a new delivery
    @PostMapping
    public Delivery createDelivery(@RequestBody Delivery delivery) {
        return deliveryRepository.save(delivery);
    }

    // Get a single delivery by ID
    @GetMapping("/{id}")
    public ResponseEntity<Delivery> getDeliveryById(@PathVariable(value = "id") Long deliveryId) {
        Optional<Delivery> delivery = deliveryRepository.findById(deliveryId);
        if(delivery.isPresent()) {
            return ResponseEntity.ok().body(delivery.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Update a delivery's status
    @PutMapping("/{id}")
    public ResponseEntity<Delivery> updateDelivery(@PathVariable(value = "id") Long deliveryId, @RequestBody Delivery deliveryDetails) {
        Optional<Delivery> optionalDelivery = deliveryRepository.findById(deliveryId);
        if(optionalDelivery.isPresent()) {
            Delivery delivery = optionalDelivery.get();
            delivery.setStatus(deliveryDetails.getStatus());
            final Delivery updatedDelivery = deliveryRepository.save(delivery);
            return ResponseEntity.ok(updatedDelivery);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a delivery
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDelivery(@PathVariable(value = "id") Long deliveryId) {
        Optional<Delivery> delivery = deliveryRepository.findById(deliveryId);
        if(delivery.isPresent()) {
            deliveryRepository.delete(delivery.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}