import "next-auth";

declare module "next-auth" {
  /**
   * Extends the built-in session types with the accessToken property.
   */
  interface Session {
    accessToken?: string | unknown;
    refreshToken?: string | unknown;
  }

  interface User {
    accessToken?: string | unknown;
    refreshToken?: string | unknown;
  }
}
