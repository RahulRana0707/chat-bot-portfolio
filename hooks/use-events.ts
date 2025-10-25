import { useEffect } from "react";
import { ENV } from "@/lib/env";

type EventMetadata = Record<string, unknown>;

export const useEvents = () => {
  const sendEvent = async (eventName: string, metadata?: EventMetadata) => {
    if (!eventName) return;
    try {
      const payload = {
        AppID: ENV.EVENT_APP_ID,
        event_name: eventName,
        user_id: metadata?.ip || "anonymous",
        metadata: metadata || {},
        CreatedAt: new Date().toISOString(),
      };

      await fetch(`${ENV.EVENT_API_BASE_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-App-Secret": ENV.EVENT_APP_SECRET,
          "X-App-ID": ENV.EVENT_APP_ID,
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Failed to send event:", err);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const gatherUserInfo = async (): Promise<EventMetadata> => {
      let metadata: EventMetadata = {
        browser: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
      };

      try {
        const res = await fetch("https://ipapi.co/json");
        if (res.ok) {
          const data = await res.json();
          metadata = {
            ...metadata,
            ...(data || {}),
          };
        }
      } catch (err) {
        console.warn("Could not fetch IP info:", err);
      }

      return metadata;
    };

    (async () => {
      const userMetadata = await gatherUserInfo();

      sendEvent("user_session_start", userMetadata);
    })();
  }, []);

  return { sendEvent };
};
