// TODO: імпортуй Book і типи
// import { Book } from "./book";
// import type { BookId } from "./types";
import { Book } from "./book";
import type { BookId } from "./types";
export class Library {
  // TODO: реалізуй колекцію книжок (Map або іншу структуру)
  items: Map<BookId, Book> = new Map();

  add(item: Book) {
    if (this.items.has(item.id)) {
      throw new Error("Item already exists");
    }
    this.items.set(item.id, item);
  }

  remove(id: BookId) {
    if (!this.items.has(id)) {
      throw new Error("Book not found");
    } else if (this.items.has(id)) {
      if (this.items.get(id)?.getStatus() === "borrowed")
        throw new Error("Cannot remove borrowed item");
      this.items.delete(id);
    }
  }

  listAll() {
    return Array.from(this.items.values());
  }

  listAvailable() {
    return Array.from(this.items.values()).filter(
      (book) => book.getStatus() === "available"
    );
  }

  borrow(bookId: BookId, personName: string) {
    const book = this.items.get(bookId);
    if (!book) {
      throw new Error("Book not found");
    }
    book.markBorrowed(personName);
  }

  return(bookId: BookId) {
    const book = this.items.get(bookId);
    if (!book) {
      throw new Error("Book not found");
    }
    book.markReturned();
  }

  getBookOrThrow(id: BookId): Book | undefined {
    if (!this.items.has(id)) {
      throw new Error("Book not found");
    }
    return this.items.get(id);
  }
}
