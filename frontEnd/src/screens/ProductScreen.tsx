import { useParams } from "react-router-dom";

export default function ProductScreen() {
    const params = useParams();
    console.log(params);
    const { slug } = params;
    return (
        <div>
            <h1>{slug}</h1>
        </div>
    );
}
