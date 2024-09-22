import {useState} from "react";

export default function Session({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    const [session, setSession] = useState(null);

    return(
        {children}
    );
}