import { apiClient, handleApiError } from "./api/client";
import { API_ENDPOINTS } from "./api/config";
import type { Item, UserItem } from "../types/item.types";
import type { ItemQueryParams } from "./api/types";

/**
 * Item Service - Handles all item-related API calls
 */
export class ItemService {
  /**
   * Fetch all available items
   */
  static async fetchAll(params?: ItemQueryParams): Promise<Item[]> {
    try {
      const response = await apiClient.get<Item[]>(API_ENDPOINTS.ITEMS, {
        params: { limit: 100, ...params },
      });
      return response.data;
    } catch (error) {
      handleApiError(error, "Failed to fetch items");
    }
  }

  /**
   * Fetch item by ID
   */
  static async fetchById(id: string): Promise<Item> {
    try {
      const response = await apiClient.get<Item>(API_ENDPOINTS.ITEM_BY_ID(id));
      return response.data;
    } catch (error) {
      handleApiError(error, "Failed to fetch item");
    }
  }

  /**
   * Fetch user's items
   */
  static async fetchUserItems(userId: string): Promise<UserItem[]> {
    try {
      const response = await apiClient.get<UserItem[]>(
        API_ENDPOINTS.USER_ITEMS(userId)
      );
      return response.data;
    } catch (error) {
      handleApiError(error, "Failed to fetch user items");
    }
  }

  /**
   * Purchase an item
   */
  static async purchase(
    userId: string,
    itemId: string
  ): Promise<{
    user_item: UserItem;
    new_glory: number;
    item_price: number;
  }> {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.PURCHASE_ITEM(userId, itemId)
      );
      return response.data;
    } catch (error) {
      handleApiError(error, "Failed to purchase item");
    }
  }

  /**
   * Create a new item (admin)
   */
  static async create(
    itemData: Omit<Item, "id" | "created_at">
  ): Promise<Item> {
    try {
      const response = await apiClient.post<Item>(
        API_ENDPOINTS.ITEMS,
        itemData
      );
      return response.data;
    } catch (error) {
      handleApiError(error, "Failed to create item");
    }
  }

  /**
   * Update an item (admin)
   */
  static async update(
    itemId: string,
    itemData: Partial<Omit<Item, "id" | "created_at">>
  ): Promise<Item> {
    try {
      const response = await apiClient.patch<Item>(
        API_ENDPOINTS.ITEM_BY_ID(itemId),
        itemData
      );
      return response.data;
    } catch (error) {
      handleApiError(error, "Failed to update item");
    }
  }

  /**
   * Delete an item (admin)
   */
  static async delete(itemId: string): Promise<void> {
    try {
      await apiClient.delete(API_ENDPOINTS.ITEM_BY_ID(itemId));
    } catch (error) {
      handleApiError(error, "Failed to delete item");
    }
  }
}

// Export functions for backward compatibility
export const fetchAllItems = ItemService.fetchAll;
export const fetchItemById = ItemService.fetchById;
export const fetchUserItems = ItemService.fetchUserItems;
export const purchaseItem = ItemService.purchase;
export const createItem = ItemService.create;
export const updateItem = ItemService.update;
export const deleteItem = ItemService.delete;
