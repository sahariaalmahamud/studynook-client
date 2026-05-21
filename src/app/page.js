import AvailableRooms from "@/components/AvailableRooms";
import Hero from "@/components/Hero";
import HomeFeatures from "@/components/HomeFeatures";
import HomeTrust from "@/components/HomeTrust";

export default function Home() {
  return (
    <div>
      <Hero />
      <HomeFeatures />
      <AvailableRooms />
      <HomeTrust />
    </div>
  );
}
