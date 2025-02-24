import { FC, ReactNode, ButtonHTMLAttributes } from 'react';
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
    google: styles.googleSignIn,
    inverted: styles.inverted
}

export type ButtonProps = {
    children?: ReactNode
    buttonType?: keyof TYPE_CLASSES
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, buttonType, ...otherProps }) =>{
    let buttonTypeClass = buttonType || 'base';
    return(
        <button className={`${styles.container} ${BUTTON_TYPE_CLASSES[buttonTypeClass]}`} {...otherProps}>
            {children}
        </button>
    )
}

export default Button;