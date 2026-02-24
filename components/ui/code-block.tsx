import { codeToHtml } from "shiki";

import { CodeBlockHeader } from "@/components/ui/code-block-header";

interface CodeBlockProps {
  code?: unknown;
  lang?: unknown;
  filename?: string;
}

const shikiLang = (lang: string) => (lang === "plaintext" ? "text" : lang);

export async function CodeBlock({ code, lang, filename }: CodeBlockProps) {
  const codeStr = code != null ? String(code) : "";
  const langStr = lang != null ? String(lang) : "text";
  const langForShiki = shikiLang(langStr);

  let htmlLight: string;
  let htmlDark: string;
  try {
    [htmlLight, htmlDark] = await Promise.all([
      codeToHtml(codeStr, { lang: langForShiki, theme: "github-light" }),
      codeToHtml(codeStr, { lang: langForShiki, theme: "houston" }),
    ]);
  } catch {
    htmlLight = await codeToHtml(codeStr, { lang: "text", theme: "github-light" });
    htmlDark = await codeToHtml(codeStr, { lang: "text", theme: "houston" });
  }

  return (
    <div className="my-4 overflow-hidden rounded-lg border border-border bg-card font-mono">
      <CodeBlockHeader lang={langStr} filename={filename} code={codeStr} />
      <div className="overflow-x-auto p-4 text-sm font-mono [&_pre]:m-0 [&_pre]:!bg-transparent [&_pre_code]:!bg-transparent">
        <div className="dark:hidden" dangerouslySetInnerHTML={{ __html: htmlLight }} />
        <div className="hidden dark:block" dangerouslySetInnerHTML={{ __html: htmlDark }} />
      </div>
    </div>
  );
}
