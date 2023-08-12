import { Link } from "react-router-dom";
import { useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";

interface productType {
    name: string;
    slug: string;
    category: string;
    image: string;
    price: number;
    countInStock: number;
    brand: string;
    rating: number;
    numReviews: number;
    description: string;
}

interface State {
    loading: boolean;
    products: productType[];
    error: string | null;
}

const reducer = (state: State, action: any) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return { ...state, products: action.payload, loading: false };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default function HomeScreen() {
    const [{ loading, error, products }, dispatch] = useReducer(
        logger(reducer),
        {
            loading: true,
            error: "",
            products: [],
        }
    );

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: "FETCH_REQUEST" });
            try {
                const result = await axios.get(
                    "http://localhost:5000/api/products"
                );
                dispatch({ type: "FETCH_SUCCESS", payload: result.data });
            } catch (e) {
                console.log("something here");
                dispatch({ type: "FETCH_FAIL", payload: e.message });
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Featured Products</h1>
            <div className="products flex flex-wrap justify-center">
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>{error}</div>
                ) : (
                    products.map((product: productType) => (
                        <div
                            className="product border-2 m-4"
                            key={product.slug}
                        >
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
                    ))
                )}
            </div>
        </div>
    );
}
