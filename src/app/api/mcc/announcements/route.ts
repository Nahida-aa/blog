import { NextResponse } from 'next/server'

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
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const selected = searchParams.get('selected')
  
  let filteredAnnouncements = announcements
  if (selected !== null) {
    filteredAnnouncements = announcements.filter(a => a.selected === (selected === 'true'))
  }
  
  return NextResponse.json(filteredAnnouncements)
}

export async function POST(request: Request) {
  const body = await request.json()
  const newAnnouncement = {
    id: announcements.length + 1,
    ...body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  announcements.push(newAnnouncement)
  return NextResponse.json(newAnnouncement, { status: 201 })
}