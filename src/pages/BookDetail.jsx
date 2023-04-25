import React from "react";
import styles from "./BookDetail.module.scss";

function BookDetail() {
  const book = {
    id: 1,
    title: "The lord of the rings",
    author: "Cristina Arango Escobsr",
    img: "https://ia800606.us.archive.org/view_archive.php?archive=/9/items/olcovers38/olcovers38-L.zip&file=385209-L.jpg",
    date: "14/04/2023",
    description:
      "Originally published from 1954 through 1956, J.R.R. Tolkien's richly complex series ushered in a new age of epic adventure storytelling. A philologist and illustrator who took inspiration from his work, Tolkien invented the modern heroic quest novel from the ground up, creating not just a world, but a domain, not just a lexicon, but a language, that would spawn countless imitators and lead to the inception of the epic fantasy genre. Today, THE LORD OF THE RINGS is considered ",
  };
  return (
    <div className={styles["book-detail"]}>
      <div className={styles["book-detail-img"]}>
        <img src={book.img} alt={book.title} />
      </div>
      <div className={styles["book-detail-content"]}>
        <h1>{book.title}</h1>
        <h2>{book.author}</h2>
        <p>{book.date}</p>
        <div className={styles["book-detail-container-description"]}>
          <p>{book.description}</p>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
