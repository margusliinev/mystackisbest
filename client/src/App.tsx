import { Button, Input, Label } from './components/ui';
import { ThemeToggle } from './components/theme-toggle';

function App() {
    return (
        <>
            <nav className='absolute h-20 top-0 w-full grid'>
                <div className='w-full max-w-6xl flex justify-between items-center mx-auto'>
                    <h1 className='text-2xl font-semibold'>My Stack Is Best</h1>
                    <ThemeToggle />
                </div>
            </nav>
            <main className='w-screen h-screen grid place-items-center pb-20'>
                <form className='w-full max-w-md bg-card shadow-md p-6 grid gap-6 rounded-md border'>
                    <h1 className='text-xl font-semibold text-center'>Create your account</h1>
                    <div className='grid gap-3'>
                        <Label htmlFor='username'>Username</Label>
                        <Input type='text' id='username' name='username'></Input>
                    </div>
                    <div className='grid gap-3'>
                        <Label htmlFor='email'>Email</Label>
                        <Input type='email' id='email' name='email'></Input>
                    </div>
                    <div className='grid gap-3'>
                        <Label htmlFor='password'>Password</Label>
                        <Input type='password' id='password' name='password'></Input>
                    </div>
                    <Button size={'sm'}>Sign up</Button>
                </form>
            </main>
        </>
    );
}

export default App;
