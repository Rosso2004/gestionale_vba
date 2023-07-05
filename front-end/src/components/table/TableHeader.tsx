type ITableHeader = React.PropsWithChildren<{
    head?: boolean;
}>;

const TableHeader: React.FC<ITableHeader> = (props) => {
    const {head, children} = props;

    return (
        <th className={` ${head ? "px-6 py-3" : "px-6 py-4 font-medium text-gray-900 whitespace-nowrap"}`}>
            {children}
        </th>
    );
};

export default TableHeader;