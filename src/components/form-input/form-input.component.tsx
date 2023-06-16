import styles from './form-input.module.scss';

type FormInputProps = {
    label: string,
    [key: string]: any
}

const FormInput = ({label, ...otherProps}: FormInputProps) =>{
    return (
        <div className={`${styles.group}`}>
            <input className={`${styles.formInput}`} {...otherProps} ></input>
            {
                label && (
                    <label className={`${otherProps.value.length ? `${styles.shrink}`: ''} ${styles.formInputLabel}`}>{label}</label>
                )
            }
        </div>
    )
}

export default FormInput;