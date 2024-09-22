"use client";
import { useRouter } from "next/navigation"
import React from "react";

export default function ProfileNavButton() {


  // const handleClick = () => {
  //   // Different behavior based on the button id or title
  //   redirect('/profilepage')
  // };

  return (
    // <form
    //   action={async () => {
    //     "use server";
    //     // xtest();
    //     registerUser(
    //       "williamjacob0910@gmail.com",
    //       "william0910",
    //       "william"
    //     );
    //   }}
    // >
    //   <button
    //     style={{
    //       border: "2px solid black",
    //       background: "white",
    //       color: "black",
    //       borderRadius: "2vh",
    //       height: "7vh",
    //       width: "26vw",
    //     }}
    //   >
    //     Sign Up
    //   </button>
    // </form>
    <form
      action={async () => {
        // "use server";
        // redirect('/profilepage')
      }}
    >
      <button 
        className="hover:text-gray-400">Profile</button>
    </ form>
  );
}