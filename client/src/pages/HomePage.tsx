/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, redirect } from 'react-router-dom';
import { Button, Input, Label } from '../components/ui';

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
            console.log(response);
            throw new Error('Something went wrong');
        }
        return redirect('/posts');
    } catch (error) {
        return error;
    }
};

const HomePage = () => {
    return (
        <>
            <main className='w-screen h-screen grid place-items-center pb-20'>
                <Form method='post' className='w-full max-w-md bg-card shadow-md p-6 grid gap-6 rounded-md border'>
                    <h1 className='text-xl font-semibold text-center'>Create your account</h1>
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
            </main>
        </>
    );
};

export default HomePage;
