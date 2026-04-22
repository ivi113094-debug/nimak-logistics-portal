import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { buildSiteContent, defaultSiteContent, type LocalizedSiteContent } from "@/content/siteContent";
import type { Tables } from "@/integrations/supabase/types";

type SiteContentRow = Tables<"site_content">;

export const useSiteContent = () => {
  const [content, setContent] = useState<LocalizedSiteContent>(defaultSiteContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadContent = async () => {
      const { data, error: queryError } = await supabase.from("site_content").select("*");

      if (!mounted) return;

      if (queryError) {
        setError(queryError.message);
        setContent(defaultSiteContent);
      } else {
        setError(null);
        setContent(buildSiteContent(data as SiteContentRow[]));
      }

      setLoading(false);
    };

    void loadContent();

    return () => {
      mounted = false;
    };
  }, []);

  return { content, setContent, loading, error };
};
