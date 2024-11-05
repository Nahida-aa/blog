import { NextResponse } from 'next/server'

// This is a mock database. In a real application, you'd use a proper database.
let announcements = [
  {
    id: 1,
    logo: "/path/to/logo.webp",
    name: "MC联合创作论坛",
    desc: "创作者们的联合创作基地",
    slogan: "保持自己的热情 珍惜每一份情谊\n好好的做出计划 陪伴着彼此生长",
    createdAt: "2023-10-01T12:00:00Z",
    updatedAt: "2023-10-01T12:00:00Z",
    selected: true
  }
];

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const announcement = announcements.find(a => a.id === parseInt(params.id))
  if (!announcement) {
    return NextResponse.json({ message: 'Announcement not found' }, { status: 404 })
  }
  return NextResponse.json(announcement)
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const announcement = announcements.find(a => a.id === parseInt(params.id))
  if (!announcement) {
    return NextResponse.json({ message: 'Announcement not found' }, { status: 404 })
  }
  Object.assign(announcement, body, { updatedAt: new Date().toISOString() })
  return NextResponse.json(announcement)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const index = announcements.findIndex(a => a.id === parseInt(params.id))
  if (index === -1) {
    return NextResponse.json({ message: 'Announcement not found' }, { status: 404 })
  }
  const updatedAnnouncement = {
    id: parseInt(params.id),
    ...body,
    createdAt: announcements[index].createdAt,
    updatedAt: new Date().toISOString()
  }
  announcements[index] = updatedAnnouncement
  return NextResponse.json(updatedAnnouncement)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const index = announcements.findIndex(a => a.id === parseInt(params.id))
  if (index === -1) {
    return NextResponse.json({ message: 'Announcement not found' }, { status: 404 })
  }
  announcements.splice(index, 1)
  return new NextResponse(null, { status: 204 })
}