import { AppShell } from '@/components/layout/app-shell';
import { PageIntro } from '@/components/enrichment/page-intro';
import { UploadDropzone } from '@/components/enrichment/upload-dropzone';
import { EnrichmentHistory } from '@/components/enrichment/enrichment-history';

export default function ListEnrichmentPage() {
  return (
    <AppShell>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 p-6">
        <PageIntro />
        <UploadDropzone />
        <EnrichmentHistory />
      </div>
    </AppShell>
  );
}
