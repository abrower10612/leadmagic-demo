import { AppShell } from '@/components/layout/app-shell';
import { PageIntro } from '@/components/enrichment/page-intro';
import { UploadDropzone } from '@/components/enrichment/upload-dropzone';
import { EnrichmentHistory } from '@/components/enrichment/enrichment-history';

export default function ListEnrichmentPage() {
  return (
    <AppShell>
      <div className="flex w-full min-w-0 flex-col gap-4">
        <div className="flex min-h-0 flex-col gap-3">
          <PageIntro />
          <UploadDropzone />
          <EnrichmentHistory />
        </div>
      </div>
    </AppShell>
  );
}
