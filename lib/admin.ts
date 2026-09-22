import { auth } from "@clerk/nextjs/server";

const adminUserIds =
  process.env.ADMIN_USER_IDS
    ?.split(",")
    .map((id) => id.trim())
    .filter(Boolean) ?? [];

export async function isAdmin(): Promise<boolean> {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  return adminUserIds.includes(userId);
}

export async function requireAdmin(): Promise<string> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("UNAUTHORIZED");
  }

  if (!adminUserIds.includes(userId)) {
    throw new Error("FORBIDDEN");
  }

  return userId;
}