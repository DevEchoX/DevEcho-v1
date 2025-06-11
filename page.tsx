"use client"

import { useState } from "react"
import ChromeBrowser from "../chrome-browser"
import { BrowserTypeSelector } from "../browser-type-selector"
import type { BrowserType } from "../echo-types"

export default function Page() {
  const [browserType, setBrowserType] = useState<BrowserType>("standard")

  return (
    <div className="flex flex-col h-screen bg-black">
      <div className="p-4 bg-gray-950">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-purple-400">EchoX Browser</h1>
          <BrowserTypeSelector onSelect={setBrowserType} selectedType={browserType} />
        </div>
      </div>
      <div className="flex-1">
        <ChromeBrowser />
      </div>
    </div>
  )
}
