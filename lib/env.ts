export const ENV = {
  EVENT_APP_ID: process.env.NEXT_PUBLIC_EVENT_APP_ID as string,
  EVENT_APP_SECRET: process.env.NEXT_PUBLIC_EVENT_APP_SECRET as string,
  EVENT_API_BASE_URL: process.env.NEXT_PUBLIC_EVENT_API_BASE_URL as string,
};

Object.freeze(ENV);
