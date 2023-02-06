import Link from 'next/link'
import { useSession } from 'next-auth/react'

import Button from '@/components/Button'
import RepoList from '@/components/repoList'

const SelectRepo = () => {

    const { data: session } = useSession()
    const USERNAME = session?.user?.name!

    if (session) {
        return (
            <section>
                <h1 className='mt-10 dark:text-blue-500'>Select a repository</h1>
                <div className='mt-10'>
                    <RepoList username={USERNAME} className={''} onClick={() => { }} />
                </div>
            </section>
        )
    } else {
        return (
            <section className="flex items-center h-full p-16 dark:text-gray-100">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                    <h3 className="text-center font-semibold mt-20 dark:text-blue-500">Please Login</h3>
                    <Link href="/">
                        <Button className='ease-in duration-300 mt-20 bg-blue-500 text-white px-6' onClick={() => { }}>Back to homepage</Button>
                    </Link>
                </div>
            </section>
        )
    }

}

export default SelectRepo