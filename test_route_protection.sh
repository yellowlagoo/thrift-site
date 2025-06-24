#!/bin/bash

# Replace these with real tokens and IDs from your database
USER_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODJlODQ5YjFjNDA2ZjVmOWVkMjA0OWIiLCJlbWFpbCI6InRlc3R1c2VyNUBleGFtcGxlLmNvbSIsImlhdCI6MTc0Nzg3OTA2NywiZXhwIjoxNzQ4NDgzODY3fQ.78kzDQg_N5YRn1KoykFqbj6YYTpNEeM6pCyJj1iGAWw"
ADMIN_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODJlODVkYjFjNDA2ZjVmOWVkMjA0YTAiLCJlbWFpbCI6ImFkbWludXNlckBleGFtcGxlLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc0Nzg4MDQ1MiwiZXhwIjoxNzQ4NDg1MjUyfQ.M8Lj3AB63JguXzt59jU7nQEwjcJuORd9RCGfGYOBsWs"
USER_ID="682e849b1c406f5f9ed2049b"
ADMIN_ID="682e85db1c406f5f9ed204a0"
PRODUCT_ID="682d36215f70a91d6c597a8f"
CATEGORY_ID="682e8c319b6c43e9b616f8be"
ORDER_ID="682d3ab2889466735b83b46e"
OUTFIT_ID="682d3aac889466735b83b46b"

BASE_URL="http://localhost:5050/api"

echo "=== USERS ROUTE PROTECTION ==="
echo "GET all users (no token):"
curl -s $BASE_URL/users | jq
echo "GET all users (user token):"
curl -s -H "Authorization: Bearer $USER_TOKEN" $BASE_URL/users | jq
echo "GET all users (admin token):"
curl -s -H "Authorization: Bearer $ADMIN_TOKEN" $BASE_URL/users | jq

echo "GET user by ID (other user token):"
curl -s -H "Authorization: Bearer $USER_TOKEN" $BASE_URL/users/$ADMIN_ID | jq
echo "GET user by ID (self token):"
curl -s -H "Authorization: Bearer $USER_TOKEN" $BASE_URL/users/$USER_ID | jq
echo "GET user by ID (admin token):"
curl -s -H "Authorization: Bearer $ADMIN_TOKEN" $BASE_URL/users/$USER_ID | jq

echo "=== PRODUCTS ROUTE PROTECTION ==="
echo "POST product (no token):"
curl -s -X POST $BASE_URL/products -H "Content-Type: application/json" -d '{"name":"Test"}' | jq
echo "POST product (user token):"
curl -s -X POST $BASE_URL/products -H "Authorization: Bearer $USER_TOKEN" -H "Content-Type: application/json" -d '{"name":"Test"}' | jq
echo "POST product (admin token):"
curl -s -X POST $BASE_URL/products \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "A test product",
    "price": 10,
    "categoryId": "'$CATEGORY_ID'"
  }' | jq

echo "=== CATEGORIES ROUTE PROTECTION ==="
echo "DELETE category (user token):"
curl -s -X DELETE $BASE_URL/categories/$CATEGORY_ID -H "Authorization: Bearer $USER_TOKEN" | jq
echo "DELETE category (admin token):"
curl -s -X DELETE $BASE_URL/categories/$CATEGORY_ID -H "Authorization: Bearer $ADMIN_TOKEN" | jq

echo "=== ORDERS ROUTE PROTECTION ==="
echo "GET all orders (user token):"
curl -s -H "Authorization: Bearer $USER_TOKEN" $BASE_URL/orders | jq
echo "GET all orders (admin token):"
curl -s -H "Authorization: Bearer $ADMIN_TOKEN" $BASE_URL/orders | jq
echo "GET order by ID (other user token):"
curl -s -H "Authorization: Bearer $USER_TOKEN" $BASE_URL/orders/$ORDER_ID | jq
echo "GET order by ID (admin token):"
curl -s -H "Authorization: Bearer $ADMIN_TOKEN" $BASE_URL/orders/$ORDER_ID
