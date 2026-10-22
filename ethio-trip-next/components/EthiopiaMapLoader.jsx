"use client";

import dynamic from "next/dynamic";

const EthiopiaMap = dynamic(
  () => import("./EthiopiaMap"),
  {
    ssr: false,
    loading: () => (
      <div className="ethiopia-map-loading">
        Loading the Ethiopia map...
      </div>
    ),
  }
);

export default function EthiopiaMapLoader() {
  return <EthiopiaMap />;
}
