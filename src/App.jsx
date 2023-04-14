import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Header/Navbar";
import RootLayout from "./components/Layout/RootLayout";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import BookListBySearch from "./pages/BookListBySearch";
import BooksListBySubject from "./pages/BooksListBySubject";

function App() {
  //this is not the final paths, it´s just the starting point in order to create the layout
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "books/:searchField", element: <BookListBySearch /> },
        { path: "books/subject/:subject", element: <BooksListBySubject /> },
        { path: "books/:id", element: <BookDetail /> },
      ],
    },
  ]);

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  );
}

export default App;
