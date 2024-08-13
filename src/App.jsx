import { RouterProvider } from "react-router-dom";
import { router } from "./routers";

function App() {
  console.log(process.env.REACT_APP_TEST);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
