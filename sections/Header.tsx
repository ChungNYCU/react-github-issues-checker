import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Button from '@/components/Button'
import Link from 'next/link'

const navigations = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
]

const Header = () => {
    const { systemTheme, theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    const darkModeButton = () => {
        if (!mounted) return null
        const currentTheme = theme === 'system' ? systemTheme : theme
        if (currentTheme === 'dark') {
            return (
                <Button className='ease-in duration-300 bg-gray-200 dark:bg-purple-600' onClick={() => setTheme('light')}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clipRule="evenodd" />
                    </svg>
                </Button>
            )
        } else {
            return (
                <Button className='ease-in duration-300 bg-gray-200' onClick={() => setTheme('dark')}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clipRule="evenodd" />
                    </svg>

                </Button>
            )
        }
    }

    return (
        <header className='h-16 flex items-center justify-between'>
            <>
                <ul className='flex gap-4'>
                    {navigations.map(nav =>
                    (<Link href={nav.path} className='navbar' key={nav.label}>
                        {nav.label}
                    </Link>))}
                </ul>
                {darkModeButton()}
            </>
        </header>
    )
}

export default Header