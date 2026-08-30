"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "blog-visitor-id";

export function useVisitorId(): string | undefined {
  const [visitorId, setVisitorId] = useState<string>();

  useEffect(() => {
    let id = localStorage.getItem(STORAGE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(STORAGE_KEY, id);
    }
    setVisitorId(id);
  }, []);

  return visitorId;
}
