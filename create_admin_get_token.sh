#!/bin/bash

BASE_URL="http://localhost:5050/api/auth"
EMAIL="adminuser@example.com"
PASSWORD="adminuser"
NAME="Admin User"

echo "=== Registering new user ==="
REGISTER_RESPONSE=$(curl -s -X POST $BASE_URL/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\",\"name\":\"$NAME\", \"isAdmin\":true}")

echo "Register response:"
echo $REGISTER_RESPONSE

echo "=== Logging in as new user ==="
LOGIN_RESPONSE=$(curl -s -X POST $BASE_URL/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

echo "Login response:"
echo $LOGIN_RESPONSE

TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')

echo "=== JWT Token for $EMAIL ==="
echo $TOKEN
