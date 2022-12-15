const Pagination = ({last_page, current_page, previous_page_url, next_page_url, page}) =>{
    return(
        <nav >
            <ul className="pagination justify-content-center">
                <li className={`page-item ${previous_page_url === null ? 'disabled' : ''}`}>
                    <a onClick={page} className="page-link" href="#">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                
                {
                    Array.from(Array(last_page), (e, i) => (
                        <li key={i} className="page-item">
                            <a onClick={page} className={`page-link ${i+1 == current_page ? 'active' : ''}`} href="#">{i + 1}</a>
                        </li>
                    ))
                }

            

                <li className={`page-item ${next_page_url === null ? 'disabled' : ''}`}>
                    <a onClick={page} className="page-link" href="#">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination