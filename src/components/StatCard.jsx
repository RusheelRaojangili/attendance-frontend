function StatCard({ title, value, color, icon }) {
  return (
    <div style={{
      flex: 1,
      background: "white",
      borderRadius: "16px",
      padding: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      minWidth: "220px"
    }}>

      {/* LEFT TEXT */}
      <div>
        <p style={{
          margin: 0,
          color: "#64748b",
          fontSize: "14px"
        }}>
          {title}
        </p>

        <h2 style={{
          margin: "5px 0 0 0",
          fontSize: "28px",
          color: "#0f172a"
        }}>
          {value}
        </h2>
      </div>

      {/* RIGHT ICON */}
      <div style={{
        background: color,
        borderRadius: "12px",
        padding: "12px",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {icon}
      </div>

    </div>
  );
}

export default StatCard;