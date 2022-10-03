
import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap';
const Record =({
  id,
  datetimestamp,
  wordcount
}) =>{
  return (
    <Card key={id} style={{ width: '18rem' }} className="book">
      <Card.Body>
        
        <div className="book-details">
          <div>Word Count: {wordcount}</div>
         <div>Date: {datetimestamp}</div>
        </div>
        
      </Card.Body>
    </Card>
  );
}
const BooksList = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
      fetch("http://localhost:8080/v1/books")
      .then((response) => response.json())
      .then(response => setBooks(response.books));
  },[]);
  return (
    <React.Fragment>
      <div className="book-list">
        {books.length!==0 ? (
          books.map((book, bookIndex) => (
           <>
           <fieldset key={book.name}>
            <legend>
              Book: {book.name}
            </legend>
           <div >
      {book.chapters.map((chapter, chapterIndex) => (
       <>
       <fieldset key={chapter.id} className="chapterSection">
          <legend className="chapterLegend">
            Chapter:  {chapter.name}
          </legend>
          
          {chapter.records.map((record,recordIndex) => (
              <Record {...record}></Record>
          ))}
          </fieldset>
        </>
      ))}
      
          </div>
            </fieldset>



            </>
          ))
        ) : (
          <p className="message">No books available. Please add some books.</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default BooksList;