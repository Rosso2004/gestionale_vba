type ITableRow = React.PropsWithChildren<{
    containsCells?: boolean;
}>;

const TableRow: React.FC<ITableRow> = (props) => {
    const {containsCells, children} = props;

    return (
        <tr className={`${containsCells ? "bg-white border-b dark:bg-gray-800 hover:bg-gray-50": ""}`}>
            {children}
        </tr>
    );
};

export default TableRow;