import { useSession } from "next-auth/react";

const HalamanEditor = () => {
  const { data }: any = useSession();

  return (
    <div>
      <h1>Halaman Editor</h1>
      <p>Halaman ini khusus untuk role editor.</p>
      <p>Selamat datang, {data?.user?.fullname}</p>
      <p>Role: {data?.user?.role}</p>
    </div>
  );
};

export default HalamanEditor;