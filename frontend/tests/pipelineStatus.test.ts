import { describe, expect, it } from "vitest";

import { getPipelineDisplayStatus } from "@/lib/pipelineStatus";
import type { EventPipelineStatus } from "@/types/api";

function status(
  overrides: Partial<EventPipelineStatus>,
): EventPipelineStatus {
  return {
    status: "fresh",
    last_persisted_at: null,
    latest_event_time: null,
    last_stream_id: null,
    freshness_seconds: null,
    pending: 0,
    lag: 0,
    backlog: 0,
    ...overrides,
  };
}

describe("getPipelineDisplayStatus", () => {
  it("treats a stale but drained demo pipeline as idle", () => {
    expect(
      getPipelineDisplayStatus(
        status({
          status: "stale",
          freshness_seconds: 39_240,
        }),
      ),
    ).toBe("idle");
  });

  it("keeps stale when work remains queued or pending", () => {
    expect(
      getPipelineDisplayStatus(
        status({
          status: "stale",
          backlog: 3,
          pending: 1,
          lag: 2,
        }),
      ),
    ).toBe("stale");
  });

  it("preserves fresh and unknown states", () => {
    expect(
      getPipelineDisplayStatus(status({ status: "fresh" })),
    ).toBe("fresh");

    expect(
      getPipelineDisplayStatus(status({ status: "unknown" })),
    ).toBe("unknown");
  });
});
