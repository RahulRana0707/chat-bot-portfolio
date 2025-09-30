import { Label } from "@/components/ui/label";
import { PERSOANL_DETAILS_CONTENT } from "@/content/personal-details";
import { useCallback } from "react";
import type { IMessageRendererProps } from "@/components/messages-parts";

export const RenderPersonalDetails = ({
  generatedText,
}: IMessageRendererProps) => {
  const doesContentIncludeInGeneratedText = useCallback(
    (value: string) => {
      if (generatedText.includes(value)) return true;
      return false;
    },
    [generatedText],
  );

  return (
    <div className="flex flex-col gap-y-3">
      {PERSOANL_DETAILS_CONTENT.map((item) => {
        const shouldSkip = doesContentIncludeInGeneratedText(item.value);
        if (shouldSkip) return null;
        return (
          <Label key={item.name}>
            {item.name}: {item.value}
          </Label>
        );
      })}
    </div>
  );
};
