// common/utils/jwt.ts

import jwt, { SignOptions } from "jsonwebtoken";
import { SessionDocument } from "../../database/models/session.model";
import { UserDocument } from "../../database/models/user.model";
import { config } from "../../config/app.config";

/**
 * ===============================
 * Payload Types
 * ===============================
 */

export type AccessTokenPayload = {
  userId: UserDocument["_id"];
  sessionId: SessionDocument["_id"];
};

export type RefreshTokenPayload = {
  sessionId: SessionDocument["_id"];
};

/**
 * ===============================
 * Sign Access Token
 * ===============================
 */

export const signAccessToken = (payload: AccessTokenPayload): string => {
  return jwt.sign(payload, config.JWT.SECRET, {
    audience: "user",
    expiresIn: config.JWT.EXPIRES_IN as any,
  });
};

/**
 * ===============================
 * Sign Refresh Token
 * ===============================
 */

export const signRefreshToken = (payload: RefreshTokenPayload): string => {
  return jwt.sign(payload, config.JWT.REFRESH_SECRET, {
    audience: "user",
    expiresIn: config.JWT.REFRESH_EXPIRES_IN as any,
  });
};

/**
 * ===============================
 * Verify Access Token
 * ===============================
 */

export const verifyAccessToken = (token: string): AccessTokenPayload => {
  try {
    const decoded = jwt.verify(token, config.JWT.SECRET);

    if (typeof decoded === "string") {
      throw new Error("Invalid access token payload");
    }

    return decoded as AccessTokenPayload;
  } catch (error) {
    throw new Error("Invalid or expired access token");
  }
};

/**
 * ===============================
 * Verify Refresh Token
 * ===============================
 */

export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  try {
    const decoded = jwt.verify(token, config.JWT.REFRESH_SECRET);

    if (typeof decoded === "string") {
      throw new Error("Invalid refresh token payload");
    }

    return decoded as RefreshTokenPayload;
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};
