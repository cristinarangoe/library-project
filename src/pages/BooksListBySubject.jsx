import React from "react";
import { useParams } from "react-router-dom";
import BookList from "../components/Main/BookList";

function BooksListBySubject() {
  const params = useParams();
  const books = [
    {
      id: 1,
      title: "The lord of the rings",
      author: "Cristina Arango Escobsr",
      img: "https://ia800606.us.archive.org/view_archive.php?archive=/9/items/olcovers38/olcovers38-L.zip&file=385209-L.jpg",
    },
    {
      id: 2,
      title: "Book #2",
      author: "Author #2",
      img: "https://ia801401.us.archive.org/view_archive.php?archive=/32/items/l_covers_0008/l_covers_0008_73.tar&file=0008739161-L.jpg",
    },
    {
      id: 3,
      title: "Book #3",
      author: "Author #3",
      img: "https://covers.openlibrary.org/b/olid/OL31905190M-L.jpg",
    },
    {
      id: 4,
      title: "Book #4",
      author: "Author #4",
      img: "https://ia800607.us.archive.org/view_archive.php?archive=/22/items/olcovers24/olcovers24-L.zip&file=240727-L.jpg",
    },
    {
      id: 5,
      title: "Book #5",
      author: "Author #5",
      img: "https://ia800607.us.archive.org/view_archive.php?archive=/22/items/olcovers24/olcovers24-L.zip&file=240727-L.jpg",
    },
    {
      id: 6,
      title: "Book #6",
      author: "Author #6",
      img: "https://covers.openlibrary.org/b/olid/OL31905190M-L.jpg",
    },
    {
      id: 7,
      title: "Book #7",
      author: "Author #7",
      img: "https://ia800607.us.archive.org/view_archive.php?archive=/22/items/olcovers24/olcovers24-L.zip&file=240727-L.jpg",
    },
    {
      id: 8,
      title: "Book #8",
      author: "Author #8",
      img: "https://covers.openlibrary.org/b/olid/OL31905190M-L.jpg",
    },
  ];
  return <BookList books={books}/>;
}

export default BooksListBySubject;
