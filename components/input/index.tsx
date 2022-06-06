import React, { FC, RefObject } from "react";
import { createClassName } from "../../lib/helpers/react-helpers";

type InputProps = {
    errorMessage?: string;
    inputRef?: RefObject<HTMLInputElement>;
}

export const Input: FC<InputProps & React.HTMLProps<HTMLInputElement>> = (props) => {

    //filter InputProps out of props.
    const { errorMessage, inputRef, ...filteredProps } = props;

    return (
        <div className={createClassName(props, "flex flex-col")}>
            {errorMessage ? <p className="text-xs text-red-500 mb-2">{errorMessage}</p> : null}
            <input {...filteredProps} ref={inputRef} className="px-3 py-2 border-2 transition-all rounded-lg border-color-red border-opacity-10 w-full outline-none hover:border-opacity-50 focus:border-opacity-100" />
        </div>
    )
}