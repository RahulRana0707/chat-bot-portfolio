import { codeToHtml } from "shiki";

interface CodeBlockProps {
  code?: unknown;
  lang?: unknown;
  filename?: string;
}

export async function CodeBlock({ code, lang, filename }: CodeBlockProps) {
  const codeStr = code != null ? String(code) : "";
  const langStr = lang != null ? String(lang) : "text";
  let html: string;
  try {
    html = await codeToHtml(codeStr, {
      lang: langStr === "plaintext" ? "text" : langStr,
      theme: "github-dark",
    });
  } catch {
    html = await codeToHtml(codeStr, { lang: "text", theme: "github-dark" });
  }
  return (
    <div className="my-4 overflow-hidden rounded-lg border border-border bg-[#0d1117] font-mono">
      {filename ? (
        <div className="border-b border-border bg-[#161b22] px-3 py-2 text-xs text-muted-foreground font-mono">
          {filename}
        </div>
      ) : null}
      <div
        className="overflow-x-auto p-4 text-sm font-mono [&_pre]:m-0 [&_pre]:bg-transparent"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
