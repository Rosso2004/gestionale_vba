type ICustomPaper = React.PropsWithChildren<{
    ec?: string;
}>;

const CustomPaper: React.FC<ICustomPaper> = (props) => {
    const {ec, children} = props
    return (
            <div className="drop-shadow-md border bg-white w-auto rounded-md">
                <div className={`${ec}`}>
                    {children}
                </div>
            </div>
)}

export default CustomPaper;