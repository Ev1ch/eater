export default interface Paginated {
  page?: {
    lastId?: string;
    size: number;
  };
}
