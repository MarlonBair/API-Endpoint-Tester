package com.apiloader.loader.model;

import java.util.List;

public class ClientRequest {
    private List<ApiRequest> requests;
    private Long rateLimitSize;
    private Long rateLimitDuration;

    public List<ApiRequest> getRequests() {
        return requests;
    }
    public void setRequests(List<ApiRequest> requests) {
        this.requests = requests;
    }
    public Long getRateLimitSize() {
        return rateLimitSize;
    }
    public void setRateLimitSize(Long rateLimitSize) {
        this.rateLimitSize = rateLimitSize;
    }
    public Long getRateLimitDuration() {
        return rateLimitDuration;
    }
    public void setRateLimitDuration(Long rateLimitDuration) {
        this.rateLimitDuration = rateLimitDuration;
    }
}
