
import { createContext, useContext } from "react";
import { SharebalePages } from "../models/shareable_pages";


export type PageContext = {
    page: SharebalePages | undefined;
    setPage: React.Dispatch<React.SetStateAction<SharebalePages | undefined>>
    
};

export const MyPageContext = createContext<PageContext>({
    page:undefined,
    setPage: undefined!
    
});

export const usePageContext = () => useContext(MyPageContext);
