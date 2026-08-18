import { POST as handleChat } from "../chat/route";

export const maxDuration = 30;

export async function POST(req: Request) {
  return handleChat(req);
}
