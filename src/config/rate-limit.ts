//rate limit configuration
export const rateLimitConfig = {
  windowMs: 60 * 1000,
  max: 20,
  message: 'Too many requests from this IP',
};
