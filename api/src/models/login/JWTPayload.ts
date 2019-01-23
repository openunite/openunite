interface JWTPayload {
  sub: number;
  name: string;
  iat: number;
  role: string;
}

export default JWTPayload;
