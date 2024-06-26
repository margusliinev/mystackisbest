/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, redirect } from 'react-router-dom';
import { Button, Input, Label } from '../components/ui';
import { useState } from 'react';

export const action = async ({ request }: any) => {
    const formData = await request.formData();
    const userData = Object.fromEntries(formData);

    try {
        const response = await fetch('api/auth/login', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        return redirect('/posts');
    } catch (error) {
        return error;
    }
};

const HomePage = () => {
    const [isRegister, setIsRegister] = useState(true);

    return (
        <main className='w-11/12 h-screen grid place-items-center pb-20 mx-auto'>
            {isRegister ? (
                <Form method='post' className='relative w-full max-w-lg bg-card shadow-md p-6 grid gap-6 rounded-md border mx-20'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-xl font-semibold'>Create your account</h1>
                        <Button
                            type='button'
                            size={'sm'}
                            className='bg-transparent text-gray-900 hover:bg-transparent'
                            onClick={() => setIsRegister(!isRegister)}
                        >
                            {isRegister ? 'Already have an account?' : "Don't have an account?"}
                        </Button>
                    </div>
                    <div className='grid gap-3'>
                        <Label htmlFor='username'>Username</Label>
                        <Input type='username' id='username' name='username'></Input>
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
                </Form>
            ) : (
                <Form method='post' className='relative w-full max-w-lg bg-card shadow-md p-6 grid gap-6 rounded-md border mx-20'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-xl font-semibold'>Sign in to your account</h1>
                        <Button
                            type='button'
                            size={'sm'}
                            className='bg-transparent text-gray-900 hover:bg-transparent'
                            onClick={() => setIsRegister(!isRegister)}
                        >
                            {isRegister ? 'Already have an account?' : "Don't have an account?"}
                        </Button>
                    </div>
                    <div className='grid gap-3'>
                        <Label htmlFor='email'>Email</Label>
                        <Input type='email' id='email' name='email'></Input>
                    </div>
                    <div className='grid gap-3'>
                        <Label htmlFor='password'>Password</Label>
                        <Input type='password' id='password' name='password'></Input>
                    </div>
                    <Button size={'sm'}>Sign in</Button>
                </Form>
            )}
        </main>
    );
};

export default HomePage;
