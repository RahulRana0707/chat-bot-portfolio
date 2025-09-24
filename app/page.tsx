import { ChatAppView } from "@/components/views/chat-app.view";

const RootPage = () => {
  return (
    <div className="w-full h-screen grid grid-rows-[1fr_auto] overflow-hidden mx-auto md:w-[80%] lg:w-[70%] p-2">
      <ChatAppView />
    </div>
  );
};

export default RootPage;
