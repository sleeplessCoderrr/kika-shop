export interface EdgeFunctionResponse<T> {
  data: T | null;
  error: string | null;
}