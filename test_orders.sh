#!/bin/bash

BASE_URL="http://localhost:5050/api/orders"

# Replace these with real IDs from your DB
USER_ID="682d37717e21261f6271a762"
PRODUCT_ID="682d36215f70a91d6c597a8f"

echo "=== CREATE ORDER ==="
CREATE_RESPONSE=$(curl -s -X POST $BASE_URL \
  -H "Content-Type: application/json" \
  -d '{"userId":"'"$USER_ID"'","items":[{"productId":"'"$PRODUCT_ID"'","name":"Test Product","price":10}],"totalAmount":10,"shippingAddress":{"name":"Jane Doe","street":"123 Main St","city":"City","state":"State","zip":"12345","country":"USA"}}')
echo $CREATE_RESPONSE

ORDER_ID=$(echo $CREATE_RESPONSE | jq -r '._id')

echo "=== GET ALL ORDERS ==="
curl -s $BASE_URL | jq

echo "=== GET ORDER BY ID ==="
curl -s $BASE_URL/$ORDER_ID | jq

echo "=== UPDATE ORDER ==="
curl -s -X PUT $BASE_URL/$ORDER_ID \
  -H "Content-Type: application/json" \
  -d '{"orderStatus":"shipped"}' | jq

echo "=== DELETE ORDER ==="
curl -s -X DELETE $BASE_URL/$ORDER_ID | jq

echo "=== GET ALL ORDERS (after delete) ==="
curl -s $BASE_URL | jq
