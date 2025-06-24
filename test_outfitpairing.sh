#!/bin/bash

BASE_URL="http://localhost:5050/api/outfits"

# Replace these with real product IDs
TOP_PRODUCT_ID="682d36215f70a91d6c597a8f"
BOTTOM_PRODUCT_ID="682d478f2bcf500ed900a045"

echo "=== CREATE OUTFIT PAIRING ==="
CREATE_RESPONSE=$(curl -s -X POST $BASE_URL \
  -H "Content-Type: application/json" \
  -d '{"topProductId":"'"$TOP_PRODUCT_ID"'","bottomProductId":"'"$BOTTOM_PRODUCT_ID"'","featured":true}')
echo $CREATE_RESPONSE

OUTFIT_ID=$(echo $CREATE_RESPONSE | grep -o '"_id":"[^"]*' | grep -o '[^"]*$')

echo "=== GET ALL OUTFIT PAIRINGS ==="
curl -s $BASE_URL | jq

echo "=== GET OUTFIT PAIRING BY ID ==="
curl -s $BASE_URL/$OUTFIT_ID | jq

echo "=== DELETE OUTFIT PAIRING ==="
curl -s -X DELETE $BASE_URL/$OUTFIT_ID | jq

echo "=== GET ALL OUTFIT PAIRINGS (after delete) ==="
curl -s $BASE_URL | jq
