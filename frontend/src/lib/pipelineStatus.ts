import type { EventPipelineStatus } from "@/types/api";

export type PipelineDisplayStatus =
  | "fresh"
  | "idle"
  | "stale"
  | "unknown";

export function getPipelineDisplayStatus(
  pipeline: EventPipelineStatus,
): PipelineDisplayStatus {
  if (
    pipeline.status === "stale" &&
    pipeline.backlog === 0 &&
    pipeline.pending === 0 &&
    pipeline.lag === 0
  ) {
    return "idle";
  }

  return pipeline.status;
}
