export const REQUEST_LIMIT_PER_SEC = 1;

export interface SuccessResponse<T> {
  readonly result: T;
}

export interface ErrorResponse {
  errorName: string;
  errorMessage: string;
}

export interface RequestInfo {
  requestTimeSecQueue: number[];
  requestTimeMinQueue: number[];
}
