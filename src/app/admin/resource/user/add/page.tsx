'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface User {
  name: string
  username: string
  email: string
  password: string
  avatar_url: string
  role: string
  is_active: boolean
}

export default function AddUserPage() {
  const [user, setUser] = useState<User>({
    name: '',
    username: '',
    email: '',
    password: '',
    avatar_url: '',
    role: 'USER',
    is_active: true
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
    router.push('/admin/resource/user')
  }

  const handleSaveAndAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
    setUser({
      name: '',
      username: '',
      email: '',
      password: '',
      avatar_url: '',
      role: 'USER',
      is_active: true
    })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="Name"
            value={user.name}
            onChange={e => setUser({...user, name: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={e => setUser({...user, username: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={e => setUser({...user, email: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password <span className="text-red-500">*</span>
          </label>
          <Input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={e => setUser({...user, password: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Avatar URL
          </label>
          <Input
            type="text"
            placeholder="Avatar URL"
            value={user.avatar_url}
            onChange={e => setUser({...user, avatar_url: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Role <span className="text-red-500">*</span>
          </label>
          <Select onValueChange={value => setUser({...user, role: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USER">User</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="is_active"
            checked={user.is_active}
            onCheckedChange={(checked) => setUser({...user, is_active: checked as boolean})}
          />
          <label htmlFor="is_active">Active</label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Created At
          </label>
          <Input
            type="text"
            value={new Date().toLocaleString()}
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Updated At
          </label>
          <Input
            type="text"
            value={new Date().toLocaleString()}
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Login
          </label>
          <Input
            type="text"
            value="Never"
            readOnly
          />
        </div>
        <div className="flex space-x-2">
          <Button type="submit">Save</Button>
          <Button type="button" onClick={handleSaveAndAdd}>Save and Add Another</Button>
          <Button type="button" variant="outline" onClick={() => router.push('/admin/resource/users')}>Cancel</Button>
        </div>
      </form>
    </div>
  )
}