import { codeToHtml } from "shiki";

interface CodeBlockProps {
  code: string;
  lang?: string;
  filename?: string;
}

export async function CodeBlock({
  code,
  lang = "text",
  filename,
}: CodeBlockProps) {
  const codeStr = typeof code === "string" ? code : String(code ?? "");
  const langStr = typeof lang === "string" ? lang : "text";
  const html = await codeToHtml(codeStr, {
    lang: langStr,
    theme: "github-dark",
  });

  return (
    <div className="relative my-4 rounded-lg border bg-zinc-950 overflow-hidden">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
            <span className="text-xs text-zinc-400 font-mono ml-2">
              {filename}
            </span>
          </div>
          <div className="text-[10px] text-zinc-600 font-mono hidden sm:block">
            {lang.toUpperCase()}
          </div>
        </div>
      )}
      {!filename && (
        <div className="absolute top-3 right-3 text-[10px] text-zinc-600 font-mono uppercase">
          {lang}
        </div>
      )}
      <div
        className="text-sm overflow-x-auto p-4 [&>pre]:!bg-transparent [&>pre]:!p-0"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output is trusted
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
