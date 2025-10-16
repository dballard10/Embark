/**
 * API Response types
 */

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  detail: string;
  status?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

/**
 * API Request parameters
 */
export interface PaginationParams {
  limit?: number;
  offset?: number;
}

export interface QuestQueryParams extends PaginationParams {
  tier?: number;
}

export interface ItemQueryParams extends PaginationParams {
  tier?: number;
  min_price?: number;
  max_price?: number;
}
