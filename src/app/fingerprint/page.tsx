"use client";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useEffect, useState } from "react";

export default function Dev() {
  const [fingerprint, setFingerprint] = useState<string | null>(null);

  useEffect(() => {
    FingerprintJS.load().then((fp) => {
      fp.get().then((result) => setFingerprint(result.visitorId));
    });
  }, []);

  return <div>指纹:{fingerprint}</div>;
}
