import Head from 'next/head'

import Footer from '@/sections/Footer'
import Header from '@/sections/Header'

type LayoutProps = {
    children: any;
}

const Layout = (props: LayoutProps) => {
    return (
        <>
            <Head>
                <title>GitHub issues checker</title>
                <meta name='description content' content='GitHub issues checker' />
            </Head>

            <div className='min-h-screen flex flex-col'>
                <Header />
                <main className='flex-grow'>
                    {props.children}
                </main>
                <Footer />
            </div>
        </>
    )
}

export default Layout