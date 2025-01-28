'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600 dark:text-indigo-400">There was a problem</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          {error.message || 'Something went wrong!'}
        </h1>
        <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
          Please try again later or contact support if the problem persists.
        </p>
        <div className="mt-10">
          <button
            onClick={reset}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  )
} 