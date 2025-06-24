#!/bin/bash

# Base URL of your API
BASE_URL="http://localhost:5050/api"

# Test configurations
GENERAL_REQUESTS=105  # Test general limiter (100 limit)
AUTH_REQUESTS=6      # Test auth limiter (5 limit)
ADMIN_REQUESTS=51    # Test admin limiter (50 limit)

# Admin token for testing admin endpoints
ADMIN_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODJlODVkYjFjNDA2ZjVmOWVkMjA0YTAiLCJlbWFpbCI6ImFkbWludXNlckBleGFtcGxlLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc0Nzg4MDQ1MiwiZXhwIjoxNzQ4NDg1MjUyfQ.M8Lj3AB63JguXzt59jU7nQEwjcJuORd9RCGfGYOBsWs"

echo "=== Testing Rate Limits ==="
echo "----------------------------------------"

# Function to make requests and count results
make_requests() {
    local endpoint=$1
    local total_requests=$2
    local token=$3
    local success_count=0
    local rate_limited_count=0

    echo "Testing $endpoint (Limit: $total_requests requests)"
    echo "----------------------------------------"

    for i in $(seq 1 $total_requests); do
        if [ -n "$token" ]; then
            response=$(curl -s -w "\n%{http_code}" -H "Authorization: Bearer $token" "$BASE_URL$endpoint")
        else
            response=$(curl -s -w "\n%{http_code}" "$BASE_URL$endpoint")
        fi
        
        status_code=$(echo "$response" | tail -n1)
        body=$(echo "$response" | sed '$d')
        
        echo "Request $i: Status Code $status_code"
        
        if [ "$status_code" -eq 429 ]; then
            rate_limited_count=$((rate_limited_count + 1))
            echo "Rate limited! Response: $body"
        else
            success_count=$((success_count + 1))
        fi
        
        sleep 0.1
    done

    echo "----------------------------------------"
    echo "Results for $endpoint:"
    echo "Successful requests: $success_count"
    echo "Rate limited requests: $rate_limited_count"
    echo "----------------------------------------"
}

# Test General Limiter (Products endpoint)
echo "1. Testing General Rate Limiter"
make_requests "/products" $GENERAL_REQUESTS

echo "Waiting 15 minutes for rate limit to reset..."
echo "You can press Ctrl+C to skip the wait and continue with the next test"
sleep 900  # 15 minutes

# Test Auth Limiter (Login endpoint)
echo "2. Testing Auth Rate Limiter"
make_requests "/auth/login" $AUTH_REQUESTS

echo "Waiting 1 hour for auth rate limit to reset..."
echo "You can press Ctrl+C to skip the wait and continue with the next test"
sleep 3600  # 1 hour

# Test Admin Limiter (Users endpoint)
echo "3. Testing Admin Rate Limiter"
make_requests "/users" $ADMIN_REQUESTS "$ADMIN_TOKEN"

echo "=== All Tests Completed ===" 