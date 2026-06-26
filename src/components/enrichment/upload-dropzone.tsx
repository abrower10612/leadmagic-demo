'use client';

import * as React from 'react';
import { FileText, ArrowUp, Download, ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * The CSV drop target with the radar background, file/upload icon, copy,
 * Sample CSV button + Upload guide link.
 *
 * CORE interaction: dropping or selecting a CSV will open the "Submit new
 * enrichment" config modal (wired in a later step). For now it captures the
 * file and exposes a hook point.
 */
export function UploadDropzone() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = React.useState(false);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    // TODO (next step): open the enrichment config modal with files[0].
  }

  return (
    <section
      role="button"
      tabIndex={0}
      aria-label="Upload a CSV"
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={cn(
        'relative flex min-h-[300px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed px-5 py-10 text-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-[330px] sm:px-6',
        dragging
          ? 'border-primary bg-primary/5'
          : 'border-border/50 bg-background hover:border-border/70'
      )}
    >
      {/* Radar rings + soft glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex animate-[radar-pulse_4s_ease-in-out_infinite] items-center justify-center"
      >
        <div className="absolute size-[11rem] rounded-full border border-border/60" />
        <div className="absolute size-[17rem] rounded-full border border-border/40" />
        <div className="absolute size-[24rem] rounded-full border border-border/25" />
        <div className="absolute size-[32rem] rounded-full border border-border/15" />
        <div className="absolute size-[20rem] rounded-full bg-[radial-gradient(circle,rgba(250,250,250,0.05),transparent_70%)]" />
      </div>

      {/* File + upload icon */}
      <div className="relative z-10 mb-5">
        <div className="relative">
          <FileText
            className="size-12 text-muted-foreground/70"
            strokeWidth={1.25}
          />
          <span className="absolute -right-2.5 -bottom-1 flex size-7 items-center justify-center rounded-full bg-primary ring-4 ring-background">
            <ArrowUp className="size-4 text-primary-foreground" />
          </span>
        </div>
      </div>

      <h2 className="relative z-10 text-lg font-semibold text-foreground">
        Drop your CSV here
      </h2>
      <p className="relative z-10 mt-1 text-sm text-muted-foreground">
        or click to browse
      </p>

      <p className="relative z-10 mt-4 max-w-md text-xs leading-relaxed text-muted-foreground">
        {
          'CSV · UTF-8 · up to 50 MB · 25,000 rows max. Include at least one of: work email, B2B profile URL with /in/, or name + company domain for best results.'
        }
      </p>

      <div className="relative z-10 mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
        <Button
          variant="outline"
          className="h-9 gap-1.5"
          onClick={(e) => {
            e.stopPropagation();
            inputRef.current?.click();
          }}
        >
          <Download className="size-4" />
          Sample CSV
        </Button>
        <a
          href="#"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Upload guide
          <ExternalLink className="size-3.5" />
        </a>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </section>
  );
}
