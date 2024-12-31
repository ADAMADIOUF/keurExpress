import React from 'react'
import { useFetchMessagesQuery } from '../slices/contactApiSlice'

const MessagesList = () => {
  const { data: messages, isLoading, isError, error } = useFetchMessagesQuery()

  if (isLoading) return <p>Loading messages...</p>
  if (isError)
    return <p>Error: {error?.data?.error || 'Failed to fetch messages'}</p>

  return (
    <div>
      <h2>Messages</h2>
      {messages?.length ? (
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              <p>
                <strong>From:</strong> {message.senderName}
              </p>
              <p>
                <strong>Email:</strong> {message.senderEmail}
              </p>
              <p>{message.message}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages found.</p>
      )}
    </div>
  )
}

export default MessagesList
