import React from 'react';
import styles from './inputfield.module.scss';
interface inputFieldProps {
  type: string;
  name: string;
  value: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FormEvent<HTMLInputElement>) => void;
  hasError: boolean;
  errorMsg: string;
}

const InputField = (Props: inputFieldProps) => {
  return (
    <div className={styles.inputcontainer}>
      <label htmlFor={Props.name}>{Props.name}</label>
      <input
        type={Props.type}
        id={Props.name}
        value={Props.value}
        onChange={Props.onChange}
        onBlur={Props.onBlur}
      ></input>
      {Props.hasError && <p className={styles.error}>{Props.errorMsg}</p>}
    </div>
  );
};

export default InputField;
