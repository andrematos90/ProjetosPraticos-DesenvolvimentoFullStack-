package com.api.cars.services;

import com.api.cars.dto.CarsDto;
import com.api.cars.models.CarsModel;
import com.api.cars.repositories.CarsRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CarsService {
    final CarsRepository carsRepository;
    public CarsService(CarsRepository carsRepository){
        this.carsRepository = carsRepository;
    }
   @Transactional
    public CarsModel save(CarsModel carsModel) {
        return carsRepository.save(carsModel);
    }

    public List<CarsModel> findAll() {
        return carsRepository.findAll();
    }

    public Optional<CarsModel> findById(UUID id) {
        return carsRepository.findById(id);
    }

    @Transactional
    public void delete(CarsModel carsModel) {
        carsRepository.delete(carsModel);
    }
}
