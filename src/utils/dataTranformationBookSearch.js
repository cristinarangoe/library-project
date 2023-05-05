const dataTransformation = async (data) => {
  const transformedBooks = data.docs.map((book) => {
    return {
      id: book.key,
      coverUrl:
        book.cover_edition_key &&
        `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`,
      title: book.title,
      authors: book.author_name.join(", "),
    };
  });

  return transformedBooks;
};

export default dataTransformation;
