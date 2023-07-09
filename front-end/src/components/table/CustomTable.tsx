import CustomInput from "../CustomInput";
import {MdSearch} from "react-icons/md";
import CustomPaper from "../CutomPaper";
import {useEffect, useState} from "react";
import {Column, useSortBy, useTable, useGlobalFilter, useFilters, usePagination} from "react-table"
import {MdArrowDropDown, MdArrowDropUp} from "react-icons/md";

type ICustomTable = {
    globalSearch?: boolean;
    columns: Column[];
    data: any[];
    hiddenColumns: string[];
};
const CustomTable: React.FC<ICustomTable> = (props) => {
    const {globalSearch, columns, data, hiddenColumns} = props;

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        setPageSize,
        prepareRow,
        setHiddenColumns,
        state: {globalFilter},
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

    const {pageIndex, pageSize} = state;

    useEffect(() => {
        setHiddenColumns(hiddenColumns);
    }, [setHiddenColumns, hiddenColumns]);

    return (
        <CustomPaper ec="overflow-x-auto sm:rounded-lg">
            {globalSearch && (
                <div className="flex justify-end">
                    <CustomInput
                        ec="w-64 m-3"
                        type="text"
                        StartIcon={<MdSearch/>}
                        placeholder="Ricerca Globale"
                        value={globalFilter || ''}
                        onChange={(e) => {
                            setGlobalFilter(e.target.value);
                        }}
                    />
                </div>
                )}
            <table {...getTableProps()} className="w-full text-sm text-left text-gray-900">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        className="px-3 py-3"
                                        onClick={(e) => {
                                            if (e.target.tagName !== 'INPUT') {
                                                column.toggleSortBy();
                                            }
                                        }}
                                    >
                                        <div className="flex items-center">
                                            <span>{column.render('Header')}</span>
                                            <span className="text-lg inline-flex">
                                              {column.isSorted ? (column.isSortedDesc ? <MdArrowDropDown /> : <MdArrowDropUp />) : ''}
                                            </span>
                                        </div>
                                        {column.canFilter && (
                                            <div>
                                                <CustomInput
                                                    ec="font-normal b1"
                                                    size="xs"
                                                    type="text"
                                                    placeholder={`Filtra per ${column.render('Header')}`}
                                                    value={column.filterValue || ''}
                                                    onChange={(e) => {
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
                    page.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} className="bg-white border-b hover:bg-gray-50">
                                {
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