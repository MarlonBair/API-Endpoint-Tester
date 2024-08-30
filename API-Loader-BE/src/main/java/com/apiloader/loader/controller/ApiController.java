package com.apiloader.loader.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.apiloader.loader.model.ApiRequest;
import com.apiloader.loader.service.ApiService;

import reactor.core.publisher.Mono;

@Controller
@RequestMapping("/api")
public class ApiController {
    
    @Autowired
    private ApiService apiService; 
    
    @PostMapping
    public Mono<ResponseEntity<String>> makeRequests(@RequestBody List<ApiRequest> body) {
        return apiService.forwardRequestAll(body);
     }
      
}
