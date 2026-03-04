import { MfaController } from "./mfa.controller";
import { MfaService } from "./mfa.service";

const mfaService = new MfaService();
const mfaController = new MfaController(MfaService);

export { mfaService, mfaController };
