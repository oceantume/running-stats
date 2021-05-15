interface PaginationProps {
  page: number
  canOpenNextPage: boolean
  canOpenPreviousPage: boolean
  onOpenPage: (page: number) => void
}

export const Pagination = ({
  page,
  onOpenPage,
  canOpenNextPage,
  canOpenPreviousPage,
}: PaginationProps) => (
  <div>
    <button
      disabled={!canOpenPreviousPage}
      onClick={() => onOpenPage(page - 1)}
    >
      Previous
    </button>
    <span style={{ margin: '1rem' }}>Page {page}</span>
    <button disabled={!canOpenNextPage} onClick={() => onOpenPage(page + 1)}>
      Next
    </button>
  </div>
)
