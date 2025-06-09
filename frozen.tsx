"use client"

import * as React from "react"
import { Plus, X, Search, Globe, Shield, Zap, Home, Bookmark, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Tab {
  id: string
  title: string
  url: string
  isLoading?: boolean
}

export default function FrozenProxy() {
  const [tabs, setTabs] = React.useState<Tab[]>([{ id: "1", title: "New Tab", url: "" }])
  const [activeTab, setActiveTab] = React.useState("1")
  const [currentUrl, setCurrentUrl] = React.useState("")

  const addTab = () => {
    const newTab: Tab = {
      id: Date.now().toString(),
      title: "New Tab",
      url: "",
    }
    setTabs([...tabs, newTab])
    setActiveTab(newTab.id)
    setCurrentUrl("")
  }

  const closeTab = (tabId: string) => {
    if (tabs.length === 1) return

    const newTabs = tabs.filter((tab) => tab.id !== tabId)
    setTabs(newTabs)

    if (activeTab === tabId) {
      setActiveTab(newTabs[0].id)
      const activeTabData = newTabs[0]
      setCurrentUrl(activeTabData.url)
    }
  }

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedTabs = tabs.map((tab) =>
      tab.id === activeTab ? { ...tab, url: currentUrl, title: currentUrl || "New Tab" } : tab,
    )
    setTabs(updatedTabs)
  }

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    const tab = tabs.find((t) => t.id === tabId)
    setCurrentUrl(tab?.url || "")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-200" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-100 to-cyan-200 bg-clip-text text-transparent">
                  Frozen Proxy
                </h1>
              </div>
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-100 border-blue-400/30">
                Secure Browsing
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-blue-100 hover:bg-blue-600/50">
                <Home className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-blue-100 hover:bg-blue-600/50">
                <Bookmark className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-blue-100 hover:bg-blue-600/50">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>History</DropdownMenuItem>
                  <DropdownMenuItem>Downloads</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Bar */}
      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border-b border-blue-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="flex-1">
              <div className="flex items-center">
                <TabsList className="bg-transparent h-auto p-0 space-x-1">
                  {tabs.map((tab) => (
                    <div key={tab.id} className="relative group">
                      <TabsTrigger
                        value={tab.id}
                        className="bg-white/70 data-[state=active]:bg-white data-[state=active]:shadow-sm border border-blue-200/50 data-[state=active]:border-blue-300 rounded-t-lg rounded-b-none px-4 py-2 text-sm max-w-[200px] truncate"
                      >
                        <Globe className="h-3 w-3 mr-2 text-blue-600" />
                        {tab.title}
                      </TabsTrigger>
                      {tabs.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute -top-1 -right-1 h-5 w-5 p-0 opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white rounded-full"
                          onClick={() => closeTab(tab.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </TabsList>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={addTab}
                  className="ml-2 h-8 w-8 p-0 bg-white/70 hover:bg-white border border-blue-200/50 rounded-full"
                >
                  <Plus className="h-4 w-4 text-blue-600" />
                </Button>
              </div>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* URL Bar Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-200/50 p-8 mb-8">
            <form onSubmit={handleUrlSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-blue-900 mb-2">Secure Proxy Navigation</h2>
                <p className="text-blue-600">Browse the web safely through our encrypted proxy service</p>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Globe className="h-5 w-5 text-blue-500" />
                </div>
                <Input
                  type="url"
                  placeholder="Enter URL or search term..."
                  value={currentUrl}
                  onChange={(e) => setCurrentUrl(e.target.value)}
                  className="pl-12 pr-12 h-14 text-lg bg-white/90 border-2 border-blue-200 focus:border-blue-400 rounded-xl shadow-sm"
                />
                <Button
                  type="submit"
                  className="absolute inset-y-0 right-0 mr-2 my-2 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Go
                </Button>
              </div>
            </form>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-blue-200/50 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-blue-900">Secure Browsing</h3>
              </div>
              <p className="text-blue-700 text-sm">
                All traffic is encrypted and routed through our secure proxy servers
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-blue-200/50 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Zap className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-blue-900">Fast Performance</h3>
              </div>
              <p className="text-blue-700 text-sm">Optimized proxy servers ensure minimal latency and maximum speed</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-blue-200/50 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <Globe className="h-6 w-6 text-cyan-600" />
                </div>
                <h3 className="font-semibold text-blue-900">Global Access</h3>
              </div>
              <p className="text-blue-700 text-sm">Access content from anywhere with our worldwide proxy network</p>
            </div>
          </div>

          {/* Tab Content */}
          <Tabs value={activeTab} className="w-full">
            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id}>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-blue-200/50 shadow-lg p-8 min-h-[400px]">
                  {tab.url ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-sm text-blue-600">
                        <Globe className="h-4 w-4" />
                        <span>Connected to: {tab.url}</span>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-8 text-center">
                        <p className="text-blue-700 mb-4">Proxy content would be displayed here</p>
                        <div className="animate-pulse">
                          <div className="h-4 bg-blue-200 rounded w-3/4 mx-auto mb-2"></div>
                          <div className="h-4 bg-blue-200 rounded w-1/2 mx-auto mb-2"></div>
                          <div className="h-4 bg-blue-200 rounded w-2/3 mx-auto"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-blue-600">
                      <Globe className="h-16 w-16 mx-auto mb-4 text-blue-300" />
                      <h3 className="text-xl font-semibold mb-2">Ready to Browse</h3>
                      <p>Enter a URL above to start browsing through the proxy</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  )
}
