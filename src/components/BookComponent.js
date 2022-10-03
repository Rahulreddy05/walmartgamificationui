
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useFormState
} from "react-hook-form";



const defaultValues = {
    id: 'uuid1',
    books: [
      {
        name: 'Book 123456',
        chapters: [{
            name: 'Ch1111111111',
            wordCount : 500
        }],
      },
    ]
  }


const BooksList = ({ control }) => {
    const {
      fields: books,
      append: appendBook,
      remove: removeBook
    } = useFieldArray({
      control,
      name: `books`
    });
    const { errors } = useFormState();
  
    return (
      <div className="bookSection">
        {books.map((book, bookIndex) => (
          <fieldset key={book.name}>
            <legend>
              Book {bookIndex + 1}
            </legend>
            <Controller
              name={`books.${bookIndex}.name`}
              control={control}
              rules={{
                minLength: {
                  value: 10,
                  message:
                    "Please, enter book name with at least 10 characters"
                },
                
              }}
              render={({ field }) => (
                <div>
                  <label htmlFor="name"> Name</label>
                  <input id="name" placeholder="book name" {...field} />
                </div>
              )}
            />
            <p>
              {errors.books?.[bookIndex]?.name?.message}
            </p>
            <ChaptersList control={control} bookIndex={bookIndex} />
           
            <button
              className="buttonBlack"
              type="button"
              onClick={() => removeBook(bookIndex)}
            >
              Remove Book {bookIndex + 1}
            </button>
          </fieldset>
        ))}
        <button
          type="button"
          onClick={() =>
            appendBook({ name: "" ,chapters: []})
          }
        >
          Add Another Book
        </button>
      </div>
    );
  };
const ChaptersList = ({ control, bookIndex }) => {
  const {
    fields: chapters,
    append: appendChapter,
    remove: removeChapter
  } = useFieldArray({
    control,
    name: `books.${bookIndex}.chapters`
  });
  const { errors } = useFormState();

  return (
    <div >
      {chapters.map((chapter, chapterIndex) => (
        <fieldset key={chapter.id} className="chapterSection">
          <legend className="chapterLegend">
            Chapter {chapterIndex + 1}
          </legend>
          
          <Controller
            name={`books.${bookIndex}.chapters.${chapterIndex}.name`}
            control={control}
            rules={{
              minLength: {
                value: 10,
                message:
                  "Please, enter chapter name with at least 10 characters"
              },
              
            }}
            render={({ field }) => (
              <div>
                <label htmlFor="name"> Name</label>
                <input id="name" placeholder="chapter name" {...field} />
              </div>
            )}
          />
          <p>
            {errors.books?.[bookIndex]?.chapters[chapterIndex]?.name?.message}
          </p>
          <Controller
            name={`books.${bookIndex}.chapters.${chapterIndex}.wordCount`}
            control={control}
            render={({ field }) => (
              <div>
                <label htmlFor="wordCount"> Word count</label>
                <input id="wordCount" placeholder="Word Count" {...field} />
              </div>
            )}
          />
         
          <button
            className="buttonBlack"
            type="button"
            onClick={() => removeChapter(chapterIndex)}
          >
            Remove Chapter {chapterIndex + 1}
          </button>
        </fieldset>
      ))}
      <button
        type="button"
        onClick={() =>
          appendChapter({ name: "" ,wordCount: 0})
        }
      >
        Add Another Chapter
      </button>
    </div>
  );
};

export default function BookComponent() {
  const form = useForm({
    defaultValues
  });
  const { handleSubmit, control,reset } = form;
  const onSubmit = (data) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data, null, 2)
    };
    fetch('http://localhost:8080/v1/books', requestOptions)
    .then(response => response.json())
    .then(data => {
        alert(data.response);
        reset(defaultValues);
    });
};
  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BooksList control={control}/>
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}