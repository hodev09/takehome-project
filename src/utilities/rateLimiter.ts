// rateLimiter.ts
import rateLimit from "express-rate-limit";

// Rate limit for 1 request per second (1000 ms)
export const perSecondLimiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 1, // Limit each IP to 1 request per second
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    res
      .status(429)
      .send({ message: "Too many requests, please wait a second before trying again." });
  },
});

// Rate limit for 100 requests per day (86400000 ms)
export const perDayLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 100, // Limit each IP to 100 requests per day
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res
      .status(429)
      .send({ message: "You have exceeded the 100 requests in 24 hours limit." });
  },
});
