import { Button } from "@heroui/react";
import { ArrowRight } from "lucide-react";

import { fetchAvailableRooms } from "@/lib/rooms/data";
import AvailableRoomCard from "./AvailableRoomCard";



const AvailableRooms = async () => {
    const rooms = await fetchAvailableRooms();
    // console.log(rooms);

    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div className="space-y-4">
                        <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm">Top Rated</h2>
                        <h3 className="text-4xl font-extrabold text-slate-900">Available Rooms</h3>
                        <p className="text-slate-500 max-w-xl">
                            Handpicked premium rooms designed to help you master the most in-demand skills in the industry today.
                        </p>
                    </div>
                    <Button
                        variant="flat"
                        color="primary"
                        className="rounded-full font-bold group"
                    >
                        View All Rooms <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {
                        rooms?.map(room => <AvailableRoomCard key={room?._id} room={room} />)
                    }

                </div>
            </div>
        </section>
    );
};

export default AvailableRooms;