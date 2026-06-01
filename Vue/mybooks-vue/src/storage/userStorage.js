import { ref } from 'vue';

export const books = ref(JSON.parse(localStorage.getItem('mybooks') || '{}'));

export const saveBook = (book, status) => {
    if (books.value[book.id] && books.value[book.id].status === status) return;
    books.value[book.id] = { ...book, status };
    localStorage.setItem('mybooks', JSON.stringify(books.value));
};

export const removeBook = (bookId) => {
    delete books.value[bookId];
    localStorage.setItem('mybooks', JSON.stringify(books.value));
};

export const getByStatus = (status, limit = null) => {
    const filtered = Object.values(books.value).filter(b => b.status === status);
    return limit ? filtered.slice(-limit) : filtered;
};

export const getStatus = (bookId) => {
    return books.value[bookId]?.status || null;
};

export const getByStatusCount = (status) => {
    return Object.values(books.value).filter(b => b.status === status).length;
}