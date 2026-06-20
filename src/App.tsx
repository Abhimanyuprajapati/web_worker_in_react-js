import { useState } from 'react'
import './App.css'

interface WorkerResponse {
  count: number;
  data: any[];
}

function App() {
  const [user, setUser] = useState<WorkerResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const loadUsers = () => {

    setLoading(true);

    const worker = new Worker(
      new URL("./worker.ts", import.meta.url),
      { type: "module" }
    );

    worker.onmessage = (event) => {

      setUser(event.data);

      setLoading(false);

      worker.terminate();
    };


    // send API URL to worker
    worker.postMessage("https://jsonplaceholder.typicode.com");

  };

  return (
    <>
      <div>

      <button onClick={loadUsers}>
        Load Users
      </button>


      {loading && <h3>Loading...</h3>}


      {user && (
        <>
          <h2>Total user: {user?.count}</h2>

          <pre>
            {JSON.stringify(user?.data, null, 2)}
          </pre>
        </>
      )}

    </div>
    </>
  )
}

export default App
