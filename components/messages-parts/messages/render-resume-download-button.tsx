import React from "react";

import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
import { toast } from "sonner";

export const RenderResumeDownloadButton = () => {
  const onDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/rahul_rana_wd_resume.pdf";
    link.download = "Rahul_Rana_Resume.pdf";
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
