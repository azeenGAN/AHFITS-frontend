import {Link} from 'react-router-dom'
import "@/index.css"

export default function NotFound() {
  return (
    <div className="h-[calc(100svh-120px)] md:h-[calc(100svh-100px)] w-full flex flex-col items-center justify-center bg-gray-200 dark:bg-black px-4">
      <div className="text-center">
         <p className='text-[120px] md:text-[200px] font-extrabold leading-none passion-one-bold  galaxy-background bg-notfound text-transparent bg-cover bg-center'>
          Oops!
        </p>
        <h2 className="text-2xl md:text-4xl font-bold mt-8 mb-4">
          404 - PAGE NOT FOUND
        </h2>
        <p className="text-gray-700 md:text-lg max-w-[500px] mb-8">
          The page you are looking for might have been removed,
          had its name changed or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-flex h-12 items-center justify-center rounded-full  bg-gray-600 px-8 text-sm font-semibold hover:font-bold  text-white transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white shadow-2xl hover:shadow-xl  duration-200"
        replace={true}
        >
          GO TO HOMEPAGE
        </Link>
      </div>
    </div>
  )
}
