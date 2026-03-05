import { Router } from "express";
import { mfaController } from "./mfa.module";
import { authonticateJWT } from "../../common/strategies/jwt.strategy";

const mfaRoutes = Router();

mfaRoutes.get("/setup", authonticateJWT, mfaController.generateMFASetup);
mfaRoutes.post("/verify", authonticateJWT, mfaController.verifyMFASetup);
mfaRoutes.put("/revoke", authonticateJWT, mfaController.revokeMFA);
mfaRoutes.put("/verify-login", mfaController.verifyMFAForLogin);

export default mfaRoutes;
