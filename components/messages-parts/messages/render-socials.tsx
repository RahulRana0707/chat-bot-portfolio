import { Button } from "@/components/ui/button";
import { SOCIALS_CONTENT } from "@/content/socials";

export const RenderSocials = () => {
  return (
    <div className="w-full h-max flex flex-wrap gap-2">
      {SOCIALS_CONTENT.map((content) => (
        <Button
          key={content.name}
          asChild
          variant="outline"
          className="gap-2 cursor-pointer"
        >
          <a href={content.link} target="_blank" rel="noopener noreferrer">
            <content.icon className={content.iconClassName} size={14} />
            {content.name}
          </a>
        </Button>
      ))}
    </div>
  );
};
