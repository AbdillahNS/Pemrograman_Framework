import { useSession } from "next-auth/react";

const HalamanProfil = () => {
  const { data }: any = useSession();
  return (
    <div>
      <h1>Halaman Profil</h1>
      <h1>Selamat datang, {data?.user?.fullname}</h1>
    </div>
  );
};

export default HalamanProfil;