'use client'

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface Announcement {
  id: number
  logo: string
  name: string
  desc: string
  slogan: string
  selected: boolean
}

export default function EditAnnouncementPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const [announcement, setAnnouncement] = useState<Announcement | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchAnnouncement()
  }, [])

  const fetchAnnouncement = async () => {
    const res = await fetch(`/api/mcc/announcements/${params.id}`)
    const data = await res.json()
    setAnnouncement(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!announcement) return
    await fetch(`/api/mcc/announcements/${params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(announcement)
    })
    router.push('/admin/resource/mcc/announcements')
  }

  const handleDelete = async () => {
    await fetch(`/api/mcc/announcements/${params.id}`, { method: 'DELETE' })
    router.push('/admin/resource/mcc/announcements')
  }

  if (!announcement) return <div>Loading...</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Announcement</h1>
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
          <Button type="button" onClick={() => router.push('/admin/resource/mcc/announcements/add')}>Save and Add New</Button>
          <Button type="button" variant="outline" onClick={() => router.push('/admin/resource/mcc/announcements')}>Cancel</Button>
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button type="button" variant="destructive">Delete</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure you want to delete this announcement?</DialogTitle>
              </DialogHeader>
              <div className="flex justify-end space-x-2">
                <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                <Button variant="destructive" onClick={handleDelete}>Delete</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </form>
    </div>
  )
}