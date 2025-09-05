export default function ChartCard({title, children, className, style}) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: 5,
        overflow: "hidden",
        background: "#fff",
        ...style
      }}
      aria-label={title}>
      {title ? (
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            zIndex: 1,
            color: "rgba(0,0,0,0.6)",
            fontSize: 15,
            fontWeight: 500,
            lineHeight: 1.2,
            pointerEvents: "none"
          }}>
          {title}
        </div>
      ) : null}
      {children}
    </div>
  );
}
