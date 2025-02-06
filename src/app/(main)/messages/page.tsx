"use client"

import { useState, useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { 
  Send, 
  Menu, 
  Phone, 
  Video, 
  Info, 
  X, 
  Search, 
  Image as ImageIcon, 
  Paperclip, 
  Smile,
  Mic,
  MoreVertical
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface Conversation {
  id: number
  name: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  typing?: boolean
  status?: string
  avatar?: string
}

interface Message {
  id: number
  sender: string
  content: string
  time: string
  status?: 'sent' | 'delivered' | 'read'
  type?: 'text' | 'image' | 'file'
  fileUrl?: string
  fileName?: string
}

const conversations: Conversation[] = [
  { 
    id: 1, 
    name: "Alice Johnson", 
    lastMessage: "Hey, how are you?", 
    time: "2m ago", 
    unread: 2, 
    online: true,
    typing: true,
    status: "Working on the new design"
  },
  { 
    id: 2, 
    name: "Bob Smith", 
    lastMessage: "Can we meet tomorrow?", 
    time: "1h ago", 
    unread: 0, 
    online: false,
    status: "Last seen 2 hours ago"
  },
  { 
    id: 3, 
    name: "Charlie Brown", 
    lastMessage: "Thanks for your help!", 
    time: "3h ago", 
    unread: 1, 
    online: true,
    status: "In a meeting"
  },
]

const messages: Message[] = [
  { 
    id: 1, 
    sender: "Alice Johnson", 
    content: "Hey, how are you?", 
    time: "2:30 PM",
    status: 'read'
  },
  { 
    id: 2, 
    sender: "You", 
    content: "I'm good, thanks! How about you?", 
    time: "2:31 PM",
    status: 'delivered'
  },
  { 
    id: 3, 
    sender: "Alice Johnson", 
    content: "Doing well! Just wanted to catch up.", 
    time: "2:32 PM",
    status: 'read'
  },
]

export default function DirectMessages() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(() => {
    const initial = conversations[0];
    if (!initial) {
      throw new Error("No conversations available");
    }
    return initial;
  });
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [filteredConversations, setFilteredConversations] = useState(conversations)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const filtered = conversations.filter(conv => 
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredConversations(filtered)
  }, [searchQuery])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() && !isRecording) return
    // Add message handling logic here
    setNewMessage("")
    setIsRecording(false)
    scrollToBottom()
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

  const getMessageTime = (time: string) => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Handle file upload logic
      console.log('File selected:', file.name)
    }
  }

  if (!selectedConversation) {
    return <div className="h-screen flex items-center justify-center">No conversation selected</div>
  }

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {/* Conversation List */}
      <aside className={`lg:w-80 border-r ${showMobileMenu ? "block" : "hidden"} lg:block`}>
        <div className="p-4 font-semibold text-lg flex items-center justify-between">
          <span>Messages</span>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setShowMobileMenu(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="px-4 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-muted/50"
            />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          {filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              className={cn(
                "w-full text-left p-4 hover:bg-accent/50 transition-colors flex items-center space-x-4",
                selectedConversation.id === conversation.id && "bg-accent"
              )}
              onClick={() => {
                setSelectedConversation(conversation)
                setShowMobileMenu(false)
              }}
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.name}`} />
                  <AvatarFallback>{getInitials(conversation.name)}</AvatarFallback>
                </Avatar>
                {conversation.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-background" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-medium truncate">{conversation.name}</p>
                  <span className="text-xs text-muted-foreground">{conversation.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  {conversation.typing ? (
                    <p className="text-sm text-primary animate-pulse">Typing...</p>
                  ) : (
                    <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                  )}
                </div>
              </div>
              {conversation.unread > 0 && (
                <Badge variant="default" className="ml-auto">
                  {conversation.unread}
                </Badge>
              )}
            </button>
          ))}
        </ScrollArea>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        <header className="border-b p-4 flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setShowMobileMenu(true)}>
              <Menu className="h-6 w-6" />
            </Button>
            <div className="relative">
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.name}`} />
                <AvatarFallback>{getInitials(selectedConversation.name)}</AvatarFallback>
              </Avatar>
              {selectedConversation.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-background" />
              )}
            </div>
            <div>
              <h2 className="font-semibold">{selectedConversation.name}</h2>
              <p className="text-sm text-muted-foreground">
                {selectedConversation.typing ? "Typing..." : selectedConversation.status}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Voice Call</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Video Call</TooltipContent>
            </Tooltip>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setShowDetails(!showDetails)}>
              <Info className="h-5 w-5" />
            </Button>
          </div>
        </header>
        <ScrollArea className="flex-1 p-4">
          {messages.map((message, index) => (
            <div key={message.id} className={`flex mb-4 ${message.sender === "You" ? "justify-end" : ""}`}>
              {message.sender !== "You" && index > 0 && messages[index - 1].sender === "You" && (
                <Avatar className="w-8 h-8 mr-2 mt-auto">
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.sender}`} />
                  <AvatarFallback>{getInitials(message.sender)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-[70%] rounded-lg p-3",
                  message.sender === "You" 
                    ? "bg-primary text-primary-foreground ml-12" 
                    : "bg-muted mr-12"
                )}
              >
                {message.type === 'image' && message.fileUrl && (
                  <img src={message.fileUrl} alt="Shared" className="rounded mb-2 max-w-full" />
                )}
                {message.type === 'file' && message.fileName && (
                  <div className="flex items-center gap-2 mb-2">
                    <Paperclip className="h-4 w-4" />
                    <span className="text-sm underline">{message.fileName}</span>
                  </div>
                )}
                <p className="text-sm">{message.content}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-xs opacity-50">{getMessageTime(message.time)}</span>
                  {message.sender === "You" && message.status && (
                    <span className="text-xs opacity-50">
                      {message.status === 'sent' && '✓'}
                      {message.status === 'delivered' && '✓✓'}
                      {message.status === 'read' && '✓✓'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </ScrollArea>
        <footer className="border-t p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <form className="flex items-center space-x-2" onSubmit={handleSendMessage}>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
              multiple
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <Paperclip className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Attach File</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="button" variant="ghost" size="icon">
                  <ImageIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share Image</TooltipContent>
            </Tooltip>
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="button" variant="ghost" size="icon">
                  <Smile className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add Emoji</TooltipContent>
            </Tooltip>
            {newMessage.trim() ? (
              <Button type="submit" size="icon" className="shrink-0">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant={isRecording ? "default" : "ghost"}
                    size="icon"
                    className={cn(isRecording && "animate-pulse")}
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isRecording ? "Stop Recording" : "Voice Message"}
                </TooltipContent>
              </Tooltip>
            )}
          </form>
        </footer>
      </main>

      {/* Details Panel */}
      <aside className={`lg:w-80 border-l ${showDetails ? "block" : "hidden"} lg:block bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60`}>
        <div className="p-6">
          <div className="text-center mb-6">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.name}`} />
              <AvatarFallback>{getInitials(selectedConversation.name)}</AvatarFallback>
            </Avatar>
            <h2 className="font-semibold text-xl">{selectedConversation.name}</h2>
            <p className="text-sm text-muted-foreground">
              {selectedConversation.online ? "Online" : selectedConversation.status}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button variant="outline" className="w-full">
              <Phone className="mr-2 h-4 w-4" />
              Call
            </Button>
            <Button variant="outline" className="w-full">
              <Video className="mr-2 h-4 w-4" />
              Video
            </Button>
          </div>
          <Separator className="my-4" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Shared Files</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Show All</DropdownMenuItem>
                  <DropdownMenuItem>Download All</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-2">
                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">image.jpg</span>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-2">
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">document.pdf</span>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Shared Links</h3>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <a href="#" className="block p-2 rounded-lg bg-muted/50 hover:bg-muted">
                <p className="text-sm font-medium">Project Documentation</p>
                <p className="text-xs text-muted-foreground truncate">https://example.com/docs</p>
              </a>
              <a href="#" className="block p-2 rounded-lg bg-muted/50 hover:bg-muted">
                <p className="text-sm font-medium">Meeting Notes</p>
                <p className="text-xs text-muted-foreground truncate">https://example.com/notes</p>
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

