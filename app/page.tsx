import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import UserTable from '@/components/UserTable'
import { User } from '@/types/User'

async function getUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const users: Promise<User[]> = response.json()
  
  if (!users) {
    notFound()
  }
  
  return users
}

export const metadata: Metadata = {
  title: 'Admin users',
}

export default async function Home() {
  const users = await getUsers()

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-2xl bold font-bold mb-5">Users</h1>
      <UserTable users={users} />
    </main>
  )
}
