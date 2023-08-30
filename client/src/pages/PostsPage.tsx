import { redirect, useLoaderData } from 'react-router-dom';

type Post = {
    id: string;
    title: string;
    content: string;
    published: boolean;
    readTime: number;
};

type PostsResponse = {
    success: true;
    data: Post[];
};

export const loader = async () => {
    try {
        const response = await fetch('api/posts');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return (await response.json()) as PostsResponse;
    } catch (error) {
        return redirect('/');
    }
};

const PostsPage = () => {
    const posts = useLoaderData() as PostsResponse;
    const { data } = posts;
    return (
        <main className='w-full h-full grid place-items-center'>
            <div className='mt-40 grid gap-4 w-11/12 place-items-center'>
                {data &&
                    data.map((post: Post) => {
                        return (
                            <article key={post.id} className='max-w-2xl bg-card p-4 rounded-md shadow-post-card w-full border shadow-md'>
                                <div className='flex items-center justify-between mb-2'>
                                    <div>
                                        <h2 className='text-xl font-medium'>{post.title}</h2>
                                        {post.readTime && <h3 className='text-sm text-secondary-foreground'>Length: {post.readTime}min</h3>}
                                    </div>
                                    <p className={post.published ? 'text-green-600' : 'text-red-600'}>{post.published ? 'Published' : 'Draft'}</p>
                                </div>
                                <hr className='mb-4 border-primary-foreground'></hr>
                                <p className='text-base leading-6 whitespace-pre-wrap'>{post.content}</p>
                            </article>
                        );
                    })}
            </div>
        </main>
    );
};

export default PostsPage;
