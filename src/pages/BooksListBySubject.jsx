import React from 'react'
import { useParams } from 'react-router-dom'

function BooksListBySubject() {
  const params = useParams();
  return (
    <div>This is the list for the subject: {params.subject}</div>
  )
}

export default BooksListBySubject