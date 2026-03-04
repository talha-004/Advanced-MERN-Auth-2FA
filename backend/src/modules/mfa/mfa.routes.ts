import { Router } from "express";
import { mfaController } from "./mfa.module";
import { authonticateJWT } from "../../common/strategies/jwt.strategy";

const mfaRoutes = Router();

mfaRoutes.get("/all", authonticateJWT, mfaController.generateMFASetup);

export default mfaRoutes;
