import "./App.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

const App = () => <RouterProvider router={router} />;

export default App;
