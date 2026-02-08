import { add } from "date-fns";

export const thirtyDaysFromNow = (): Date =>
  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

export const fortyFiveMinutesFromNow = (): Date => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 45);
  return now;
};

export const calculateExpirationDate = (expiresIn: string = "15m"): Date => {
  const match = expiresIn.match(/^(\d+)([mhd])$/);

  if (!match) {
    throw new Error('Invalid format. Use "15m", "1h", or "2d".');
  }

  const value = match[1];
  const unit = match[2];
  if (!value || !unit) {
    throw new Error("Invalid expiration format");
  }
  const expirationDate = new Date();
  const amount = parseInt(value, 10);

  switch (unit) {
    case "m":
      return add(expirationDate, { minutes: amount });

    case "h":
      return add(expirationDate, { hours: amount });

    case "d":
      return add(expirationDate, { days: amount });

    default:
      throw new Error('Invalid unit. Use "m", "h", or "d".');
  }
};
