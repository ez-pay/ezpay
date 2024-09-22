import WalletCard from "@/components/ui/wallet-card";
import ActionButtonCard from "@/components/ui/action-button-card/send-button-card";
import SendButtonCard from "@/components/ui/action-button-card/send-button-card";
import RequestButtonCard from "@/components/ui/action-button-card/request-button-card";
import RequestHistoryButtonCard from "@/components/ui/action-button-card/request-history-button-card";
import MakePaymentButtonCard from "@/components/ui/action-button-card/make-payment-button-card";
import HomeNavButton from "@/components/ui/nav-buttons/home-nav-button";
import ProfileNavButton from "@/components/ui/nav-buttons/profile-nav-button";
import { redirect } from "next/navigation";
import Link from 'next/link'

export default async function HomePage() {

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex items-center max-w-xs">
        <img
          src="/logo.png"
          alt={`${"name"}'s profile`}
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <span className="text-lg font-semibold text-gray-700">{"name"}</span>
      </div>
      <div className="flex flex-col items-center max-w-xs">
        <div>
          <WalletCard name="Mario" address="1234 Main St, Springfield, USA" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <RequestButtonCard />
          <RequestHistoryButtonCard />
          <SendButtonCard />
          <MakePaymentButtonCard />
        </div>
      </div>

      <nav className="bg-gray-800 text-white py-4 fixed bottom-0 w-full">
        <div className="container mx-auto flex justify-around">
          <button> 
              Home
          </button>
          <Link href="/profilepage">Profile</Link>
          <form
            // action={async () => {
            //     "use server"
            //   redirect('/profilepage')
            // }}
          >
            <li>
        <Link href="/profilepage">Profile</Link>
      </li>
            {/* <button> 
              Profile
            </button> */}
          </form>
        </div>
      </nav>
    </div>
  );
}
