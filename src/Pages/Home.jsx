import React, { useEffect, useState } from 'react';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10); // Items per page
  const [totalPages, setTotalPages] = useState(3); // Assuming 3 pages for simplicity

  const userData = JSON.parse(localStorage.getItem('user'));
  const username = userData ? userData.name : 'Guest';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const offset = (currentPage - 1) * limit;
        const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, limit]);

  const handlePageChange = (page) => {
    if (page > 0) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <h1>Welcome, {username}!</h1>

          {loading && <div className="text-center">Loading...</div>}
          {error && <div className="text-center text-danger">Error: {error.message}</div>}

          {!loading && !error && (
            <>
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.title}</td>
                      <td>₨.{product.price}</td>
                      <td>{product.description}</td>
                      <td>{product.category?.name}</td>
                      <td>
                        <img src={product.images?.[0]} alt={product.title} width="50" />
                      </td>
                      <td>
                        <button className="btn btn-primary btn-sm me-2">Edit</button>
                        <button className="btn btn-danger btn-sm">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Simple Pagination (You can expand this later) */}
              <nav>
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                      Previous
                    </button>
                  </li>

                  {[...Array(totalPages)].map((_, index) => (
                    <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}

                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                  </li>
                </ul>
              </nav>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
