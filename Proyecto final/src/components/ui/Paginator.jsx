import { Pagination } from 'react-bootstrap';

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
  const items = [];
  for (let i = 1; i <= totalPages; i++) {
    items.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => onPageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <Pagination className="justify-content-center mt-4">
      <Pagination.Prev
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      />
      {items}
      <Pagination.Next
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default Paginator;