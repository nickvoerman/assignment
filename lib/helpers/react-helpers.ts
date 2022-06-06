//createClassName is a function where you can add classnames on a component with their classnames also on it.
export const createClassName = (props: { className?: string }, classToAdd: string) => {
    return classToAdd + (props.className ? " " + props.className : "");
}