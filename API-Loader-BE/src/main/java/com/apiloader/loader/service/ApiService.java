package com.apiloader.loader.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import com.apiloader.loader.model.ApiRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import reactor.core.publisher.Mono;

@Service
public class ApiService {
    
    @Value("${API_KEY}")
    private String apiKey;

    @Value("${BASE_URL}")
    private String baseUrl;

    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    public ApiService(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder.baseUrl(baseUrl).build();
        this.objectMapper = new ObjectMapper();
    }

    // Get status code of response
    public int forwardRequest(String className, String name, Map<String, Object> body) {
        String url = className + "/" + name;
        RestClient.RequestBodySpec requestSpec = restClient.post()
                .uri(url)
                .header("x-auth-apikey", apiKey)
                .header("x-auth-scheme", "api-token")
                .header("Content-Type", "application/json")
                .header("accept", "application/json");

        try {
            if (body != null && !body.isEmpty()) {
                String jsonBody = objectMapper.writeValueAsString(body);
                requestSpec.body(jsonBody);
             }
        } catch (JsonProcessingException e) {
            System.err.println("JSON Processing Exception");
        }

        try {
           int statusCode = requestSpec.retrieve().toBodilessEntity().getStatusCode().value();
           return statusCode;
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            return e.getStatusCode().value();
        } catch (RestClientException e) {
            System.err.println("RestClient Error in forwardRequest: " + e.getMessage());
            return 500; // Internal Server Error for other RestClient exceptions
        } catch (Exception e) {
            System.err.println("Unexpected Error in forwardRequest: " + e.getMessage());
            return 500; // Internal Server Error for unexpected exceptions
        }
    }

    public Mono<ResponseEntity<String>> forwardRequestAll(List<ApiRequest> requests)  {
        return Mono.fromCallable(() -> {
            Map<String, Integer> results = new HashMap<>();
            ExecutorService executor = Executors.newFixedThreadPool(10);
            List<List<ApiRequest>> batches = new ArrayList<>();

            // Batches for rate limit
            for (int i = 0; i < requests.size(); i += 10) {
                batches.add(requests.subList(i, Math.min(i + 10, requests.size())));
            }

            for (List<ApiRequest> batch : batches) {
                List<CompletableFuture<Void>> futures = batch.stream()
                    .map(request -> CompletableFuture.runAsync(() -> {
                        int statusCode = forwardRequest(request.getClassName(), request.getName(), request.getBody());
                        synchronized (results) {
                            results.put(request.getName(), statusCode);
                        }
                    }, executor))
                    .collect(Collectors.toList());

                CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();

                // Wait for 1 second before processing the next batch
                Thread.sleep(1000);
            }

            executor.shutdown();
 
            try {
                String json = new ObjectMapper().writeValueAsString(results);
                return ResponseEntity.ok(json);
            } catch (JsonProcessingException e) {
                return ResponseEntity.status(500)
                    .body("Error processing the request: " + e.getMessage());
            }
        });
    }
}
