export interface MagentoCart {
  entity_id: number;
  store_id: number;
  created_at: Date;
  updated_at: Date;
  converted_at: Date | null;
  is_active: boolean;
  is_virtual: boolean;
  is_multi_shipping: boolean;
  items_count: number;
  items_qty: number;
  orig_order_id: number;
  store_to_base_rate: number;
  store_to_quote_rate: number;
  base_currency_code: string;
  store_currency_code: string;
  quote_currency_code: string;
  grand_total: number;
  base_grand_total: number;
  checkout_method: string;
  customer_id: number;
  customer_tax_class_id: number;
  customer_group_id: number;
  customer_email: string;
  customer_prefix: string;
  customer_firstname: string;
  customer_middlename: string;
  customer_lastname: string;
  customer_suffix: string;
  customer_dob: string;
  customer_gender: string;
  customer_note: string;
  customer_note_notify: boolean;
  customer_is_guest: boolean;
  remote_ip: string;
  applied_rule_ids: number[];
  reserved_order_id: number;
  password_hash: string;
  coupon_code: string;
  global_currency_code: string;
  base_to_global_rate: number;
  base_to_quote_rate: number;
  customer_taxvat: number;
  subtotal: number;
  base_subtotal: number;
  subtotal_with_discount: number;
  base_subtotal_with_discount: number;
  is_changed: boolean;
  trigger_recollect: boolean;
  ext_shipping_info: number; //todo
  gift_message_id: number;
  is_persistent: boolean;
  customer_balance_amount_used: number;
  base_customer_bal_amount_used: number;
  use_customer_balance: number;
  gift_cards: boolean;
  gift_cards_amount: number;
  base_gift_cards_amount: number;
  gift_cards_amount_used: number;
  base_gift_cards_amount_used: number;
  // gw_id: number;
  // gw_allow_gift_receipt: number;
  // gw_add_card: number;
  // gw_base_price: number;
  // gw_price: number;
  // gw_items_base_price: number;
  // gw_items_price: number;
  // gw_card_base_price: number;
  // gw_card_price: number;
  // gw_base_tax_amount: number;
  // gw_tax_amount: number;
  // gw_items_base_tax_amount: number;
  // gw_items_tax_amount: number;
  // gw_card_base_tax_amount: number;
  // gw_card_tax_amount: number;
  // use_reward_points: number;
  // reward_points_balance: number;
  // base_reward_currency_amount: number;
  // reward_currency_amount: number;
  // hubspot_user_token: number;
  // auctaneapi_discounts: number;
  // base_store_credit_virtual_amount: number;
  // store_credit_amount_used: number;
  // base_store_credit_amount_used: number;
  // use_store_credit: number;
}