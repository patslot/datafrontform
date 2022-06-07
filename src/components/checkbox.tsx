import styles from './checkbox.module.scss';
interface checkboxProps {
  value: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const Checkbox = ({ value, onChange }: checkboxProps) => {
  return (
    <label htmlFor="rememberme" className={styles.checkboxcontainer}>
      <input
        type="checkbox"
        id="rememberme"
        checked={value}
        onChange={onChange}
      ></input>
      Remember me?
    </label>
  );
};

export default Checkbox;
