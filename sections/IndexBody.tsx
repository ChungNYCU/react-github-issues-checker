import { useSession, signIn, signOut } from 'next-auth/react'

import Button from '@/components/Button'

const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    alert('wip')
};

const IndexBody = () => {
    const { data: session } = useSession()

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
                {!session && <Button className='ease-in duration-300 bg-blue-500 text-white px-6' onClick={() => signIn()}>Login</Button>}
                {session && <Button className='ease-in duration-300 bg-blue-500 text-white px-6' onClick={handleClick}>Go</Button>}
                {session && <Button className='ease-in duration-300 bg-red-500 text-white px-6' onClick={() => signOut()}>Logout</Button>}
            </div>
        </section>
    )
}
export default IndexBody