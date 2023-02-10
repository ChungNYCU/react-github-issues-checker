import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

import Button from '@/components/Button'

const IndexBody = () => {

    const { data: session } = useSession()
    const router = useRouter()

    const directToReposPage = () => {
        router.push('/repos')
    }

    return (
        <section className='mt-16'>
            <h1 className='font-bold'>Welcome to <span className='dark:text-blue-500'>GitHub</span> issues checker</h1>
            <h3 className='my-3'>Login to use the service</h3>
            <p className='dark:text-gray-300 text-gray-700 mb-8'>
                Using GitHub API to allow users
                add, update, and search GitHub repository issues as a Task,
                and update the status of Task.
            </p>
            <div className='flex items-center justify-between'>
                {!session && <Button className='bg-blue-300 text-black hover:bg-blue-500 hover:text-white px-6' onClick={() => signIn()}>Login</Button>}
                {session && <Button className='bg-blue-300 text-black hover:bg-blue-500 hover:text-white px-6' onClick={directToReposPage}>Start</Button>}
                {session && <Button className='bg-red-300 text-black hover:bg-blue-500 hover:text-white px-6' onClick={() => signOut()}>Logout</Button>}
            </div>
        </section>
    )
}
export default IndexBody