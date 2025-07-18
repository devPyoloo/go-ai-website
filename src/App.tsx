import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index";

const App = () => {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;