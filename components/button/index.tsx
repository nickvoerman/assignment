import React, { FC } from "react";
import { createClassName } from "../../lib/helpers/react-helpers";

export const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    return (
        <button
            onClick={props.onClick}
            className={createClassName(props, `flex select-none h-fit border-2 border-transparent items-center justify-center font-normal disabled:opacity-50 px-3 py-2 rounded-lg w-fit outline-none transition-all bg-color-red text-white hover:bg-transparent hover:text-black hover:border-color-red active:scale-95`)}
        >
            {props.children}
        </button>
    )
}