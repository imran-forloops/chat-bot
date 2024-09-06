import Configuration from "@/components/Configuration";
import Chatbot from "@/components/Chatbot";
import LogoutButton from "@/components/LogoutButton";

export default function Home() {
  //
  return (
    <div className="h-screen overflow-hidden">
      <main className="mx-auto max-w-7xl  px-4 md:px-6 lg:px-8 h-[calc(100%-4rem)]">
        <Chatbot />
      </main>
    </div>
  );
}
