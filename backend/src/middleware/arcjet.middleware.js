import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
    try{
        const decision = await aj.protect(req);

        if(decision.isDenied()) {
            if(decision.reason.isRateLimit()){
                return res.status(429).json({ message: "Too many requests - Rate limit exceeded" });
            

        } else if (decision.reason.isBot()) {
            return res.status(403).json({ message: "Bot access denied" });

        } else {
            return res.status(403).json({ message: "Access denied by security policy" });
        }
    }
        // check for soofed bots that try to bypass bot detection by mimicking human behavior
        if (decision.results.some(isSoofedBot)){
            return res.status(403).json({
                error: "Soofed bot detected",
                 message: "Malicious bot activity detected",
                 });
        }

        next();
        } catch (error) {
            console.error("Arcjet Protection Error:", error);
            next(); // Allow request to proceed in case of error to avoid blocking legitimate traffic
        }
    };
