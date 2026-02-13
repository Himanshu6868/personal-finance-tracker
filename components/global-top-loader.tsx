"use client";

import { useEffect, useState } from "react";

export function GlobalTopLoader() {
  const [activeRequests, setActiveRequests] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (activeRequests === 0) {
      if (progress === 0) return;

      setProgress(100);

      const timeout = window.setTimeout(() => {
        setProgress(0);
      }, 180);

      return () => window.clearTimeout(timeout);
    }

    const interval = window.setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 - prev) * 0.1;
        return Math.min(next, 94);
      });
    }, 150);

    return () => window.clearInterval(interval);
  }, [activeRequests, progress]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const originalFetch = window.fetch;
    const originalSend = XMLHttpRequest.prototype.send;

    const startLoading = () => {
      setProgress((prev) => (prev === 0 ? 8 : prev));
      setActiveRequests((count) => count + 1);
    };

    const stopLoading = () => {
      setActiveRequests((count) => Math.max(0, count - 1));
    };

    window.fetch = async (...args) => {
      startLoading();
      try {
        return await originalFetch(...args);
      } finally {
        stopLoading();
      }
    };

    XMLHttpRequest.prototype.send = function patchedSend(...args) {
      startLoading();

      this.addEventListener(
        "loadend",
        () => {
          stopLoading();
        },
        { once: true },
      );

      return originalSend.apply(this, args);
    };

    return () => {
      window.fetch = originalFetch;
      XMLHttpRequest.prototype.send = originalSend;
    };
  }, []);

  const isVisible = progress > 0;

  return (
    <div
      aria-hidden="true"
      className={`global-loader ${isVisible ? "global-loader--visible" : ""}`}
    >
      <span className="global-loader__bar" style={{ width: `${progress}%` }} />
    </div>
  );
}

