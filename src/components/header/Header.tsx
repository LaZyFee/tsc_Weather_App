import { useTheme } from '@/context/theme-provider.tsx';
import { Moon, Sun } from 'lucide-react';

import { Link } from 'react-router-dom'

const Header = () => {
    const { theme, setTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <header className='sticky z-50 top-0 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60'>

            <div className='container mx-auto flex items-center justify-between px-4 h-16'>
                <Link to="/">
                    <h1 className='text-3xl font-extrabold text-primary'>Weather App</h1>
                </Link>
                <div>
                    {/* search */}
                    {/* Theme toggle */}
                    <div
                        onClick={() => setTheme(isDark ? 'light' : 'dark')}
                        className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark ? 'rotate-180' : 'rotate-0'}`}
                    >
                        {
                            isDark ? <Sun className='w-6 h-6 text-yellow-500 rotate-0 transition-all' /> : <Moon className='w-6 h-6 text-blue-500 rotate-0 transition-all' />
                        }
                    </div>
                </div>
            </div>



        </header>
    )
}

export default Header