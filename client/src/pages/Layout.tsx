import { ThemeToggle } from '@/components/theme-toggle';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <nav className='absolute h-20 top-0 w-full grid'>
                <div className='w-11/12 max-w-6xl flex justify-between items-center mx-auto'>
                    <Link to={'/'} className='text-2xl font-semibold'>
                        My Stack Is Best
                    </Link>
                    <ThemeToggle />
                </div>
            </nav>
            <div className='w-11/12 mx-auto'>
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
