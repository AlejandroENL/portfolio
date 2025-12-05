import React from "react";

type Page = {
    id: number,
    title: string
}

const ListOfPages: Page[] = [
    {id: 1, title: 'about'},
    {id: 2, title: 'timeline'},
    {id: 3, title: 'contact'},
]


type AppHeaderProps = {
  onPageSelect: (title: string) => void;
};


const AppHeader: React.FC<AppHeaderProps> = ({ onPageSelect }) => {
    
    const handlePageClick = (title: string): void => {
    
        if (title=== "contact") {
            console.log("contact was selected")
            window.open('mailto:Alejandro@foreverynewleaf.com?',"_self")
        } else {
            onPageSelect(title);
        }
        
  };

    return(
            <div className="row">
            {ListOfPages.map((page: Page) => (
                <div className="column">
                <span onClick={() => handlePageClick(page.title)} style={{ cursor: 'pointer'}} key={page.id} >
                    {page.title}
                </span>
                </div>
            ))}
            </div>

         
    );
};

export default AppHeader;

