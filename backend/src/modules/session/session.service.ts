import { NotFoundException } from "../../common/utils/catch-errors";
import SessionModel from "../../database/models/session.model";

export class SessionService {
  public async getAllSession(userId: string) {
    const sessions = await SessionModel.find({
      userId,
      expiredAt: { $gt: Date.now() },
    })
      .select("_id userId userAgent createdAt expiredAt")
      .sort({ createdAt: -1 });

    return { sessions };
  }

  public async getSessionById(sessionId: string) {
    const sessions = await SessionModel.findById(sessionId)
      .populate("userId")
      .select("-expiresAt");

    if (!sessions) {
      throw new NotFoundException("Session not found");
    }

    const { userId: user } = sessions;

    return {
      user,
    };

    return { sessions };
  }

  public async deleteSession(sessionId: string, userId: string) {
    const deleteSession = await SessionModel.findByIdAndDelete({
      _id: sessionId,
      userId: userId,
    });

    if (!deleteSession) {
      throw new NotFoundException("Session not found");
    }

    return;
  }
}
