import "./style.scss";

export default function Button(props) {
  const { children } = props;
  return (
    <button {...props} className={`Button ${props.className}`}>
      {children}
    </button>
  );
}
