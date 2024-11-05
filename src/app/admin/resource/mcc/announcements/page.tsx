'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PlusCircle, File } from 'lucide-react'

interface Announcement {
  id: number
  logo: string
  name: string
  desc: string
  slogan: string
  selected: boolean
  createdAt: string
  updatedAt: string
}

export default function AnnouncementsListPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const router = useRouter()

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    const res = await fetch('/api/mcc/announcements')
    const data = await res.json()
    setAnnouncements(data)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Announcements Admin</h1>
      
      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="selected">Selected</TabsTrigger>
            <TabsTrigger value="unselected">Unselected</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1" onClick={() => router.push('/admin/resource/mcc/announcements/add')}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Announcement
              </span>
            </Button>
          </div>
        </div>

        <TabsContent value="all">
          <AnnouncementsTable announcements={announcements} />
        </TabsContent>
        <TabsContent value="selected">
          <AnnouncementsTable announcements={announcements.filter(a => a.selected)} />
        </TabsContent>
        <TabsContent value="unselected">
          <AnnouncementsTable announcements={announcements.filter(a => !a.selected)} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AnnouncementsTable({ announcements }: { announcements: Announcement[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Slogan</TableHead>
          <TableHead>Selected</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {announcements.map(announcement => (
          <TableRow key={announcement.id}>
            <TableCell>
              <Link href={`/admin/resource/mcc/announcements/edit/${announcement.id}`} className="text-blue-600 hover:underline">
                {announcement.name}
              </Link>
            </TableCell>
            <TableCell>{announcement.desc}</TableCell>
            <TableCell>
              <span title={announcement.slogan}>
                {announcement.slogan.length > 50 ? announcement.slogan.slice(0, 50) + '...' : announcement.slogan}
              </span>
            </TableCell>
            <TableCell>{announcement.selected ? 'Yes' : 'No'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}