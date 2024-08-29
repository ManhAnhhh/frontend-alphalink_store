function CustomNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#dee2e6" }}
      onClick={onClick}
    />
  );
}

function CustomePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#dee2e6",
        
      }}
      onClick={onClick}
    />
  );
}

export {CustomNextArrow, CustomePrevArrow};