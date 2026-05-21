export const fetchRooms = async () => {
  // console.log();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`);
  const data = await res.json();
  return data || [];
};


export const fetchAvailableRooms = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/available-rooms`);
  const data = await res.json();
  return data || [];
};