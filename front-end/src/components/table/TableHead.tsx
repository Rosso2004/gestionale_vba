type ITableHead = React.PropsWithChildren;

const TableHead: React.FC<ITableHead> = (props) => {
    const {children} = props;

    return (
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {children}
        </thead>
    );
};

export default TableHead;