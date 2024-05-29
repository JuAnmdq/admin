import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import UserTable from '@/components/UserTable'
import { User } from '@/types/User'
import Search from '@/components/Search'
import { PageProps } from '@/.next/types/app/page'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
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

  const query = searchParams?.[searchKey] && !searchParams.page
  const currentPage = Number(searchParams?.page) || 1
  const startPage = (currentPage - 1) * 5
  console.log('🚀 ~ getUsers ~ currentPage:', currentPage);
  const url = `https://jsonplaceholder.typicode.com/users?_start=${startPage}&_limit=${PAGE_LIMIT}${query ? `&${searchKey}_like=${query}` : ''}`
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
  console.log('🚀 ~ Home ~ users:', users);

  return (
    <main className="flex min-h-screen flex-col items-center p-24" id="ide">
      <h1 className="text-2xl bold font-bold mb-5">Users</h1>
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
