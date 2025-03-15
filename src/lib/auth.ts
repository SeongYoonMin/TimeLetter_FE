"use server";

import { actionDecrypt } from "./crypto";
import prisma from "./prisma";

export async function validateAuthUniqueID(
  authUniqueId: string
): Promise<boolean> {
  if (!authUniqueId || !authUniqueId.startsWith("Bearer ")) {
    return false;
  }
  const userId = await actionDecrypt(authUniqueId.replace("Bearer ", ""));
  if (!userId) {
    return false;
  }
  const user = await prisma.capsuler.findFirst({
    where: { userId },
  });
  if (!user) {
    return false;
  }
  return true;
}
