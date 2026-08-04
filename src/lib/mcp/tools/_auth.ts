import type { ToolContext } from "@lovable.dev/mcp-js";

export const notAuthenticated = {
  content: [{ type: "text" as const, text: "Não autenticado. Conecte-se com sua conta de admin." }],
  isError: true,
};

export function requireAuth(ctx: ToolContext) {
  return ctx.isAuthenticated();
}

export function ok(data: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
    structuredContent: { data } as Record<string, unknown>,
  };
}

export function fail(message: string) {
  return { content: [{ type: "text" as const, text: message }], isError: true };
}
