package com.apiloader.loader.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.apiloader.loader.model.ClientRequest;
import com.apiloader.loader.service.ApiService;

import reactor.core.publisher.Mono;

@Controller
@RequestMapping("/api")
public class ApiController {
    
    @Autowired
    private ApiService apiService; 
    
    @PostMapping
    public Mono<ResponseEntity<String>> makeRequests(@RequestBody ClientRequest body) {
        return apiService.forwardRequestAll(body.getRequests(), body.getRateLimitDuration(), body.getRateLimitSize());
     }
      
}
