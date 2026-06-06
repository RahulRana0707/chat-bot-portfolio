import { File } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PROFILE } from "@/content/profile";

export const RenderResumeDownloadButton = () => {
  const onDownloadResume = () => {
    const link = document.createElement("a");
    link.href = PROFILE.resume.url;
    link.download = PROFILE.resume.downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast("Resume downloaded", {
      position: "top-center",
      icon: <File className="w-4 h-4" />,
      richColors: true,
      description: "Check your downloads folder",
    });
  };
  return (
    <Button
      onClick={onDownloadResume}
      variant="outline"
      size="sm"
      className="cursor-pointer"
    >
      <File />
      Download Resume
    </Button>
  );
};
