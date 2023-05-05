const dataTransformation = async (data) => {
  const transformedBooks = data.works.map((book) => {
    return {
      id: book.key,
      coverUrl:
        book.cover_edition_key &&
        `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`,
      title: book.title,
      authors: book.authors.map((author) => author.name).join(", "),
    };
  });

  return transformedBooks;
};

export default dataTransformation;