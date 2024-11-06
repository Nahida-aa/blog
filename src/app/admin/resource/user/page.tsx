'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { PlusCircle, Filter, SlidersHorizontal, ChevronLeft, ChevronRight, RefreshCw, Download } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface User {
  id: string
  name: string
  username: string
  email: string
  avatar_url: string
  role: string
  created_at: string
  updated_at: string
  last_login: string
  is_active: boolean
}

export default function UsersListPage() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [columns, setColumns] = useState<{ [key: string]: boolean }>({})
  const [limit, setLimit] = useState(50)
  const [offset, setOffset] = useState(0)
  const router = useRouter()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const res = await fetch('/api/users')
    const data = await res.json()
    setUsers(data)
    setSelectedRows(data.map((user: User) => user.id))
    
    const initialColumns = Object.keys(data[0] || {}).reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {} as { [key: string]: boolean })
    setColumns(initialColumns)
  }

  const toggleRowSelection = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    )
  }

  const toggleAllRows = () => {
    setSelectedRows(selectedRows.length === users.length ? [] : users.map(user => user.id))
  }

  const toggleColumn = (column: string) => {
    setColumns(prev => ({ ...prev, [column]: !prev[column] }))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users Admin</h1>
      
      <div className="flex items-center gap-2 p-3 h-[72px]">
        <div className="flex gap-2">
          <Button variant="outline" className="h-8">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-8">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {Object.keys(columns).map((column) => (
                <DropdownMenuCheckboxItem
                  key={column}
                  checked={columns[column]}
                  onCheckedChange={() => toggleColumn(column)}
                >
                  {column}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button className="h-8" onClick={() => router.push('/admin/resource/user/add')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add record
        </Button>
        <div className="ml-auto flex items-center gap-2">
          <div className="text-sm text-muted-foreground">
            {users.length} rows • 2s
          </div>
          <div className="flex items-center">
            <Button variant="outline" className="h-8 w-8 p-0 rounded-r-none" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Input
              className="h-8 w-[60px] rounded-none text-center"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            />
            <Input
              className="h-8 w-[60px] rounded-none text-center"
              value={offset}
              onChange={(e) => setOffset(Number(e.target.value))}
            />
            <Button variant="outline" className="h-8 w-8 p-0 rounded-l-none">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Button variant="outline" className="h-8 w-8 p-0">
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="h-8 w-8 p-0">
          <Download className="h-4 w-4" />
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedRows.length === users.length}
                onCheckedChange={toggleAllRows}
              />
            </TableHead>
            {Object.entries(columns).map(([column, isVisible]) => (
              isVisible && <TableHead key={column}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(user.id)}
                  onCheckedChange={() => toggleRowSelection(user.id)}
                />
              </TableCell>
              {Object.entries(columns).map(([column, isVisible]) => (
                isVisible && (
                  <TableCell key={column}>
                    {column === 'name' ? (
                      <Link href={`/admin/resource/users/edit/${user.id}`} className="text-blue-600 hover:underline">
                        {user[column as keyof User]}
                      </Link>
                    ) : (
                      user[column as keyof User]?.toString() || ''
                    )}
                  </TableCell>
                )
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}