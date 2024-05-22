import { z } from "zod";

const MoneySetSchema = z.object({
  shop_money: z.object({
    amount: z.string(),
    currency_code: z.string(),
  }),
  presentment_money: z.object({
    amount: z.string(),
    currency_code: z.string(),
  }),
});

const ClientDetailsSchema = z.object({
  accept_language: z.string(),
  browser_height: z.union([z.null(), z.number()]),
  browser_ip: z.string(),
  browser_width: z.union([z.null(), z.number()]),
  session_hash: z.union([z.null(), z.string()]),
  user_agent: z.string(),
});

const AddressSchema = z.object({
  first_name: z.string(),
  address1: z.string(),
  phone: z.string(),
  city: z.string(),
  zip: z.string(),
  province: z.string(),
  country: z.string(),
  last_name: z.string(),
  address2: z.string().or(z.null()),
  company: z.string().or(z.null()),
  latitude: z.number().or(z.undefined()).or(z.null()),
  longitude: z.number().or(z.undefined()).or(z.null()),
  name: z.string(),
  country_code: z.string(),
  province_code: z.string(),
});

const MoneySet = z.object({
  shop_money: z.object({
    amount: z.string(),
    currency_code: z.string(),
  }),
  presentment_money: z.object({
    amount: z.string(),
    currency_code: z.string(),
  }),
});

const TaxLineSchema = z.object({
  channel_liable: z.boolean(),
  price: z.string(),
  price_set: MoneySet,
  rate: z.number(),
  title: z.string(),
});

const CustomerSchema = z.object({
  id: z.number(),
  email: z.string(),
  accepts_marketing: z.boolean().or(z.undefined()),
  created_at: z.string(),
  updated_at: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  state: z.string(),
  note: z.null().or(z.string()),
  verified_email: z.boolean(),
  multipass_identifier: z.null().or(z.string()),
  tax_exempt: z.boolean(),
  phone: z.null().or(z.string()),
  email_marketing_consent: z.object({
    state: z.string(),
    opt_in_level: z.string(),
    consent_updated_at: z.string().or(z.null()),
  }),
  sms_marketing_consent: z.null(),
  tags: z.string(),
  currency: z.string(),
  accepts_marketing_updated_at: z.string().or(z.undefined()),
  marketing_opt_in_level: z.string().or(z.undefined()),
  tax_exemptions: z.array(z.any()),
  admin_graphql_api_id: z.string(),
  default_address: AddressSchema,
});

export const LineItemSchema = z.object({
  id: z.number(),
  admin_graphql_api_id: z.string(),
  attributed_staffs: z.array(z.any()), // Consider defining a more specific schema if possible
  fulfillable_quantity: z.number(),
  fulfillment_service: z.string(),
  fulfillment_status: z.string().or(z.null()),
  gift_card: z.boolean(),
  grams: z.number(),
  name: z.string(),
  price: z.string(),
  price_set: MoneySet,
  product_exists: z.boolean(),
  product_id: z.number(),
  properties: z.array(z.any()), // Consider defining a more specific schema if possible
  quantity: z.number(),
  requires_shipping: z.boolean(),
  sku: z.string(),
  taxable: z.boolean(),
  title: z.string(),
  total_discount: z.string(),
  total_discount_set: MoneySet,
  variant_id: z.number(),
  variant_inventory_management: z.string(),
  variant_title: z.string().nullable(),
  vendor: z.string(),
  tax_lines: z.array(TaxLineSchema), // Assuming TaxLine is another custom schema
  duties: z.array(z.any()), // Consider defining a more specific schema if possible
  discount_allocations: z.array(z.any()), // Consider defining a more specific schema if possible
});

const ShippingLineSchema = z.object({
  id: z.number(),
  carrier_identifier: z.string().or(z.null()),
  code: z.string(),
  discounted_price: z.string(),
  discounted_price_set: MoneySetSchema,
  phone: z.union([z.null(), z.string()]),
  price: z.string(),
  price_set: MoneySetSchema,
  requested_fulfillment_service_id: z.union([z.null(), z.string()]),
  source: z.string().or(z.null()),
  title: z.string(),
  tax_lines: z.array(TaxLineSchema),
  discount_allocations: z.array(z.any()),
});

export const ShopifyOrderSchema = z.object({
  id: z.number(),
  admin_graphql_api_id: z.string(),
  app_id: z.number(),
  browser_ip: z.string().or(z.null()),
  buyer_accepts_marketing: z.boolean(),
  cancel_reason: z.union([z.null(), z.string()]),
  cancelled_at: z.union([z.null(), z.string()]),
  cart_token: z.string().or(z.null()),
  checkout_id: z.number().or(z.null()),
  checkout_token: z.string().or(z.null()),
  client_details: ClientDetailsSchema.or(z.null()),
  closed_at: z.string().or(z.null()),
  confirmation_number: z.string(),
  confirmed: z.boolean(),
  contact_email: z.string(),
  created_at: z.string(),
  currency: z.string(),
  current_subtotal_price: z.string(),
  current_subtotal_price_set: MoneySetSchema,
  current_total_additional_fees_set: z.null(), // If there's a structure, define it
  current_total_discounts: z.string(),
  current_total_discounts_set: MoneySetSchema,
  current_total_duties_set: z.null(), // If there's a structure, define it
  current_total_price: z.string(),
  current_total_price_set: MoneySetSchema,
  current_total_tax: z.string(),
  current_total_tax_set: MoneySetSchema,
  customer_locale: z.string().or(z.null()),
  device_id: z.union([z.null(), z.number()]),
  discount_codes: z.array(z.any()), // Define more specifically if possible
  email: z.string(),
  estimated_taxes: z.boolean(),
  financial_status: z.string(),
  fulfillment_status: z.string().or(z.null()),
  landing_site: z.string().or(z.null()),
  landing_site_ref: z.union([z.null(), z.string()]),
  location_id: z.union([z.null(), z.number()]),
  merchant_of_record_app_id: z.null(), // If there's a specific type, define it
  name: z.string(),
  note: z.union([z.null(), z.string()]),
  note_attributes: z.array(z.any()), // Define more specifically if possible
  order_number: z.number(),
  order_status_url: z.string(),
  original_total_additional_fees_set: z.null(), // If there's a structure, define it
  original_total_duties_set: z.null(), // If there's a structure, define it
  payment_gateway_names: z.array(z.string()),
  phone: z.union([z.null(), z.string()]),
  po_number: z.union([z.null(), z.string()]),
  presentment_currency: z.string(),
  processed_at: z.string(),
  reference: z.string().or(z.null()),
  referring_site: z.string().or(z.null()),
  source_identifier: z.string().or(z.null()),
  source_name: z.string(),
  source_url: z.union([z.null(), z.string()]),
  subtotal_price: z.string(),
  subtotal_price_set: MoneySetSchema,
  tags: z.string(),
  tax_exempt: z.boolean(),
  tax_lines: z.array(TaxLineSchema), // Define TaxLineSchema separately
  taxes_included: z.boolean(),
  test: z.boolean(),
  token: z.string(),
  total_discounts: z.string(),
  total_discounts_set: MoneySetSchema,
  total_line_items_price: z.string(),
  total_line_items_price_set: MoneySetSchema,
  total_outstanding: z.string(),
  total_price: z.string(),
  total_price_set: MoneySetSchema,
  total_shipping_price_set: MoneySetSchema,
  total_tax: z.string(),
  total_tax_set: MoneySetSchema,
  total_tip_received: z.string(),
  total_weight: z.number(),
  updated_at: z.string(),
  user_id: z.null(), // If there's a specific type, define it
  billing_address: AddressSchema.or(z.null()), // Define AddressSchema separately
  customer: CustomerSchema.or(z.null()), // Define CustomerSchema separately
  discount_applications: z.array(z.any()), // Define more specifically if possible
  fulfillments: z.array(z.any()), // Define more specifically if possible
  line_items: z.array(LineItemSchema), // Define Line
  payment_terms: z.null(), // If there's a specific type, define it
  refunds: z.array(z.any()), // Define more specifically if possible
  shipping_address: AddressSchema, // Define AddressSchema separately
  shipping_lines: z.array(ShippingLineSchema), // Define more specifically if possible
});
