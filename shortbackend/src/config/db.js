let prismaInstance = null;

/**
 * Lazily instantiate PrismaClient.
 * - If a custom generated client exists at src/generated/prisma, load that.
 * - Otherwise run `npx prisma generate` (sync) and then load @prisma/client.
 *
 * Usage:
 *   const prisma = await getPrismaClient();
 */
export async function getPrismaClient() {
  if (prismaInstance) return prismaInstance;

  const fs = await import("fs");
  const path = await import("path");
  const { pathToFileURL } = await import("url");
  const child = await import("child_process");

  const projectRoot = process.cwd();
  const generatedDir = path.join(projectRoot, "src", "generated", "prisma");
  const generatedIndex = path.join(generatedDir, "index.js");

  // Helper to import a file path as ESM module
  async function importFile(filePath) {
    return await import(pathToFileURL(filePath).href);
  }

  // If custom generated client exists, prefer it
  if (fs.existsSync(generatedIndex)) {
    try {
      const mod = await importFile(generatedIndex);
      const { PrismaClient } = mod;
      prismaInstance = new PrismaClient();
      return prismaInstance;
    } catch (err) {
      // fallthrough to attempt generate + import
    }
  }

  // If we reach here, try to run `npx prisma generate` to ensure client is available.
  try {
    // run sync so startup waits for generation; keep output visible
    child.execSync("npx prisma generate", { stdio: "inherit" });
  } catch (err) {
    // If generate fails, rethrow a helpful error
    throw new Error(
      'Failed to run "npx prisma generate". Run it manually and try again.\n' +
        String(err)
    );
  }

  // After generation, try to import the generated client first, then fallback to @prisma/client
  try {
    if (fs.existsSync(generatedIndex)) {
      const mod = await importFile(generatedIndex);
      const { PrismaClient } = mod;
      prismaInstance = new PrismaClient();
      return prismaInstance;
    } else {
      const mod = await import("@prisma/client");
      const { PrismaClient } = mod;
      prismaInstance = new PrismaClient();
      return prismaInstance;
    }
  } catch (err) {
    // Provide a clear error so you know why instantiation failed
    throw new Error(
      '@prisma/client did not initialize. Ensure "npx prisma generate" ran successfully. Original error: ' +
        String(err)
    );
  }
}

/**
 * Ensure the Prisma client is instantiated and connected.
 * Call this once at application startup (e.g. in your server bootstrap).
 */
export async function connectPrisma() {
  const prisma = await getPrismaClient();
  // Prisma may already auto-connect on first query; explicit connect is fine and idempotent
  if (typeof prisma.$connect === "function") {
    try {
      await prisma.$connect();
    } catch (e) {
      // ignore connect errors here — caller can handle/log if needed
    }
  }
  return prisma;
}

/**
 * Disconnect the Prisma client (useful for graceful shutdowns and tests).
 */
export async function disconnectPrisma() {
  if (!prismaInstance) return;
  const prisma = prismaInstance;
  if (typeof prisma.$disconnect === "function") {
    try {
      await prisma.$disconnect();
    } catch (e) {
      // ignore disconnect errors
    }
  }
  prismaInstance = null;
}

/**
 * Optionally register handlers to disconnect on process exit (useful in dev).
 * Call registerShutdownHandlers() from your bootstrap if you want automatic cleanup.
 */
export function registerShutdownHandlers() {
  const shutdown = async () => {
    await disconnectPrisma();
    // give pending logs a moment (optional)
    setTimeout(() => process.exit(0), 100).unref?.();
  };

  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
  process.once("beforeExit", shutdown);
}

// Provide compatibility exports:
// - `prisma`: a proxy that forwards to the real PrismaClient once initialized.
//   If used before initialization, it throws a helpful error instructing to call connectPrisma()/connectDB() first.
// - `connectDB` / `disconnectDB`: aliases for existing lifecycle functions.

export const prisma = new Proxy(
  {},
  {
    get(_target, prop) {
      if (prismaInstance) {
        // forward synchronous property access to the real client
        // (e.g., prisma.user.findMany)
        const val = prismaInstance[prop];
        return typeof val === "function" ? val.bind(prismaInstance) : val;
      }
      throw new Error(
        `Prisma client not initialized. Call "await connectPrisma()" or "await connectDB()" before using "prisma.${String(
          prop
        )}".`
      );
    },
    // allow calling as function to get client (rare), e.g., (await prisma).something — keep simple behavior
    apply(_target, _thisArg, _args) {
      if (prismaInstance) return prismaInstance;
      throw new Error(
        'Prisma client not initialized. Call "await connectPrisma()" or "await connectDB()" first.'
      );
    },
  }
);

export const connectDB = connectPrisma;
export const disconnectDB = disconnectPrisma;

// default export for backward compatibility
export default getPrismaClient;
