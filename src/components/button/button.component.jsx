import styles from './button.module.scss';
/*
    default
    inverted
    google sign in
*/
const BUTTON_TYPE_CLASSES = {
    google: styles.googleSignIn,
    inverted: styles.inverted
}
const Button = ({ children, buttonType, ...otherProps }) =>{
    return(
        <button className={`${styles.container} ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
            {children}
        </button>
    )
}

export default Button;