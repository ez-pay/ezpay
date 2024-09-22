"use client";
import HomeNavButton from "@/components/ui/nav-buttons/home-nav-button";
import ProfileNavButton from "@/components/ui/nav-buttons/profile-nav-button";
import ProfileCard from "@/components/profile-card";
import { redirect } from "next/navigation";
import NavBar from "@/components/bottom-nav";

export default async function ProfilePage() {
  const name = "Mario";
  const address = "00000-00000-00000";

  //className="flex flex-col justify-end items-center h-screen"
  return (
    <div className="flex flex-col items-center max-w-xs mx-auto h-screen">
      {/* Profile Section */}
      <div className="w-full bg-purple-600 text-white pt-8 pb-6 rounded-b-3xl flex flex-col items-center">
        {/* Profile Image */}
        <img
          src="https://via.placeholder.com/150"
          alt="Profile Image"
          className="w-24 h-24 rounded-full object-cover"
        />
        {/* Name and Edit */}
        <div className="flex items-center space-x-2 mt-4">
          <h1 className="text-xl font-semibold">Mario Alvaro</h1>
          <button className="text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5l7 7-7 7M5 5h14v14H5z"
              />
            </svg>
          </button>
        </div>
        {/* Unique Identifier */}
        <p className="text-xs text-gray-300">
          d64b05fb-2b92-5441-9a83-cc91a42e821f
        </p>
      </div>

      {/* Info Section */}
      <div className="w-full px-4 mt-4 space-y-4">
        {/* Email */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Email</span>
          <a href="mailto:mario.a@gmail.com" className="text-blue-600">
            mario.a@gmail.com
          </a>
        </div>

        {/* Circle Address */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Circle Address</span>
          <span className="text-gray-600">12345-124374-247934-84279</span>
        </div>

        {/* External Addresses */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-blue-600">Polygon</span>
            <span className="text-gray-600">0x12345678</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-blue-600">Arbitrum</span>
            <span className="text-gray-600">0x12345678</span>
          </div>
        </div>

        {/* Verification Status */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Verification Status</span>
          <span className="bg-green-100 text-green-600 py-1 px-2 rounded-full text-sm">
            Verified
          </span>
        </div>
      </div>

      {/* Navigation */}
      <NavBar />
    </div>
  );
}
