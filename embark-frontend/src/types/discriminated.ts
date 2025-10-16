/**
 * Discriminated unions for type-safe state management
 */

// ============================================================================
// Quest States
// ============================================================================

export type QuestState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: any }
  | { status: "error"; error: Error };

export type QuestActionState =
  | { type: "starting"; questId: string }
  | { type: "completing"; questId: string }
  | { type: "abandoning"; questId: string }
  | { type: "idle" };

// ============================================================================
// Item States
// ============================================================================

export type ItemState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: any }
  | { status: "error"; error: Error };

export type ItemActionState =
  | { type: "purchasing"; itemId: string }
  | { type: "idle" };

// ============================================================================
// API Request States
// ============================================================================

export type ApiRequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

export function isLoading<T>(
  state: ApiRequestState<T>
): state is { status: "loading" } {
  return state.status === "loading";
}

export function isSuccess<T>(
  state: ApiRequestState<T>
): state is { status: "success"; data: T } {
  return state.status === "success";
}

export function isError<T>(
  state: ApiRequestState<T>
): state is { status: "error"; error: Error } {
  return state.status === "error";
}

export function isIdle<T>(
  state: ApiRequestState<T>
): state is { status: "idle" } {
  return state.status === "idle";
}

// ============================================================================
// Modal States
// ============================================================================

export type ModalState<T = void> =
  | { type: "closed" }
  | { type: "open"; data?: T };

export function isModalOpen<T>(
  state: ModalState<T>
): state is { type: "open"; data?: T } {
  return state.type === "open";
}

export function isModalClosed<T>(
  state: ModalState<T>
): state is { type: "closed" } {
  return state.type === "closed";
}

// ============================================================================
// Form States
// ============================================================================

export type FormState<T> =
  | { status: "idle" }
  | { status: "validating" }
  | { status: "submitting" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

export function isFormSubmitting<T>(state: FormState<T>): boolean {
  return state.status === "submitting";
}

export function isFormSuccess<T>(
  state: FormState<T>
): state is { status: "success"; data: T } {
  return state.status === "success";
}

export function isFormError<T>(
  state: FormState<T>
): state is { status: "error"; error: Error } {
  return state.status === "error";
}

// ============================================================================
// Data Fetch Result (for better error handling)
// ============================================================================

export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export function success<T>(value: T): Result<T> {
  return { ok: true, value };
}

export function failure<E = Error>(error: E): Result<never, E> {
  return { ok: false, error };
}

export function isSuccess<T, E>(
  result: Result<T, E>
): result is { ok: true; value: T } {
  return result.ok === true;
}

export function isFailure<T, E>(
  result: Result<T, E>
): result is { ok: false; error: E } {
  return result.ok === false;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Create an idle API state
 */
export function createIdleState<T>(): ApiRequestState<T> {
  return { status: "idle" };
}

/**
 * Create a loading API state
 */
export function createLoadingState<T>(): ApiRequestState<T> {
  return { status: "loading" };
}

/**
 * Create a success API state
 */
export function createSuccessState<T>(data: T): ApiRequestState<T> {
  return { status: "success", data };
}

/**
 * Create an error API state
 */
export function createErrorState<T>(error: Error): ApiRequestState<T> {
  return { status: "error", error };
}
