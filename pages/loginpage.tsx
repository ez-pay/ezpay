import Image from "next/image";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function LoginPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          height: "7vh",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <div
          style={{
            width: "50vw",
            height: "30vh",
            position: "relative",
          }}
        >
          <Image
            src="/welcomeimage.png"
            alt="Next.js logo"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
      </div>
      <div style={{ height: "2vh" }}></div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          fontSize: "4vh",
          fontWeight: "bold",
          height: "6vh",
        }}
      >
        Login
      </div>
      <div style={{ height: "4vh" }}></div>
      <FormControl>
        <InputLabel htmlFor="component-outlined">Email</InputLabel>
        <OutlinedInput
          id="component-outlined"
          defaultValue=""
          label="Name"
          sx={{
            width: "80vw",
            height: "9vh",
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: "2px",
            },
          }}
        />
      </FormControl>
      <div style={{ height: "2vh" }}></div>
      <FormControl>
        <InputLabel htmlFor="component-outlined">Password</InputLabel>
        <OutlinedInput
          id="component-outlined"
          defaultValue=""
          label="Name"
          sx={{
            width: "80vw",
            height: "9vh",
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: "2px",
            },
          }}
        />
      </FormControl>
      <div style={{ height: "1vh" }}></div>
      <div
        style={{
          height: "3vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          width: "100%",
        }}
      >
        <div style={{ width: "10vw" }}></div>
        <div
          style={{
            fontSize: "1.5vh",
            color: "rgb(189 189 189)",
            fontWeight: "600",
          }}
        >
          Forgot Password?
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "end",
        }}
      >
        <button
          style={{
            border: "2px solid black",
            background: "white",
            color: "black",
            borderRadius: "2vh",
            height: "7vh",
            width: "26vw",
          }}
        >
          Sign Up
        </button>
        <div style={{ width: "10vw" }}></div>
      </div>
    </div>
  );
}
