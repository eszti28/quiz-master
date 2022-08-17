export interface JwtTokenPayloadModel {
  userId: number;
  userName: string;
  admin: number;
  iat: number;
  exp: number;
}
