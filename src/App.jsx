import { Toaster } from "react-hot-toast";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <>
      <AppRouter />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '10px',
          },
          success: {
            style: { background: '#10B981' }, // Green for success
          },
          error: {
            style: { background: '#EF4444' }, // Red for errors
          },
        }}
      />
    </>
  )
}

export default App;
