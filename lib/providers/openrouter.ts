import type { OpenRouterChatSettings } from "@openrouter/ai-sdk-provider";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { CompatibleLanguageModel } from "@workflow/ai/agent";

import { env } from "@/lib/env";

export const openrouter =
  (modelId: string, settings?: OpenRouterChatSettings) =>
  (): Promise<CompatibleLanguageModel> => {
    "use step";

    if (!env.OPENROUTER_API_KEY) {
      throw new Error(
        "Missing required OPENROUTER_API_KEY environment variable"
      );
    }

    const provider = createOpenRouter({ apiKey: env.OPENROUTER_API_KEY });

    // The published types for this provider still describe AI SDK v2-style
    // `doStream` options, but the runtime implementation is v3-compatible
    // (specificationVersion "v3"), matching @workflow/ai's CompatibleLanguageModel.
    return Promise.resolve(
      provider(modelId, settings) as unknown as CompatibleLanguageModel
    );
  };
