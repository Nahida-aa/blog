const isDev = process.env.NODE_ENV === "development";

export const baseUrl = isDev ? "http://localhost:9999" : "https://example.com";