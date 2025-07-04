export function getAddrs(
  messages_: browser.messages.MessageHeader | browser.messages.MessageHeader[]
): string[] {
  const messages = Array.isArray(messages_) ? messages_ : [messages_]

  const addrs = new Map<string, string>() // no duplication address

  for (const m of messages) {
    // Only get the sender/author
    const sender = m.author
    const k = realAddr(sender)
    addrs.set(k, sender)
  }

  return Array.from(addrs.values())
}

export function realAddr(v: string): string {
  const regex = /<?([^\s]+@[^\s>]+)>?$/
  const m = v.match(regex)

  if (m && m.length > 1) {
    return m[1]
  }

  return v
}
