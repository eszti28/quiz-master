export interface JwtTokenPayloadModel {
  userId: number;
  userName: string;
  iat: number;
  exp: number;
}
