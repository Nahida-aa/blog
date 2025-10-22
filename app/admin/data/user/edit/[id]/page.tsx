'use client'

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface User {
  id: string
  name: string
  email: string
  role: string
  is_active: boolean
}

export default function EditUser(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/users/${params.id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch user')
      }
      const data = await response.json()
      setUser(data)
    } catch (err) {
      setError('Failed to load user')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      const response = await fetch(`/api/users/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })

      if (!response.ok) {
        throw new Error('Failed to update user')
      }

      router.push('/admin/resource/user')
    } catch (err) {
      setError('Failed to update user')
    }
  }

  if (!user) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          value={user.name}
          onChange={e => setUser({...user, name: e.target.value})}
          placeholder="Name"
          required
        />
        <Input
          type="email"
          value={user.email}
          onChange={e => setUser({...user, email: e.target.value})}
          placeholder="Email"
          required
        />
        <Select onValueChange={value => setUser({...user, role: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USER">User</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
          </SelectContent>
        </Select>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={user.is_active}
            onChange={e => setUser({...user, is_active: e.target.checked})}
          />
          <span>Active</span>
        </label>
        <Button type="submit">Update User</Button>
      </form>
    </div>
  )
}