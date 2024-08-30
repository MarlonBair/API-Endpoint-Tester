package com.apiloader.loader.model;

import java.util.Map;

public class ApiRequest {
    
    private String className;
    private String name;
    private Map<String, Object> body;
    
    public String getClassName() {
        return className;
    }
    public void setClassName(String className) {
        this.className = className;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Map<String, Object> getBody() {
        return body;
    }
    public void setBody(Map<String, Object> body) {
        this.body = body;
    }
}
