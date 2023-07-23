import { Link } from "react-router-dom";
import data from "../data";

export default function HomeScreen() {
    return (
        <div>
            <h1>Featured Products</h1>
            <div className="products flex flex-wrap justify-center">
                {data.products.map((product) => (
                    <div className="product border-2 m-4" key={product.slug}>
                        <Link to={`/product/${product.slug}`}>
                            <img
                                className="w-full max-w-sm"
                                src={product.image}
                                alt={product.name}
                            />
                        </Link>
                        <div className="p-4">
                            <Link to={`/product/${product.slug}`}>
                                <p>{product.name}</p>
                            </Link>
                            <p>
                                <strong>${product.price}</strong>
                            </p>
                            <button>Add to cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
