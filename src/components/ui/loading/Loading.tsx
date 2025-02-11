import React from 'react'

export function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-sm z-50">
      <div className="relative w-40 h-40">
        <svg className="absolute inset-0" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle className="animate-pulse-fast" cx="50" cy="50" r="45" fill="none" stroke="#3B82F6" strokeWidth="8" />
          <circle className="animate-pulse-slow" cx="50" cy="50" r="35" fill="none" stroke="#60A5FA" strokeWidth="6" />
          <circle className="animate-spin-slow" cx="50" cy="50" r="25" fill="none" stroke="#93C5FD" strokeWidth="4" strokeDasharray="40 60" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping" />
        </div>
        <div className="sr-only">Loading...</div>
      </div>
    </div>
  )
}