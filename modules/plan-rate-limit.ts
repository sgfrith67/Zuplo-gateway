import {
  CustomRateLimitDetails,
  ZuploContext,
  ZuploRequest,
} from "@zuplo/runtime";

/**
 * Per-consumer rate limits driven by the `plan` value stored in the API key
 * consumer's metadata. Update the tiers below to match your commercial plans.
 */
const PLAN_LIMITS: Record<
  string,
  { requestsAllowed: number; timeWindowMinutes: number }
> = {
  trial: { requestsAllowed: 10, timeWindowMinutes: 1 },
  standard: { requestsAllowed: 120, timeWindowMinutes: 1 },
  enterprise: { requestsAllowed: 1200, timeWindowMinutes: 1 },
};

const DEFAULT_LIMIT = PLAN_LIMITS.trial;

export function planRateLimitKey(
  request: ZuploRequest,
  context: ZuploContext,
): CustomRateLimitDetails | undefined {
  const sub = request.user?.sub;
  if (!sub) {
    // Unauthenticated requests should never reach here, but fall back to IP.
    return { key: "anonymous", ...DEFAULT_LIMIT };
  }

  const plan = (request.user?.data as { plan?: string })?.plan ?? "trial";
  const limit = PLAN_LIMITS[plan] ?? DEFAULT_LIMIT;

  context.log.debug(`rate limiting consumer '${sub}' on plan '${plan}'`);

  return { key: sub, ...limit };
}
