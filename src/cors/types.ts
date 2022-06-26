export interface IErrData {
  msg?: string;
  raise?: boolean;
}

export interface ICorsSettings {
  readonly allowedOrigins: string[];
  readonly allowedUrls: string[];
  readonly allowedPaths: string[];
  readonly allowedMethods: string[];
  readonly allowedCredentials: boolean;
}
