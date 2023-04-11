import React from 'react'
import { useParams } from 'react-router-dom'

function BooksListBySubject() {
  const params = useParams();
  console.log("hello", params.subject)
  return (
    <div>This is the list for the subject: {params.subject}</div>
  )
}

export default BooksListBySubject