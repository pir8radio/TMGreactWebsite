import { Faq } from "@/features/faq";
import { SEOMetaTags } from "@/app/components/SEOMetaTags";

export default function FaqPage() {
  return (
    <>
      <SEOMetaTags title="Frequently Asked Questions • TMG" />
      <Faq />
    </>
  );
}
