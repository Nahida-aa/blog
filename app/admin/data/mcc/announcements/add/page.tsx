'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'

interface Announcement {
  logo: string
  name: string
  desc: string
  slogan: string
  selected: boolean
}

export default function AddAnnouncementPage() {
  const [announcement, setAnnouncement] = useState<Announcement>({
    logo: '',
    name: '',
    desc: '',
    slogan: '',
    selected: false
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/mcc/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(announcement)
    })
    router.push('/admin/announcements')
  }

  const handleSaveAndAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/mcc/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(announcement)
    })
    setAnnouncement({
      logo: '',
      name: '',
      desc: '',
      slogan: '',
      selected: false
    })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Announcement</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Logo URL"
          value={announcement.logo}
          onChange={e => setAnnouncement({...announcement, logo: e.target.value})}
        />
        <Input
          type="text"
          placeholder="Name"
          value={announcement.name}
          onChange={e => setAnnouncement({...announcement, name: e.target.value})}
        />
        <Input
          type="text"
          placeholder="Description"
          value={announcement.desc}
          onChange={e => setAnnouncement({...announcement, desc: e.target.value})}
        />
        <Textarea
          placeholder="Slogan"
          value={announcement.slogan}
          onChange={e => setAnnouncement({...announcement, slogan: e.target.value})}
        />
        <div className="flex items-center space-x-2">
          <Checkbox
            id="selected"
            checked={announcement.selected}
            onCheckedChange={(checked) => setAnnouncement({...announcement, selected: checked as boolean})}
          />
          <label htmlFor="selected">Selected</label>
        </div>
        <div className="flex space-x-2">
          <Button type="submit">Save</Button>
          <Button type="button" onClick={handleSaveAndAdd}>Save and Add Another</Button>
          <Button type="button" variant="outline" onClick={() => router.push('/admin/resource/mcc/announcements')}>Cancel</Button>
        </div>
      </form>
    </div>
  )
}