#!/bin/bash

API_URL="http://localhost:5050"
EMAIL="testuser12@example.com"
PASSWORD="testpassword123"
NAME="Test User"
PRODUCT_ID="682d36215f70a91d6c597a8f"

# Register user
echo "Registering user..."
curl -s -X POST "$API_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\",\"name\":\"$NAME\"}"

echo -e "\nLogging in..."
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | grep -o '[^"]*$')

if [ -z "$TOKEN" ]; then
  echo "Failed to get token. Response: $LOGIN_RESPONSE"
  exit 1
fi

echo "Token: $TOKEN"

echo -e "\nAdding to cart..."
curl -s -X POST "$API_URL/cart" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"productId\":\"$PRODUCT_ID\",\"quantity\":1}"

echo -e "\nGetting cart..."
curl -s -X GET "$API_URL/cart" \
  -H "Authorization: Bearer $TOKEN"

echo -e "\nUpdating quantity to 2..."
curl -s -X PUT "$API_URL/cart" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"productId\":\"$PRODUCT_ID\",\"quantity\":2}"

echo -e "\nGetting cart..."
curl -s -X GET "$API_URL/cart" \
  -H "Authorization: Bearer $TOKEN"

echo -e "\nRemoving from cart..."
curl -s -X DELETE "$API_URL/cart/$PRODUCT_ID" \
  -H "Authorization: Bearer $TOKEN"

echo -e "\nGetting cart..."
curl -s -X GET "$API_URL/cart" \
  -H "Authorization: Bearer $TOKEN"

echo -e "\nAdding to cart again..."
curl -s -X POST "$API_URL/cart" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"productId\":\"$PRODUCT_ID\",\"quantity\":1}"

echo -e "\nClearing cart..."
curl -s -X DELETE "$API_URL/cart" \
  -H "Authorization: Bearer $TOKEN"

echo -e "\nGetting cart..."
curl -s -X GET "$API_URL/cart" \
  -H "Authorization: Bearer $TOKEN"

echo -e "\nAll cart API tests completed."
