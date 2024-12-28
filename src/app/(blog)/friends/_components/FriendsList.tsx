'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Friend } from '@/app/aa/blog/types/friends'
import { FriendCard } from './FriendCard'
import { AddFriendCard } from './AddFriendCard'
import { Input } from '@/components/ui/input'

interface FriendsListProps {
  initialFriends: Friend[]
}

export default function FriendsList({ initialFriends }: FriendsListProps) {
  console.log('FriendsList:initialFriends', initialFriends)
  const [friends, setFriends] = useState(initialFriends)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    friend.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  async function onAddFriend(newFriend: Friend) {
    const response = await fetch('/api/friends', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFriend),
    })

    if (response.ok) {
      setFriends([...friends, newFriend])
    }
  }

  return (<>
      <Input
        type="text"
        placeholder="Search friends..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2  rounded mt-3"
      />
    <div className="space-y-8 mt-3">

      {['connected', 'disconnected', 'not added'].map((label) => {
        const labeledFriends = filteredFriends.filter(friend => {
          if (label === 'connected') {
            return !friend.labels || friend.labels.length === 0 || !friend.labels.some(l => l === 'disconnected' || l === 'not added')
          }
          return friend.labels?.includes(label)
        })
        // console.log('labeledFriends 前', labeledFriends)
        if (label !== 'connected' && labeledFriends.length === 0) return null
        // console.log('labeledFriends 后')
        return (
          <div key={label}>
            <h2 className="text-2xl font-bold mb-4 capitalize">
              {label === 'connected' ? 'Connected Friends' : `${label} Friends`}
            </h2>
            <motion.div
              className="grid gap-8 px-4 justify-items-center"
              style={{
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence>
                {labeledFriends.map((friend) => (
                  <motion.div
                    key={friend.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FriendCard friend={friend} />
                  </motion.div>
                ))}
                {label === 'connected' && (
                  <motion.div
                    key="add-friend"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <AddFriendCard onAddFriend={onAddFriend} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )
      })}
    </div>
    </>
  )
}