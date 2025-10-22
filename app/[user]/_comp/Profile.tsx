import React from 'react'
import Image from 'next/image'
import { User, MapPin, Link as LinkIcon, Twitter, Users } from 'lucide-react'

const GitHubProfile = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* ProfileSidebar */}
        <div className="md:w-1/4">
          <div className="sticky top-4">
            <Image
              src="/placeholder.svg?height=260&width=260"
              alt="Profile Picture"
              width={260}
              height={260}
              className="rounded-full mb-4"
            />
            <h1 className="text-2xl font-bold mb-1">John Doe</h1>
            <p className="text-gray-600 mb-4">johndoe</p>
            <p className="mb-4">
              Software developer passionate about creating amazing web experiences.
            </p>
            <div className="flex flex-col space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>Company Name</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center">
                <LinkIcon className="w-4 h-4 mr-2" />
                <a href="#" className="text-blue-600 hover:underline">https://johndoe.com</a>
              </div>
              <div className="flex items-center">
                <Twitter className="w-4 h-4 mr-2" />
                <a href="#" className="text-blue-600 hover:underline">@johndoe</a>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm text-gray-600"><strong>100</strong> followers · <strong>50</strong> following</span>
            </div>
          </div>
        </div>

        {/* ContentMain */}
        <div className="md:w-3/4">
          <nav className="mb-8">
            <ul className="flex border-b">
              <li className="mr-1">
                <a href="#" className="bg-white inline-block py-2 px-4 text-blue-600 font-semibold">Overview</a>
              </li>
              <li className="mr-1">
                <a href="#" className="bg-white inline-block py-2 px-4 text-gray-600 hover:text-blue-600 font-semibold">Repositories</a>
              </li>
              <li className="mr-1">
                <a href="#" className="bg-white inline-block py-2 px-4 text-gray-600 hover:text-blue-600 font-semibold">Projects</a>
              </li>
            </ul>
          </nav>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Popular repositories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((repo) => (
                <div key={repo} className="border rounded p-4">
                  <h3 className="font-semibold text-blue-600 mb-2">Repository {repo}</h3>
                  <p className="text-sm text-gray-600 mb-2">Description of repository {repo}</p>
                  <div className="flex items-center text-xs text-gray-600">
                    <span className="mr-4">JavaScript</span>
                    <span>Updated 3 days ago</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Recent activity</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((activity) => (
                <div key={activity} className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <p className="text-sm">
                      <strong>John Doe</strong> starred <a href="#" className="text-blue-600 hover:underline">repository-name</a>
                    </p>
                    <p className="text-xs text-gray-600">3 days ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GitHubProfile