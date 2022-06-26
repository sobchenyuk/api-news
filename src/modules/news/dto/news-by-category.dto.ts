export class NewsByCategoryResponseDto<T> {
  constructor(
    readonly items: T,
    readonly meta: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    },
  ) {}
}
