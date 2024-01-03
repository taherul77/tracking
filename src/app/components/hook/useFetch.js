import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url, authToken) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, authToken]);

    const refetch = () => {
        axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                setError(err);
            });
    };

    return [data, loading, error, refetch];
};

export default useFetch;
