import { RecentDeadlines } from "@/features/recentDeadlines";
import { SEOMetaTags } from "@/app/components/SEOMetaTags";

export default function RecentDeadlinesPage() {
  return (
    <>
      <SEOMetaTags title="Recent Deadlines • TMG" />
      <RecentDeadlines />
    </>
  );
}
