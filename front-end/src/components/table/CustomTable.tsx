import CustomInput from "../CustomInput";
import {MdSearch} from "react-icons/md";
import CustomPaper from "../CutomPaper";
import {ReactNode, useEffect} from "react";
import {Column, useSortBy, useTable, useGlobalFilter, useFilters, usePagination} from "react-table"
import {MdArrowDropDown, MdArrowDropUp} from "react-icons/md";

type ICustomTable = {
    globalSearch?: boolean;
    columns: Column[];
    data: any[];
    btnSupport?: ReactNode;
    hiddenColumns: string[];
};
const CustomTable: React.FC<ICustomTable> = (props) => {
    const {globalSearch, columns, data, hiddenColumns, btnSupport} = props;


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        page,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        nextPage,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        previousPage,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        canNextPage,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        canPreviousPage,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        pageOptions,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        state,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setPageSize,
        prepareRow,
        setHiddenColumns,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        state: {globalFilter},
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setGlobalFilter,
    } = useTable<any>({
        columns,
        data,
        initialState: {hiddenColumns: hiddenColumns }
    },
        useGlobalFilter,
        useFilters,
        useSortBy,
        usePagination
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const {pageIndex, pageSize} = state;

    useEffect(() => {
        setHiddenColumns(hiddenColumns);
    }, [setHiddenColumns, hiddenColumns]);

    return (
        <CustomPaper ec="overflow-x-auto sm:rounded-lg">
            <div className="flex items-center justify-end">
                {btnSupport && (
                    btnSupport
                )}
                {globalSearch && (
                    <CustomInput
                        ec="w-64 mt-3 mb-3 mr-3"
                        type="text"
                        StartIcon={<MdSearch/>}
                        placeholder="Ricerca Globale"
                        value={globalFilter || ''}
                        onChange={(e) => {
                            setGlobalFilter(e.target.value);
                        }}
                    />
                )}
            </div>
            <table {...getTableProps()} className="w-full text-sm text-left text-gray-900">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column => (
                                    <th
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-ignore
                                        {...column.getHeaderProps({style: { width: column.width }}, column.getSortByToggleProps())}
                                        className="px-3 py-3"
                                        onClick={(e) => {
                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                            // @ts-ignore
                                            if (e.target.tagName !== 'INPUT') {
                                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                // @ts-ignore
                                                column.toggleSortBy();
                                            }
                                        }}
                                    >
                                        <div className="flex items-center">
                                            <span>{column.render('Header')}</span>
                                            <span className="text-lg inline-flex">
                                                {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
                                                {/*@ts-ignore*/}
                                              {column.isSorted ? (column.isSortedDesc ? <MdArrowDropDown /> : <MdArrowDropUp />) : ''}
                                            </span>
                                        </div>
                                        {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
                                        {/*@ts-ignore*/}
                                        {column.canFilter && (
                                            <div>
                                                <CustomInput
                                                    ec="font-normal b1"
                                                    size="xs"
                                                    type="text"
                                                    placeholder={`Filtra per ${column.render('Header')}`}
                                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                    // @ts-ignore
                                                    value={column.filterValue || ''}
                                                    onChange={(e) => {
                                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                        // @ts-ignore
                                                        column.setFilter(e.target.value || undefined);
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                }
                </thead>
                <tbody {...getTableBodyProps()}>
                {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    page.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} className="bg-white border-b hover:bg-gray-50">
                                {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    row.cells.map(cell => {
                                        return <td{...cell.getCellProps()} className="px-3 py-2 space-x-2">{cell.render('Cell')}</td>
                                    })
                                }
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>

            <nav className="flex items-center justify-between p-3" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500">
                    Pagina{' '}
                    {/*Mostro */}
                    <span className="font-semibold text-gray-900">
                        {pageIndex + 1 + ' '}
                    </span>
                    <span className="text-sm font-normal text-gray-500">
                        di
                    </span>
                    <span className="font-semibold text-gray-900">
                        {' ' + pageOptions.length}
                    </span>
                </span>

                <select
                    value={pageSize}
                    onChange={e => setPageSize(Number(e.target.value))}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-44 p-1 focus:border-gray-300 focus:border-0 focus:ring-gray-300"
                >
                    {
                        [5, 10, 25].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Mostra {pageSize} elementi
                            </option>
                        ))
                    }
                </select>

                <ul className="inline-flex -space-x-px text-sm h-8">
                    <li>
                        <button
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                            className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg ${canPreviousPage && "hover:bg-gray-100 hover:text-gray-700"}`}>Indietro</button>
                    </li>
                    <li>
                        <button
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg ${canNextPage && "hover:bg-gray-100 hover:text-gray-700"}`}>Avanti</button>
                    </li>
                </ul>
            </nav>
        </CustomPaper>
    );
};

export default CustomTable;