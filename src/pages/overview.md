# GPT Shopify Definitions

## Step 1: Retrieve and Enhance Product Descriptions

### Process Overviews

- **Fetch ASI Descriptions**: Use `trpc.asi.inventoryItems.get` to retrieve product descriptions from ASI.
- **Enhance with GPT**: Pass the descriptions to the GPT API via `trpc.openai.definitions.get` for enhancement.
- **Display Results**: Show the GPT-enhanced descriptions for review.

### Involved APIs

- `trpc.asi.inventoryItems.get`
- `trpc.openai.definitions.get`
- `trpc.shopify.products.get`

## Step 2: User Approval of Enhanced Descriptions

- **Manual Review**: Allow the user to review and approve the GPT-enhanced product descriptions individually.

## Step 3: Update Shopify with Approved Descriptions

### Process Overview

- **Update Descriptions**: Use `trpc.shopify.products.update` to upload the approved GPT descriptions to Shopify.

### Involved API

- `trpc.shopify.products.update`
