type ITableCell = React.PropsWithChildren<{
    colSpan?: number;
    ec?: string;
    action?: boolean;
}>;

const TableCell: React.FC<ITableCell> = (props) => {
    const {action, children, colSpan, ec} = props;

    return (
        <td className={`px-6 py-4 ${ec} ${action && 'space-x-2'}`} colSpan={colSpan}>
            {children}
        </td>
    );
};

export default TableCell;