import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';
import Movie_background from "./assets/Movie_background.jpg";

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
    <main
      style={{
        backgroundImage: `url(${Movie_background})`,   // <-- your page background
        minHeight: "100vh",           // fill full viewport
        padding: "2rem",
        textAlign: "center",
        position: "relative",         // for any absolutely-positioned children
      }}
    >
      <h1>Current signed user = {user?.signInDetails?.loginId}</h1>
      <h1>My movie watch list</h1>

      <ul>
        {movies.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <div className="app-container">
        <button onClick={signOut}>Sign Out</button>
        <button onClick={createTodo}>Add Moive</button>
      </div>

    </main>
  );
}

export default App;
