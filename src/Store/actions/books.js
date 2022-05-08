import { baseURL, volumeAPI } from '../../Api/API';
import { GOOGLE_KEY } from '../../Constants';

//All books actions
export const BOOKS_ACTIONS = {
  POPULATE_BOOKS: 'populate-books',
  CLEAR: 'clear',
};

export const getBooksFor = author => {
  return async (dispatch, getState) => {
    try {
      const token = getState().user.token;
      //Always clear the previous books then populate new one
      dispatch({ type: BOOKS_ACTIONS.CLEAR });

      //get the free books for the searched author starting by the newest
      const response = await fetch(baseURL + volumeAPI + `?q=inauthor:${author}&filter=free-ebooks&orderBy=newest&key=${GOOGLE_KEY}&maxResults=40`, {
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
      });

      //decode to json
      const JSONResponse = await response.json();
      if (response.status === 200) {
        const books = [];
        //extract the required information
        JSONResponse.items.forEach(book => {
          const bookData = book.volumeInfo;
          const info = {
            id: book.id,
            authors: bookData.authors,
            title: bookData.title,
            rating: bookData.averageRating,
            cover: bookData.imageLinks?.thumbnail,
            publishDate: bookData.publishDate,
            publisher: bookData.publisher,
            description: bookData.description,
            pageCount: bookData.pageCount,
            language: bookData.language,
            epubLink: book.accessInfo.epub?.downloadLink,
            pdfLink: book.accessInfo.pdf?.downloadLink,
          };
          books.push(info);
        });
        dispatch({type: BOOKS_ACTIONS.POPULATE_BOOKS, books});
      } else {
        console.log(JSONResponse);
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};
