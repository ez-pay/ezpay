import { FaFacebookF } from "react-icons/fa";

export default function FacebookButton() {
  return (
    <button
      className="icon-button"
      style={{
        borderRadius: "20px", // Reduce size proportionally
        width: "40px", // Button width reduced proportionally
        height: "40px", // Button height reduced proportionally
        background: "rgb(24, 119, 242)", // Facebook blue color
        display: "flex", // Flexbox to center the icon
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FaFacebookF
        className="icon"
        style={{
          color: "white",
          width: "20px", // Reduced width of the icon
          height: "20px", // Reduced height of the icon
        }}
      />
    </button>
  );
}
