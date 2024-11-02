'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { BackgroundProvider } from '@/context/BackgroundContext'
import { Navbar } from '@/components/layout/Nav'
import BackgroundImage from '@/components/bg/BackgroundImage'
import { routes } from './_mock/routes'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null)
  const radius = 100 // Adjust this value to change the size of the circle

  const isDev = process.env.NODE_ENV === 'development'

  const calculateClipPath = (index: number, total: number) => {
    const angleStep = 360 / total
    const startAngle = index * angleStep
    const endAngle = startAngle + angleStep

    // Calculate the clip path for the illegal area
    const clipPath = `polygon(
      50% 50%,
      ${50 + 50 * Math.cos((startAngle - 90) * (Math.PI / 180))}% ${50 + 50 * Math.sin((startAngle - 90) * (Math.PI / 180))}%,
      ${50 + 50 * Math.cos((endAngle - 90) * (Math.PI / 180))}% ${50 + 50 * Math.sin((endAngle - 90) * (Math.PI / 180))}%,
      50% 50%
    )`

    return clipPath
  }

  return (
    <BackgroundProvider>
      <Navbar />
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="shadow-md backdrop-blur-sm relative">
          <nav className="mt-2">
            {routes.map((route, index) => (
              <div key={route.href} className="relative">
                <Link
                  href={route.href}
                  className="flex items-center justify-center rounded-md p-1 m-2 text-gray-700 hover:bg-gray-200/70 transition-all duration-200 backdrop-blur-sm"
                  title={route.title}
                  onMouseEnter={() => setHoveredRoute(route.href)}
                  onMouseLeave={() => setHoveredRoute(null)}
                >
                  <route.icon className="w-5 h-5" />
                </Link>
                {hoveredRoute === route.href && (
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      {isDev && (
                        <div 
                          className="absolute pointer-events-none"
                          style={{
                            width: `${radius * 2}px`,
                            height: `${radius * 2}px`,
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            borderRadius: '50%',
                            border: '2px dashed rgba(255, 0, 0, 0.7)',
                          }}
                        />
                      )}
                      {/* Illegal area overlay */}
                      <div 
                        className="absolute pointer-events-none"
                        style={{
                          width: `${radius * 2}px`,
                          height: `${radius * 2}px`,
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                          borderRadius: '50%',
                          background: 'rgba(0, 0, 255, 0.2)',
                          clipPath: calculateClipPath(index, routes.length),
                        }}
                      />
                      {route.subRoutes.map((subRoute, subIndex) => {
                        const angle = (subIndex / (route.subRoutes.length - 1) - 0.5) * Math.PI
                        const x = Math.cos(angle) * radius
                        const y = Math.sin(angle) * radius
                        return (
                          <Link
                            key={subRoute.href}
                            href={subRoute.href}
                            className="absolute flex items-center justify-center w-10 h-10 rounded-full bg-gray-200/70 hover:bg-gray-300/70 transition-all duration-200 backdrop-blur-sm"
                            style={{
                              transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                            }}
                            title={subRoute.title}
                          >
                            <subRoute.icon className="w-5 h-5 text-gray-700" />
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
      <BackgroundImage />
    </BackgroundProvider>
  )
}