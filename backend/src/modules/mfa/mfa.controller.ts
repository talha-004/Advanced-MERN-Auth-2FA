import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import { MfaService } from "./mfa.service";

export class MfaController {
  private mfaService: MfaService;
  constructor(mfaService: MfaService) {
    this.mfaService = MfaService;
  }

  public generateMFASetup = asyncHandler(
    async (req: Request, res: Response) => {
      await this.mfaService.generateMFASetup(req);
      // return res.status(HTTPSTATUS.OK).json({
      //   message: "Retreived all session successfully",
      //   sessions: modifySessions,
      // });
    },
  );
}
