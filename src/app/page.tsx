import { AppShell } from '@/components/layout/app-shell';
import { PageIntro } from '@/components/enrichment/page-intro';
import { UploadDropzone } from '@/components/enrichment/upload-dropzone';
import { EnrichmentHistory } from '@/components/enrichment/enrichment-history';

export default function ListEnrichmentPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-4 p-4 sm:gap-6 sm:p-6">
        <PageIntro />
        <UploadDropzone />
        <EnrichmentHistory />
      </div>
    </AppShell>
  );
}
