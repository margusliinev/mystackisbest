import { useState, useEffect } from 'react';

function App() {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        void fetch('/api')
            .then((res) => res.text())
            .then(setGreeting);
    }, []);

    return (
        <main>
            <h1>{greeting}</h1>
        </main>
    );
}

export default App;
