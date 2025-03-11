"use server";

import crypto from "crypto";

const algorithm = process.env.CRYPTO_ALGORITHM as string;
const getHash = process.env.CRYPTO_HASH as string;
const key = process.env.CRYPTO_KEY as string;
const iv = process.env.CRYPTO_IV as string;
const ipEncoding = process.env.CRYPTO_IP_ENCODING as BufferEncoding;
const opEncoding = process.env.CRYPTO_OP_ENCODING as BufferEncoding;
const secretKey = crypto.createHash(getHash).update(key).digest();

export const actionEncrypt = async (text: string): Promise<string> => {
  if (!secretKey || !iv) {
    return "ERROR";
  }
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(text, ipEncoding, opEncoding);
  encrypted += cipher.final(opEncoding);
  return encrypted;
};

export const actionDecrypt = async (text: string): Promise<string> => {
  if (!secretKey || !iv) {
    return "ERROR";
  }
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decrypted = decipher.update(text, opEncoding, ipEncoding);
  decrypted += decipher.final(ipEncoding);
  return decrypted;
};
