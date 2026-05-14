import { useEffect, useReducer } from 'react';

// 1. Define the initial state for the network request
const initialState = {
    data: null,
    loading: false,
    error: ""
};

// 2. The Reducer handles the "State Machine" transitions
const fetchReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                loading: true,
                error: ""
            };
        case "SUCCESS":
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: ""
            };
        case "ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

const useFetch = (url) => {
    const [state, dispatch] = useReducer(fetchReducer, initialState);

    useEffect(() => {
        // 3. Create a controller for this specific request
        const controller = new AbortController();

        const fetchData = async () => {
            dispatch({ type: "LOADING" });

            try {
                // 4. Pass the abort signal to the fetch call
                const res = await fetch(url, { signal: controller.signal });

                if (!res.ok) {
                    throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
                }

                const json = await res.json();
                dispatch({ type: "SUCCESS", payload: json });

            } catch (err) {
                // 5. Only dispatch ERROR if it wasn't a manual abort
                if (err.name === "AbortError") {
                    console.log("Fetch aborted for:", url);
                    return;
                }
                dispatch({ type: "ERROR", payload: err.message });
            }
        };

        fetchData();

        // 6. CLEANUP: If the user types again, this function runs 
        // and cancels the previous request before the next one starts.
        return () => {
            controller.abort();
        };
    }, [url]);

    // Return the state so the component can destructure it
    return {
        data: state.data,
        loading: state.loading,
        error: state.error
    };
};

export default useFetch;