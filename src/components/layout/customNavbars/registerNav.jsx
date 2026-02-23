import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Wallet } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function RegisterNav() {
  return (
       <nav className="w-full h-16 bg-white border-b border-gray-100 px-4 md:px-10 flex items-center justify-between sticky top-0 z-50">

            <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-1.5 rounded-lg flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">
                    FinTrack
                </span>
            </div>

            <div className="flex items-center gap-8">
               <p className='text-sm text-slate-500'>Need help? <a className='text-blue-600  font-semibold cursor-pointer'>Support</a></p>
              
            </div>

        </nav>

  )
}
