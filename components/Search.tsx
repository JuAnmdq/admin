'use client'

import React from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

function getParamKey(searchParams: any) {
  let key = ''
  const query = searchParams.toString()
  if (query) {
    key = query.split('=')[0]
  }

  return key
}

export default function Search() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const urlKey = getParamKey(searchParams)
  const [searchKey, setSearchKey] = React.useState(urlKey || 'username')

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const term = e.target.value
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')

    if (term) {
      if (urlKey && searchKey != urlKey) {
        params.delete(urlKey)
      }

      params.set(searchKey, term)
    } else {
      params.delete(searchKey)
    }

    replace(`${pathname}?${params.toString()}`)
  }

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const nextSearchKey = e.target.value

    if (urlKey) {
      const params = new URLSearchParams(searchParams);
      const currentValue = params.get(urlKey) || ''
      if (nextSearchKey != urlKey) {
        params.delete(urlKey)
      }

      params.set(nextSearchKey, currentValue)
      replace(`${pathname}?${params.toString()}`)
    } else {
      setSearchKey(nextSearchKey)
    }
  }

  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Search user"
        className="pl-1"
        onChange={useDebouncedCallback(handleSearch, 500)}
        defaultValue={searchParams.get('username')?.toString()}
      />
      <select defaultValue={searchKey} onChange={handleSelect}>
        <option value="username">By username</option>
        <option value="email">By email</option>
        <option value="name">By name</option>
      </select>
    </div>
  )
}
