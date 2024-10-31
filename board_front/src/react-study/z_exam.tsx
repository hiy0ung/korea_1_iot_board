import axios from "axios";
import React, { useState } from "react";

const DOMAIN = "http://localhost:8080";
const BOOK_API = "api/v1/books";

interface GetAllBooksResponseDto {
  id: number;
  writer: string;
  title: string;
  content: string;
}

export default function Z_exam() {
  const [results, setResults] = useState<GetAllBooksResponseDto[]>([]);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    fetchBookData();
  };

  const fetchBookData = async () => {
    try {
      const response = await axios.get(`${DOMAIN}/${BOOK_API}`);

      const data = response.data;

      setResults(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  return (
    <div>
      <button onClick={handleButtonClick}>전체 조회</button>
      <ul>
        {results.map((book) => (
          <li key={book.id}>
            {book.title}
            <br />
            {book.writer}
            <br />
            {book.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
