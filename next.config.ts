import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["sanity", "@sanity/ui", "@sanity/vision", "next-sanity"],
  webpack: (config) => {
    // sanity/@sanity/ui statically import `Activity` and `useEffectEvent`
    // from "react". Webpack's CJS/ESM interop analysis for this re-export
    // chain reports them as "not exported" even though react 19.2+ exports
    // both at runtime. This is a build-time false positive, so we downgrade
    // the check to a warning instead of a hard compile error.
    config.module.parser = {
      ...config.module.parser,
      javascript: {
        ...config.module.parser?.javascript,
        exportsPresence: "warn",
        importExportsPresence: "warn",
        reexportExportsPresence: "warn",
        strictExportPresence: false,
      },
    };
    return config;
  },
};

export default nextConfig;
