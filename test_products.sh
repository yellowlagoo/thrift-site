#!/bin/bash

BASE_URL="http://localhost:5050/api/products"

echo "=== CREATE PRODUCT ==="
CREATE_RESPONSE=$(curl -s -X POST $BASE_URL \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","description":"A test product","categoryId":"682d2e23283a1fe471ccc1c1","size":"M","brand":"BrandX","condition":"New","images":[],"status":"available","featured":false}')
echo $CREATE_RESPONSE

PRODUCT_ID=$(echo $CREATE_RESPONSE | grep -o '"_id":"[^"]*' | grep -o '[^"]*$')

echo "=== GET ALL PRODUCTS ==="
curl -s $BASE_URL | jq

echo "=== GET PRODUCT BY ID ==="
curl -s $BASE_URL/$PRODUCT_ID | jq

echo "=== UPDATE PRODUCT ==="
curl -s -X PUT $BASE_URL/$PRODUCT_ID \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Product","description":"Updated description"}' | jq

echo "=== DELETE PRODUCT ==="
curl -s -X DELETE $BASE_URL/$PRODUCT_ID | jq

echo "=== GET ALL PRODUCTS (after delete) ==="
curl -s $BASE_URL | jq
