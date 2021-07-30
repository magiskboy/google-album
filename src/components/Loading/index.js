import "./style.css";

export default function Loading(props) {
  const { loading, children } = props;
  return (
    <div className="Loading">
      {loading ? <div className="loader"></div> : children}
    </div>
  );
}
