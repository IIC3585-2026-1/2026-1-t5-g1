import { ref } from 'vue';

export const books = ref(JSON.parse(localStorage.getItem('mybooks') || '{}'));

export const saveBook = (book, status) => {
    const previous = books.value[book.id];
    const nextBook = { ...previous, ...book, status };
    const today = new Date().toISOString().slice(0, 10);

    if (status === 'reading' && !nextBook.startDate) {
        nextBook.startDate = today;
    }

    if (status === 'read') {
        if (!nextBook.startDate) nextBook.startDate = today;
        if (!nextBook.endDate) nextBook.endDate = today;
    }

    if (
        previous &&
        previous.status === status &&
        previous.startDate === nextBook.startDate &&
        previous.endDate === nextBook.endDate
    ) return;

    books.value[book.id] = nextBook;
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
