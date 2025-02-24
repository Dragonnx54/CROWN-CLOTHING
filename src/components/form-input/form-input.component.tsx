import { FC } from 'react';
import { InputHTMLAttributes } from 'react';
import styles from './form-input.module.scss';

type FormInputProps = {
    label: string
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({label, ...otherProps}) =>{
    return (
        <div className={`${styles.group}`}>
            <input className={`${styles.formInput}`} {...otherProps} ></input>
            {
                label && (
                    <label className={`${Boolean(otherProps.value && typeof otherProps.value === 'string' && otherProps.value.length) ? `${styles.shrink}`: ''} ${styles.formInputLabel}`}>{label}</label>
                )
            }
        </div>
    )
}

export default FormInput;