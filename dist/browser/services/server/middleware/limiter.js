import rateLimit from 'express-rate-limit';
// Rate Limiting Middleware
var limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 500,
    handler: function (req, res) {
        res.status(429).json({ message: 'Too many requests, please try again later.' });
    }
});
export { limiter };
//# sourceMappingURL=limiter.js.map