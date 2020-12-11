import {useContext, createContext} from "react";
import {types, getSnapshot} from "mobx-state-tree";
import {v4 as uuid} from 'uuid';

const Book = types.model({
    id: types.identifier,
    title: types.string,
    author: types.string,
    publishYear: types.string,
    description: types.optional(types.string, ""),
})
const BookStore = types.model({
    books: types.array(Book),
}).actions(self => ({
    addBook: (book) => {
        book.id = uuid()
        self.books.push(book)
    },
    removeBook: (id) => {
        self.books = self.books.filter((book) => {
            return book.id !== id
        })
    },
    editBook: (id, editedBook) => {
        self.books = self.books.map((book) => {
            if (book.id === id)
                return editedBook;
            else
                return book;
        })
    },
    searchInBooks: (query) => {
        return self.books = self.books.filter((book) => {
            let result = true;
            Object.keys(query).forEach((q) => {
                if (query[q] > " ")
                    result = result & (query[q] === book[q])
            })
            return result
        })
    },
    sortBooksBy: (sortBy) => {
        return self.books = self.books.sort((book, book2) => {
            if (book[sortBy] < book2[sortBy]) {
                return -1;
            }
            if (book[sortBy] > book2[sortBy]) {
                return 1;
            }
            return 0;
        })
    },
})).views((self) => ({
    get getNumberOfBooks() {
        return self.books.length;
    },
    get getNumberOfAuthors() {
        let authors = [];
        self.books.forEach((book) => {
            if (!authors.includes(book.author))
                authors.push(book.author)
        });
        return authors.length;
    }
}))

const RootModel = types.model({
    BookStore: BookStore
})
let initialState = RootModel.create({
    BookStore: {
        books: [
            {
                id: "7de71f9d-7779-4c83-91ce-41d51777919c",
                title: "Book 1",
                author: "Yahia Qumboz",
                publishYear: "2020",
                description: "Sample Description",
            }, {
                id: "ca71b925-de6e-4553-b283-6f01a410f3ca",
                title: "Book 2",
                author: "Yahia Qumboz",
                publishYear: "2020",
                description: "Sample Description",
            }, {
                id: "fd223894-7b89-42d9-a3f4-b12df3ba1f59",
                title: "Book 3",
                author: "Mohammed Tafish",
                publishYear: "2020",
                description: "Sample Description",
            },
        ]
    },
})

export const rootStore = initialState;

export const RootInstance = typeof RootModel;
const RootStoreContext = createContext(null || RootInstance);

export const Provider = RootStoreContext.Provider;

export function useMst() {
    const store = useContext(RootStoreContext);
    if (!store) {
        throw new Error("Store cannot be null, please add a context provider");
    }
    return store;
}
