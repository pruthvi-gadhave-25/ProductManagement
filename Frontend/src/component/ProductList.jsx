import React, { useEffect, useState } from 'react'

function ProductList() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");



    const fetchProducts = async (pageNum, pageSize) => {
        try {
            setLoading(true);
            setError("");
            const response = await fetch(
                `http://localhost:5278/api/Product/GetPaginatedProducts/${pageNum}/${pageSize}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch products.");
            }

            const data = await response.json();
            console.log(data);
            
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    //page preve and next 
    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    };

    useEffect(() => {
        fetchProducts(currentPage, pageSize);
    }, [currentPage, pageSize]);

    return (
        <div>
    <h4>Product List</h4>

    {error && <p style={{ color: "red" }}>Error: {error}</p>}

    {loading ? (
        <p>Loading...</p>
    ) : (
        <>
            {products.length === 0 ? (
                <p>No Data available.</p>
            ) : (
                <>
                    <table border="1" cellPadding="10" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>ProductId</th>
                                <th>ProductName</th>
                                <th>CategoryId</th>
                                <th>CategoryName</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.productId}>
                                    <td>{product.productId}</td>
                                    <td>{product.productName}</td>
                                    <td>{product.categoryId}</td>
                                    <td>{product.category.categoryName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            <div style={{ marginTop: "10px" }}>
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1 || loading}
                >
                    Previous
                </button>
                <span style={{ margin: "0 10px" }}>Page: {currentPage}</span>
                <button onClick={handleNextPage} disabled={loading}>
                    Next
                </button>
            </div>
        </>
    )}
</div>
    )
}

export default ProductList