import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import UserTable from '@/components/UserTable'
import { User } from '@/types/User'
import Search from '@/components/Search'
import { PageProps } from '@/.next/types/app/page'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

async function getUsers(searchParams: Params) {
  const query = searchParams?.username
  const currentPage = Number(searchParams?.page) || 1
  const url = `https://jsonplaceholder.typicode.com/users${query ? `?username_like=${query}` : ''}`
  const response = await fetch(url)

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

export default async function Home({ searchParams }: PageProps) {
  const users = await getUsers(searchParams)

  return (
    <main className="flex min-h-screen flex-col items-center p-24" id="ide">
      <h1 className="text-2xl bold font-bold mb-5">Users</h1>
      <Search />
      <UserTable users={users} />
    </main>
  )
}
