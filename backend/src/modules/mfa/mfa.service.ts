import { Request } from "express";
import speakeasy from "speakeasy";
import { UnauthorizedException } from "../../common/utils/catch-errors";

export class MfaService {
  public async generateMFASetup(req: Request) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException("User not authorized");
    }

    if (user.userPreferences.enable2FA) {
      return {
        message: "MFA alreadt enabled",
      };
    }

    let secretKey = user.userPreferences.twoFactorSecret;

    if (!secretKey) {
      const secret = speakeasy.generateSecret({ name: "AdvanceAuth" });
      secretKey = secret.base32;
      user.userPreferences.twoFactorSecret = secretKey;
      await user.save();
    }

    const url = speakeasy.otpauthURL({
      secret: secretKey,
      label: `${user.name}`,
      issuer: "advnaceauth.com",
      encoding: "base32",
    });
  }
}
