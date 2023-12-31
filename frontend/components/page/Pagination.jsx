import Link from 'next/link';
import DisplaySvg from '../../app/helpers/svg/DisplaySvg';

export function Pagination({ props }) {

  const { basePaginationUrl = '/', page = 1, itemsPerPage = 10, totalPages, totalItemsCount, displayRange = 5 } = props;

  const hasPagesToPaginate = totalPages > 1;

  if (!hasPagesToPaginate) return;

  const pageValue = +page;

  const baseUrl = basePaginationUrl;

  const pageCount = +totalPages;

  const goToPageText = 'Ir até a página';

  const renderPaginationItems = () => {

    const items = [];

    const pageRangeDisplayed =
      Math.min(displayRange, totalPages);

    const addPageNumber = (pageNumber) => {
      const selected = pageNumber === pageValue;

      items.push(
        <li key={pageNumber - 1} className={selected ? 'selected' : ''}>
          <Link href={`${baseUrl}[page]`} as={`${baseUrl}${pageNumber}`} title={`${goToPageText} ${pageNumber}`}>
            {pageNumber}
          </Link>
        </li>
      );
    };

    const addFirstPage = () => {
      if (pageValue <= 1 || totalPages <= 2) return;
      const firstPage = 1;

      items.push(
        <li key="previous" className="previous">
          <Link href={`${baseUrl}[page]`} as={`${baseUrl}${firstPage}`} title={`${goToPageText} ${firstPage}`} className="arrow-link doubleArrow">
            <DisplaySvg name="doubleArrowNext" className="arrow" />
          </Link>
        </li>
      );
    };

    const addLastPage = () => {
      if (totalPages <= 2 || pageValue == totalPages) return;
      const lastPage = totalPages;

      items.push(
        <li key="next">
          <Link href={`${baseUrl}[page]`} as={`${baseUrl}${lastPage}`} title={`${goToPageText} ${lastPage}`} className="arrow-link doubleArrow">
            <DisplaySvg name="doubleArrowNext" className="arrow doubleArrow" />
          </Link>
        </li>
      );
    };

    const addPreviousButton = () => {
      if (pageValue <= 2) return;
      const previousNumber = pageValue - 1;

      items.push(
        <li key="previous" className="previous">
          <Link href={`${baseUrl}[page]`} as={`${baseUrl}${previousNumber}`} title={`${goToPageText} ${previousNumber}`} className="arrow-link">
            <DisplaySvg name="arrowNext" className="arrow arrowPrev" />
          </Link>
        </li>
      );
    };

    const addNextButton = () => {
      if (pageValue >= pageCount || pageValue <= 2) return;
      const nextPageNumber = pageValue + 1;

      items.push(
        <li key="next">
          <Link href={`${baseUrl}[page]`} as={`${baseUrl}${nextPageNumber}`} title={`${goToPageText} ${nextPageNumber}`} className="arrow-link">
            <DisplaySvg name="arrowNext" className="arrow arrowNext" />
          </Link>
        </li>
      );
    };

    const addEllipsis = () => {
      items.push(<li key="ellipsis" className="ellipsis">...</li>);
    };

    const isPageCountRangeDisplay = pageCount >= pageRangeDisplayed;

    addFirstPage();
    addPreviousButton();

    // Normal pagination
    if (!isPageCountRangeDisplay) {
      for (let i = 1; i <= pageCount; i++) {
        addPageNumber(i);
      }
    }

    // Pagination with ranges
    if (isPageCountRangeDisplay) {

      const leftOffset =
        Math.min(pageValue, Math.floor(pageRangeDisplayed / 2));

      const rightOffset = Math.min(pageCount - pageValue, Math.floor(pageRangeDisplayed / 2));

      // Add first number
      if (pageValue - leftOffset > 1) {
        addPageNumber(1);

        // Elipses if page number less left offset is greater than two
        if (pageValue - leftOffset > 2) {
          addEllipsis();
        }

      }

      // Add middle numbers
      for (let i = pageValue - leftOffset; i <= pageValue + rightOffset; i++) {

        if (i < 1) continue;

        addPageNumber(i);
      }

      // last number link
      if (pageValue + rightOffset < pageCount) {

        // ellipses before the last number
        if (pageValue + rightOffset < pageCount - 1) {
          addEllipsis();
        }

        addPageNumber(pageCount);
      }

    }

    addNextButton();
    addLastPage();

    return items;
  };


  return <ul className="pagination">{renderPaginationItems()}</ul>;
}