import React from 'react';

const Pagination = ({totalPages, paginate,current}) => {

    const pageNumbers = [];

    for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className={"nav"}>
            <ul className="pagination" >
                {pageNumbers.map(pageNumber => (
                    <li onClick={() => paginate(pageNumber)} key={pageNumber}  >
                        <div  className="page-link">{pageNumber}</div>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;