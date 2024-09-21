import HomeNavButton from "@/components/ui/nav-buttons/home-nav-button";
import ProfileNavButton from "@/components/ui/nav-buttons/profile-nav-button";
import ProfileCard from "@/components/profile-card";
import { redirect } from "next/navigation";

export default async function ProfilePage() {

    const name = "Mario"
    const address = '00000-00000-00000';

    return (
        <div className="flex flex-col justify-end items-center h-screen">
            <div className="flex flex-col items-center max-w-xs space-y-4">
                {/* Profile Image */}
                <img
                    src="/logo.png"
                    alt={`${name}'s profile`}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                />

                {/* Name with Edit Button */}
                <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-gray-700">{name}</span>
                    {/* <form
                        action={async () => {
                            "use server";

                        }}
                    >
                        <button
                            className="text-blue-500 hover:text-blue-700 focus:outline-none"
                        >
                            Edit
                        </button>
                    </form> */}
                </div>

                {/* Address with Copy Button */}
                <div className="flex items-center space-x-2">
                    <span className="text-lg font-light text-gray-700">{address}</span>
                    {/* <form
                        action={async () => {
                            "use server";

                        }}
                    >
                        <button
                            className="text-blue-500 hover:text-blue-700 focus:outline-none">
                            Copy
                        </button>
                    </form> */}

                </div>

                {/* <ProfileCard /> */}

                <nav className="bg-gray-800 text-white py-4 fixed bottom-0 w-full">
                    <div className="container mx-auto flex justify-around">
                        {/* <form
                            action={async () => {
                                "use server";
                                redirect('/profilepage')
                            }}
                        >o
                            <button>
                                Profile
                            </button>
                        </form> */}
                        <button>
                        Home
                        </button>
                    </div>
                </nav>
            </div>
        </div>
    );
}
