import { auth } from "@/lib/auth";
import { headers } from "next/headers";


const MyBookingsPage = async () => {

    const session = await auth.api.getSession({
    headers: await headers() 
})

const user = session?.user;

// console.log("User in MyBookingsPage:", user);

const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${user?.id}`);
const data = await res.json();
console.log("Bookingsss data:", data);


    return (
        <div>
            <h1>My Bookings</h1>
        </div>
    );
};

export default MyBookingsPage;