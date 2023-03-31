type ButtonProps = {
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    children?: React.ReactNode;
}

export default function Button(props: ButtonProps): JSX.Element {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            {...props}
        >
            {props.children}
        </button>
    );
}
