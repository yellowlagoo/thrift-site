#!/bin/bash

BASE_URL="http://localhost:5050/api/users"

echo "=== CREATE USER ==="
CREATE_RESPONSE=$(curl -s -X POST $BASE_URL \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser4@example.com","passwordHash":"hashedpassword123","name":"Test User 4"}')
echo $CREATE_RESPONSE

USER_ID=$(echo $CREATE_RESPONSE | jq -r '._id')

echo "=== GET ALL USERS ==="
curl -s $BASE_URL | jq

echo "=== GET USER BY ID ==="
curl -s $BASE_URL/$USER_ID | jq

echo "=== UPDATE USER ==="
curl -s -X PUT $BASE_URL/$USER_ID \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated User"}' | jq

echo "=== DELETE USER ==="
curl -s -X DELETE $BASE_URL/$USER_ID | jq

echo "=== GET ALL USERS (after delete) ==="
curl -s $BASE_URL | jq
