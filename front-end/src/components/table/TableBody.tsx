type ITableBody = React.PropsWithChildren;

const TableBody: React.FC<ITableBody> = (props) => {
    const {children} = props;

    return (
        <tbody>
            {children}
        </tbody>
    );
};

export default TableBody;