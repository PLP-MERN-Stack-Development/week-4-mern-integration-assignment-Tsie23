import { useState  } from "react";

export default function useApi(fn) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const call = async (...args) => {
        setLoading(true);
        try {
            const data = await fn(...args);
            setLoading(false);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setLoading(false);
            throw err;
        }
    };

    return { call, loading, error };
}

