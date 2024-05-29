import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { PageProps } from '@/.next/types/app/page'

import { User } from '@/types/User'
import UserTable from '@/components/tables/UserTable'
import Search from '@/components/Search'
import Pagination from '@/components/Pagination'

function getParamKey(query: object) {
  let key = ''
  if (typeof query === 'object') {
    key = Object.keys(query)[0]
  }

  return key
}

const PAGE_LIMIT = 5

async function getUsers(searchParams: Params) {
  const searchKey = getParamKey(searchParams)
  console.log('🚀 ~ getUsers ~ searchParams:', searchParams);

  const filter = searchParams.username || searchParams.name || searchParams.email ? searchParams[searchKey] : ''
  const currentPage = Number(searchParams.page) || 1
  const offset = (currentPage - 1) * 5
  const url = `https://jsonplaceholder.typicode.com/users?_start=${offset}&_limit=${PAGE_LIMIT}${filter ? `&${searchKey}_like=${filter}` : ''}`
  const response = await fetch(url)

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const totalPage = Number(response.headers.get('x-total-count'))

  const data: Promise<{ users: User[], totalPage: number }> = response.json().then(response => {
    return {
      users: response,
      totalPage
    }
  })
  
  if (!data) {
    notFound()
  }
  
  return data
}

export const metadata: Metadata = {
  title: 'Admin users',
}

export default async function Home({ searchParams }: PageProps) {
  const { users, totalPage } = await getUsers(searchParams)

  return (
    <main className="flex min-h-screen flex-col items-center p-24" id="ide">
      <h1 className="text-2xl font-semibold mb-5">Users</h1>
      <div className="mb-6">
        <Search />
      </div>
      {users.length ? (
        <>
          <UserTable users={users} />
          <Pagination totalPage={totalPage} />
        </>
       ) : 'There is no results'}
      
    </main>
  )
}
