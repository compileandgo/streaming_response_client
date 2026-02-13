import React, { useCallback, useState } from "react";

/**
 * @param {string} url - The URL of backend endpoint
 * @returns {{streamContent: string, isLoading: boolean, error: string, generateStream: Function}} - An object containing content and methods
 */

const useChat = (url) => {
  const [streamContent, setStreamContent] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const readStream = useCallback(async (reader) => {
    const decoder = new TextDecoder("utf-8");
    let fullText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      fullText += decoder.decode(value);
      setStreamContent(fullText);
    }
  }, []);

  const generateStream = useCallback(
    async (inputPayload) => {
      if (isLoading) return;

      setStreamContent("");
      setError("");
      setIsLoading(true);

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputPayload),
        });

        if (!res.ok) {
          throw new Error(`response error: ${res.status}`);
        }

        const reader = res.body.getReader();
        await readStream(reader);
      } catch (error) {
        console.error(`error: ${error}`);
        setError(error.message);
        setStreamContent("");
      } finally {
        setIsLoading(false);
      }
    },
    [url, readStream]
  );

  return {
    streamContent,
    error,
    isLoading,
    generateStream,
  };
};

export default useChat;
