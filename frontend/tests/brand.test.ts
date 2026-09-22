import { describe, expect, it } from "vitest";

import { BRAND } from "@/config/brand";

describe("RetentionOS public identity", () => {
  it("keeps project ownership separate from the demo account", () => {
    expect(BRAND.ownerName).toBe("Parmod");
    expect(BRAND.ownerTitle).toBe("AI/ML Engineer");
    expect(BRAND.demoAccountEmail).toBe("demo@example.com");
    expect(BRAND.demoAccountName).toBe("Demo User");
    expect(BRAND.demoAccountName).not.toBe(BRAND.ownerName);
  });

  it("keeps demo scale separate from the live-demo action", () => {
    expect(BRAND.projectScale).toBe(
      "10K synthetic users · ~238K product events",
    );
    expect(BRAND.projectScale.toLowerCase()).not.toContain("demo");
  });
});
