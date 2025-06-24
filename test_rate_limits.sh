#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Base URL of your API
BASE_URL="http://localhost:5050/api"

# Test configurations for development environment
GENERAL_REQUESTS=1000  # Development limit
AUTH_REQUESTS=20      # Development limit
ADMIN_REQUESTS=200    # Development limit
PRODUCT_CREATE_REQUESTS=50  # Development limit
ORDER_CREATE_REQUESTS=20    # Development limit
PASSWORD_RESET_REQUESTS=10  # Development limit
REGISTRATION_REQUESTS=10    # Development limit
SEARCH_REQUESTS=100   # Development limit
API_KEY_REQUESTS=200  # Development limit

# Admin token for testing admin endpoints
ADMIN_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODJlODVkYjFjNDA2ZjVmOWVkMjA0YTAiLCJlbWFpbCI6ImFkbWludXNlckBleGFtcGxlLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc0Nzg4MDQ1MiwiZXhwIjoxNzQ4NDg1MjUyfQ.M8Lj3AB63JguXzt59jU7nQEwjcJuORd9RCGfGYOBsWs"

# Function to check if rate limited
check_rate_limit() {
    local endpoint=$1
    local token=$2
    local response
    
    if [ -n "$token" ]; then
        response=$(curl -s -w "\n%{http_code}" -H "Authorization: Bearer $token" "$BASE_URL$endpoint")
    else
        response=$(curl -s -w "\n%{http_code}" "$BASE_URL$endpoint")
    fi
    
    local status_code=$(echo "$response" | tail -n1)
    [ "$status_code" -eq 429 ]
    return $?
}

# Function to wait for rate limit to reset
wait_for_reset() {
    local endpoint=$1
    local token=$2
    local wait_time=$3
    local message=$4
    
    echo -e "${YELLOW}$message${NC}"
    echo -e "${YELLOW}Waiting $wait_time seconds... (Press Ctrl+C to skip)${NC}"
    
    # Check every 5 seconds if rate limit is reset
    for i in $(seq 1 $((wait_time/5))); do
        if ! check_rate_limit "$endpoint" "$token"; then
            echo -e "${GREEN}Rate limit reset detected! Continuing...${NC}"
            return 0
        fi
        sleep 5
        echo -n "."
    done
    echo
}

echo -e "${YELLOW}=== Testing Rate Limits (Development Environment) ===${NC}"
echo "----------------------------------------"

# Function to make requests and count results
make_requests() {
    local endpoint=$1
    local total_requests=$2
    local token=$3
    local success_count=0
    local rate_limited_count=0
    local start_time=$(date +%s)

    echo -e "${YELLOW}Testing $endpoint (Limit: $total_requests requests)${NC}"
    echo "----------------------------------------"

    # Check if already rate limited
    if check_rate_limit "$endpoint" "$token"; then
        echo -e "${RED}Already rate limited! Please wait for the rate limit to reset.${NC}"
        return 1
    fi

    for i in $(seq 1 $total_requests); do
        if [ -n "$token" ]; then
            response=$(curl -s -w "\n%{http_code}" -H "Authorization: Bearer $token" "$BASE_URL$endpoint")
        else
            response=$(curl -s -w "\n%{http_code}" "$BASE_URL$endpoint")
        fi
        
        status_code=$(echo "$response" | tail -n1)
        body=$(echo "$response" | sed '$d')
        
        if [ "$status_code" -eq 429 ]; then
            rate_limited_count=$((rate_limited_count + 1))
            echo -e "${RED}Request $i: Rate Limited (429)${NC}"
            break
        else
            success_count=$((success_count + 1))
            echo -e "${GREEN}Request $i: Success ($status_code)${NC}"
        fi
        
        # Add a small delay to prevent overwhelming the server
        sleep 0.1
    done

    local end_time=$(date +%s)
    local duration=$((end_time - start_time))

    echo "----------------------------------------"
    echo -e "${YELLOW}Results for $endpoint:${NC}"
    echo -e "${GREEN}Successful requests: $success_count${NC}"
    echo -e "${RED}Rate limited requests: $rate_limited_count${NC}"
    echo -e "Duration: ${duration}s"
    echo "----------------------------------------"
}

# Test General Limiter (Products endpoint)
echo -e "\n${YELLOW}1. Testing General Rate Limiter${NC}"
make_requests "/products" $GENERAL_REQUESTS
wait_for_reset "/products" "" 900 "Waiting for general rate limit to reset (15 minutes)"

# Test Auth Limiter (Login endpoint)
echo -e "\n${YELLOW}2. Testing Auth Rate Limiter${NC}"
make_requests "/auth/login" $AUTH_REQUESTS
wait_for_reset "/auth/login" "" 300 "Waiting for auth rate limit to reset (5 minutes)"

# Test Admin Limiter (Users endpoint)
echo -e "\n${YELLOW}3. Testing Admin Rate Limiter${NC}"
make_requests "/users" $ADMIN_REQUESTS $ADMIN_TOKEN
wait_for_reset "/users" "$ADMIN_TOKEN" 3600 "Waiting for admin rate limit to reset (1 hour)"

# Test Product Creation Limiter
echo -e "\n${YELLOW}4. Testing Product Creation Rate Limiter${NC}"
make_requests "/products/create" $PRODUCT_CREATE_REQUESTS $ADMIN_TOKEN
wait_for_reset "/products/create" "$ADMIN_TOKEN" 300 "Waiting for product creation rate limit to reset (5 minutes)"

# Test Order Creation Limiter
echo -e "\n${YELLOW}5. Testing Order Creation Rate Limiter${NC}"
make_requests "/orders/create" $ORDER_CREATE_REQUESTS $ADMIN_TOKEN
wait_for_reset "/orders/create" "$ADMIN_TOKEN" 300 "Waiting for order creation rate limit to reset (5 minutes)"

# Test Password Reset Limiter
echo -e "\n${YELLOW}6. Testing Password Reset Rate Limiter${NC}"
make_requests "/auth/reset-password" $PASSWORD_RESET_REQUESTS
wait_for_reset "/auth/reset-password" "" 300 "Waiting for password reset rate limit to reset (5 minutes)"

# Test Registration Limiter
echo -e "\n${YELLOW}7. Testing Registration Rate Limiter${NC}"
make_requests "/auth/register" $REGISTRATION_REQUESTS
wait_for_reset "/auth/register" "" 3600 "Waiting for registration rate limit to reset (1 hour)"

# Test Search Limiter
echo -e "\n${YELLOW}8. Testing Search Rate Limiter${NC}"
make_requests "/search" $SEARCH_REQUESTS
wait_for_reset "/search" "" 10 "Waiting for search rate limit to reset (10 seconds)"

# Test API Key Limiter
echo -e "\n${YELLOW}9. Testing API Key Rate Limiter${NC}"
make_requests "/external" $API_KEY_REQUESTS
wait_for_reset "/external" "" 10 "Waiting for API key rate limit to reset (10 seconds)"

# Test Rate Limit Statistics (Admin only)
echo -e "\n${YELLOW}10. Testing Rate Limit Statistics Endpoint${NC}"
stats_response=$(curl -s -H "Authorization: Bearer $ADMIN_TOKEN" "$BASE_URL/admin/rate-limits")
echo "Rate Limit Statistics:"
echo "$stats_response" | python -m json.tool

echo -e "\n${GREEN}All tests completed!${NC}" 