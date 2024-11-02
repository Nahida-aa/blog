'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Slash } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function DynamicBreadcrumb() {
  const pathname = usePathname()
  console.log('pathname:', pathname)
  const pathSegments = pathname.split('/').filter(segment => segment !== '').map(segment => decodeURI(segment))
  console.log('pathSegments:', pathSegments)

  return (
    <Breadcrumb className="">
      <BreadcrumbList className='!gap-0'>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`
          const isLast = index === pathSegments.length - 1

          return (
            <React.Fragment key={segment}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className='BreadcrumbPage text-base font-semibold glow-cyan'>{segment}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href} className='text-base font-semibold glow-purple'>{segment}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator className='BreadcrumbSeparator  '>
                  <span className='glow-purple px-1  text-base'>/</span>
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}