import { ReactNode } from 'react';
import styles from './button.module.scss';
/*
    default
    inverted
    google sign in
*/

type TYPE_CLASSES = {
    base: string,
    google: string,
    inverted: string
}

const BUTTON_TYPE_CLASSES: TYPE_CLASSES = {
    base: '',
    google: styles.googleSignIn as string,
    inverted: styles.inverted as string
}

type ButtonProps = {
    children?: ReactNode,
    buttonType?: keyof TYPE_CLASSES,
    [key: string]: any
}

const Button = ({ children, buttonType, ...otherProps }: ButtonProps) =>{
    let buttonTypeClass = buttonType || 'base';
    return(
        <button className={`${styles.container} ${BUTTON_TYPE_CLASSES[buttonTypeClass]}`} {...otherProps}>
            {children}
        </button>
    )
}

export default Button;