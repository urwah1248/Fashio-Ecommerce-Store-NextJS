import { createContext, useContext, ReactNode, useState } from "react";

type titleContextType = {
    title: String;
    changeTitle: (a:String) => void;
};

const titleContextDefaultValues: titleContextType = {
    title: "",
    changeTitle: () => {},
};

const titleContext = createContext<titleContextType>(titleContextDefaultValues);

export function useTitle() {
    return useContext(titleContext);
}

type Props = {
    children: ReactNode;
};

export function TitleProvider({ children }: Props) {
    const [title, setTitle] = useState<String>("Fashio.pk");

    const changeTitle = (newTitle:String) => {
        setTitle(newTitle);
    };

    const value = {
        title,
        changeTitle
    };

    return (
        <>
            <titleContext.Provider value={value}>
                {children}
            </titleContext.Provider>
        </>
    );
}