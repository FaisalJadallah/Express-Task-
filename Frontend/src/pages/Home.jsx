import React, { useEffect, useState } from 'react';

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then((response) => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(`HTTP error ${response.status}: ${text}`);
                    });
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching products:', err);
                setError(err.message || 'Unknown error');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg">Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-4xl font-bold text-gray-800">Store Products</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 flex-grow">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                        >
                            <div className="flex justify-center items-center p-4 bg-gray-50">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="h-48 object-contain"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                    {product.title}
                                </h2>
                                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                                <p className="text-xl font-bold text-red-600 mb-4">${product.price}</p>
                                <button className="w-full bg-yellow-400 text-white py-2 px-4 rounded hover:bg-yellow-400 transition-colors duration-300">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white shadow">
                <div className="container mx-auto px-4 py-4 text-center text-gray-600">
                    © {new Date().getFullYear()} Store App. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

export default Home;
