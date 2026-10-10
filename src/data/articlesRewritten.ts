import type { Article } from "@/types";
import ardaAi from "./articles/arda-ai-service-agent-boundary";
import arda from "./articles/designing-arda-cloud-native-finops-platform";
import auth from "./articles/authentication-beyond-jwt-arda-identity-architecture";
import outbox from "./articles/reliable-domain-events-nats-transactional-outbox";
import bpmn from "./articles/bpmn-workflow-service-boundary-zeebe";
import mfe from "./articles/multi-remote-micro-frontend-platform-module-federation";
import b4s from "./articles/b4s-reverse-engineering-a-local-ble-companion";
import camrelay from "./articles/camrelay-from-proprietary-p2p-to-private-rtsp";
import puchiSessions from "./articles/why-puchi-uses-opaque-sessions-over-jwt";

/**
 * Articles written against the current public repositories (one file each in
 * ./articles). They replaced the earlier versions of the same slugs.
 */
export const NEW_ARTICLES: Article[] = [ardaAi, b4s];

export const REWRITTEN_ARTICLES: Article[] = [arda, auth, outbox, bpmn, mfe, puchiSessions, camrelay];
