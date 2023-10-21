/**
 * ErrorCode를 정의해둡니다. 퍈의를 위해, Http Code 기반으로 만들어져 있습니다.
 */
export enum ErrorCodeType {
  UNKNOWN = 500,
  DATA_NOT_FOUND = 404,
  DATA_CONFLICT = 409,
  DATA_INVALID = 400,
}
