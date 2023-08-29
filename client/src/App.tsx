import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostsPage from './pages/PostsPage';
import Layout from './pages/Layout';
import { action as registerAction } from './pages/HomePage';
import { loader as postsLoader } from './pages/PostsPage';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                    action: registerAction,
                },
                {
                    path: 'posts',
                    element: <PostsPage />,
                    loader: postsLoader,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
