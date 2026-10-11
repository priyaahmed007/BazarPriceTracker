export type SocialProviderId = "google" | "github";

export interface SocialProviderInfo {
  id: SocialProviderId;
  label: string;
  icon: string;
  enabled: boolean;
}

/**
 * Returns the social providers that are actually configured through
 * environment variables. Only the sign in / sign up server components import
 * this, so the credentials are never shipped to the browser.
 */
export function getSocialProviders(): SocialProviderInfo[] {
  return [
    {
      id: "google",
      label: "Google",
      icon: "🌐",
      enabled: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    },
    {
      id: "github",
      label: "GitHub",
      icon: "🐙",
      enabled: Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
    },
  ];
}