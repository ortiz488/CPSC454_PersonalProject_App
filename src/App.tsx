import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';

const client = generateClient<Schema>();

function App() {
  const [movies, setTodos] = useState<Array<Schema["Movie"]["type"]>>([]);
  const { user, signOut } = useAuthenticator();

  useEffect(() => {
    client.models.Movie.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Movie.create({ title: window.prompt("Enter a moive title") });
  }

  return (
    <main>
      <button onClick={signOut}>Sign out</button>
      <h1>{user?.signInDetails?.loginId}'s moive watch list</h1>
      <h1>My movie watch list</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {movies.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

    </main>
  );
}

export default App;
