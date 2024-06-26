'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type Props = {
  totalPage: number
  limit: number
}

export default function Pagination({ totalPage, limit }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter()
  const currentPage = Number(searchParams.get('page')) || 1

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString())
    replace(`${pathname}?${params.toString()}`)
  };

  const nextStartPage = (Number(searchParams.get('page')) - 1) * limit + limit

  return (
    <div>
      <div className="mb-4">Current Page: {currentPage}</div>
      <div className="relative w-full">
        {currentPage > 1 && <button className="" onClick={() => createPageURL(currentPage - 1)}>Previous</button>}
        {nextStartPage < totalPage && (
          <button className="absolute right-0" onClick={() => createPageURL(currentPage + 1)}>Next</button>
        )}
      </div>
    </div>
  )
}