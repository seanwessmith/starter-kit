"use client";

import { useState, useEffect } from "react";
import { InternalShopifyProduct } from "@/routers/shopify/products";
import { trpc } from "../utils/trpc";

export interface GptDefinitions {
  [sku: string]: {
    chatGPTDescription: string;
    approved: boolean;
  };
}

export function useInputSkus(skus: string[]) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [products, setProducts] = useState<InternalShopifyProduct[]>([]);
  const [inventory, setInventory] = useState<
    {
      sku: string;
      price?: string | undefined;
      overview?: string | undefined;
      technicalSpecifications?: string | undefined;
      qty_by_branch?: Record<string | number, number> | undefined;
    }[]
  >([]);
  const [gptDefinitions, setGptDefinitions] = useState<GptDefinitions>({});
  const [gptQueryEnabled, setGptQueryEnabled] = useState(false);

  // Get ASI definitions
  const asiDefinitionsQuery = trpc.asi.inventoryItems.get.useQuery(
    {
      skus,
      discountedPriceOnly: false,
    },
    {
      enabled: skus.length > 0 && !inventory.length,
    }
  );

  // Get Shopify products
  const productsQuery = trpc.shopify.products.get.useQuery(undefined, {
    enabled: !products.length,
  });

  // Get GPT definitions
  // Update the enabled state for GPT query
  useEffect(() => {
    const validItems = inventory.filter(
      (item) => item.overview && item.technicalSpecifications
    );
    setGptQueryEnabled(
      validItems.length > 0 &&
        Object.keys(gptDefinitions).length !== validItems.length
    );
  }, [inventory, gptDefinitions]);
  const validAsiDefinitions =
    inventory.filter(
      (inventoryItem) =>
        inventoryItem.overview && inventoryItem.technicalSpecifications
    ) || [];
  const gptDefinitionsQuery = trpc.openai.definitions.get.useQuery(
    {
      definitions: validAsiDefinitions.map(
        (validAsiDefinition) =>
          `${validAsiDefinition.overview} ${validAsiDefinition.technicalSpecifications}`
      ),
    },
    {
      enabled: gptQueryEnabled,
    }
  );

  useEffect(() => {
    const newGptDefinitions = inventory.reduce(
      (results: GptDefinitions, item, index) => {
        const sku = item.sku;
        results[sku] = {
          chatGPTDescription:
            gptDefinitionsQuery.data?.definitions?.[index]?.content || "",
          approved: false,
        };
        return results;
      },
      {}
    );
    setGptDefinitions(newGptDefinitions);
  }, [gptDefinitionsQuery.data?.definitions]);

  useEffect(() => {
    if (asiDefinitionsQuery.data?.inventory) {
      setInventory(asiDefinitionsQuery.data.inventory);
    }
  }, [asiDefinitionsQuery.data?.inventory]);

  useEffect(() => {
    if (productsQuery.data?.products) {
      setProducts(productsQuery.data.products);
    }
  }, [asiDefinitionsQuery.data?.inventory]);

  useEffect(() => {
    if (asiDefinitionsQuery.isError) {
      setError(asiDefinitionsQuery.error.message);
    } else if (productsQuery.isError) {
      setError(productsQuery.error.message);
    } else if (gptDefinitionsQuery.isError) {
      setError(gptDefinitionsQuery.error.message);
    }
  }, [asiDefinitionsQuery, productsQuery, gptDefinitions]);

  return {
    asiDefinitions: asiDefinitionsQuery.data?.inventory || [],
    shopifyProducts: productsQuery.data?.products || [],
    gptDefinitions,
    asiDefinitionsLoading: asiDefinitionsQuery.isLoading,
    gptDefinitionsLoading: gptDefinitionsQuery.isLoading,
    useInputSkusError: error,
  };
}

export function uploadShopifyDescriptions(
  gptDefinitions: {
    id: string;
    body_html: string;
  }[]
) {
  const updateProductsQuery = trpc.shopify.products.update.useMutation();
  if (
    gptDefinitions.length > 0 &&
    !updateProductsQuery.isPending &&
    !updateProductsQuery.isSuccess &&
    !updateProductsQuery.isError
  ) {
    updateProductsQuery.mutate(gptDefinitions);
  }
  return {
    uploadShopifyDescriptionsLoading: updateProductsQuery.isPending,
  };
}
