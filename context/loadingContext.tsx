import { createContext, useContext, ReactNode, useState } from "react";

type loadingContextType = {
    loading: Boolean;
    toggleLoading: () => void;
};

const loadingContextDefaultValues: loadingContextType = {
    loading: false,
    toggleLoading: () => {},
};

const loadingContext = createContext<loadingContextType>(loadingContextDefaultValues);

export function useLoading() {
    return useContext(loadingContext);
}

type Props = {
    children: ReactNode;
};

export function LoadingProvider({ children }: Props) {
    const [loading, setLoading] = useState<Boolean>(false);

    const toggleLoading = () => {
        if(loading){
            setLoading(false)
        }
        else{
            setLoading(true)
        }
    };

    const value = {
        loading,
        toggleLoading
    };

    return (
        <>
            <loadingContext.Provider value={value}>
                {children}
            </loadingContext.Provider>
        </>
    );
}