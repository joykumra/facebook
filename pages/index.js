import Head from "next/head";
import Header from "../components/Header/Header";
import { useSession } from "next-auth/react";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar/Sidebar";
import Feed from "../components/Feed/Feed";
import Widgets from "../components/Widgets/Widgets";

export default function Home() {
  const { data: session } = useSession();

  if (!session) return <Login></Login>;

  return (
    <div>
      <Head>
        <title>Facebook</title>
      </Head>
      <Header></Header>

      <main className="flex bg-gray-50">
        <Sidebar />
        <Feed />
        <Widgets />
      </main>
    </div>
  );
}
