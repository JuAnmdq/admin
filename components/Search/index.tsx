'use client'

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export default function Search() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const term = e.target.value
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('username', term)
    } else {
      params.delete('username')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <input
      type="text"
      placeholder="Search user"
      className="pl-1"
      onChange={useDebouncedCallback(handleSearch, 500)}
      defaultValue={searchParams.get('username')?.toString()}
    />
  )
}
