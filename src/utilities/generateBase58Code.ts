import crypto from "crypto";
import bs58 from "bs58";

export const generateBase58Code = () => {
  const randomBytes = crypto.randomBytes(3);

  return bs58.encode(randomBytes);
};
