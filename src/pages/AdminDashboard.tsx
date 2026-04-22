import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Loader2, LogOut, RotateCcw, Save, ShieldAlert } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useToast } from "@/hooks/use-toast";
import {
  defaultSiteContent,
  flattenSiteContent,
  localeLabels,
  sectionDefinitions,
  type FeatureItem,
  type LocalizedSiteContent,
  type NavLinkItem,
  type SiteContent,
  type SiteLocale,
} from "@/content/siteContent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const cloneContent = (content: LocalizedSiteContent): LocalizedSiteContent =>
  JSON.parse(JSON.stringify(content)) as LocalizedSiteContent;

const localeOptions: SiteLocale[] = ["mk", "en"];

const ListEditor = ({
  items,
  itemLabel,
  onChange,
}: {
  items: FeatureItem[] | NavLinkItem[];
  itemLabel: string;
  onChange: (next: FeatureItem[] | NavLinkItem[]) => void;
}) => {
  const isNavList = items.every((item) => "label" in item && "href" in item);

  const updateItem = (index: number, key: "title" | "desc" | "label" | "href", value: string) => {
    const next = items.map((item, currentIndex) => (currentIndex === index ? { ...item, [key]: value } : item));
    onChange(next);
  };

  const addItem = () => {
    onChange(
      isNavList
        ? [...items, { label: `Нов ${itemLabel}`, href: "#section" }]
        : [...items, { title: `Нова ${itemLabel}`, desc: "Ажурирај го овој опис." }],
    );
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, currentIndex) => currentIndex !== index));
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={`${itemLabel}-${index}`} className="rounded-lg border border-border bg-muted/40 p-4 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-foreground">
              {itemLabel} {index + 1}
            </p>
            <Button type="button" variant="ghost" size="sm" onClick={() => removeItem(index)}>
              Избриши
            </Button>
          </div>

          {"label" in item ? (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Текст</Label>
                <Input value={item.label} onChange={(event) => updateItem(index, "label", event.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Anchor</Label>
                <Input value={item.href} onChange={(event) => updateItem(index, "href", event.target.value)} />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Наслов</Label>
                <Input value={item.title} onChange={(event) => updateItem(index, "title", event.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Опис</Label>
                <Textarea rows={3} value={item.desc} onChange={(event) => updateItem(index, "desc", event.target.value)} />
              </div>
            </div>
          )}
        </div>
      ))}

      <Button type="button" variant="outline" onClick={addItem}>
        Додај {itemLabel}
      </Button>
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const { content: loadedContent, setContent: setLoadedContent, loading: contentLoading, error } = useSiteContent();
  const [draft, setDraft] = useState<LocalizedSiteContent>(defaultSiteContent);
  const [saving, setSaving] = useState(false);
  const [activeLocale, setActiveLocale] = useState<SiteLocale>("mk");

  useEffect(() => {
    setDraft(cloneContent(loadedContent));
  }, [loadedContent]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/admin/login");
    }
  }, [authLoading, navigate, user]);

  const hasUnsavedChanges = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(loadedContent),
    [draft, loadedContent],
  );

  if (authLoading || contentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background px-4 py-12">
        <Card className="mx-auto max-w-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <ShieldAlert className="h-6 w-6 text-red-600" />
              Потребен е админ пристап
            </CardTitle>
            <CardDescription>
              Овој корисник е најавен, но нема `admin` улога за менување на содржината на веб-страницата.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button onClick={() => navigate("/admin/login")}>Назад на најава</Button>
            <Button variant="outline" onClick={() => void signOut()}>
              Одјави се
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const updateField = <TSection extends keyof SiteContent, TField extends keyof SiteContent[TSection]>(
    locale: SiteLocale,
    section: TSection,
    field: TField,
    value: SiteContent[TSection][TField],
  ) => {
    setDraft((current) => ({
      ...current,
      [locale]: {
        ...current[locale],
        [section]: {
          ...current[locale][section],
          [field]: value,
        },
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);

    const { error: saveError } = await supabase
      .from("site_content")
      .upsert(flattenSiteContent(draft), { onConflict: "section,field_key" });

    if (saveError) {
      toast({
        title: "Неуспешно зачувување",
        description: saveError.message,
        variant: "destructive",
      });
    } else {
      setLoadedContent(cloneContent(draft));
      toast({
        title: "Успешно зачувано",
        description: "Содржината за двата јазика е ажурирана.",
      });
    }

    setSaving(false);
  };

  const handleReset = () => {
    setDraft(cloneContent(loadedContent));
    toast({
      title: "Промените се вратени",
      description: "Едиторот е вратен на последно зачуваната верзија.",
    });
  };

  const activeContent = draft[activeLocale];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-white/10 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 lg:px-8">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.24em] text-red-300">NIMAK content admin</p>
            <h1 className="text-2xl font-semibold text-white">Админ панел за одржување на веб-страницата</h1>
            <p className="text-sm text-slate-400">Уредувај македонска и англиска содржина од едно место.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" className="border-white/15 bg-transparent text-white hover:bg-white/10" asChild>
              <Link to="/" target="_blank" rel="noreferrer">
                <Eye className="mr-2 h-4 w-4" />
                Преглед на сајт
              </Link>
            </Button>
            <Button variant="outline" className="border-white/15 bg-transparent text-white hover:bg-white/10" onClick={handleReset} disabled={!hasUnsavedChanges}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Врати промени
            </Button>
            <Button className="bg-red-600 text-white hover:bg-red-500" onClick={handleSave} disabled={saving || !hasUnsavedChanges}>
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              {saving ? "Се зачувува..." : "Зачувај"}
            </Button>
            <Button variant="ghost" className="text-slate-300 hover:bg-white/10 hover:text-white" onClick={() => void signOut().then(() => navigate("/admin/login"))}>
              <LogOut className="mr-2 h-4 w-4" />
              Одјави се
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
        <aside className="space-y-4">
          <Card className="border-white/10 bg-white/5 text-slate-50">
            <CardHeader>
              <CardTitle className="text-lg">Резиме</CardTitle>
              <CardDescription className="text-slate-400">
                Одржувај ги двете јазични верзии синхронизирани и ажурирани.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <p>{hasUnsavedChanges ? "Имате незачувани промени." : "Сите промени се зачувани."}</p>
              <p>{error ? `Се користи fallback содржина поради Supabase грешка: ${error}` : "Содржината е успешно вчитана од Supabase."}</p>
              <p>Најавен корисник: {user.email}</p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 text-slate-50">
            <CardHeader>
              <CardTitle className="text-lg">Јазик за уредување</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="inline-flex rounded-full border border-white/15 bg-white/5 p-1">
                {localeOptions.map((locale) => (
                  <button
                    key={locale}
                    type="button"
                    onClick={() => setActiveLocale(locale)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                      activeLocale === locale ? "bg-white text-slate-950" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {locale}
                  </button>
                ))}
              </div>
              <p className="text-sm text-slate-300">Моментално уредувате: {localeLabels[activeLocale]}</p>
            </CardContent>
          </Card>
        </aside>

        <Tabs defaultValue={sectionDefinitions[0].key} className="space-y-6">
          <TabsList className="h-auto w-full justify-start overflow-x-auto bg-white/5 p-1">
            {sectionDefinitions.map((section) => (
              <TabsTrigger key={section.key} value={section.key} className="data-[state=active]:bg-white data-[state=active]:text-slate-950">
                {section.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {sectionDefinitions.map((section) => {
            const sectionContent = activeContent[section.key] as Record<string, unknown>;

            return (
              <TabsContent key={section.key} value={section.key}>
                <Card className="border-white/10 bg-white text-slate-950">
                  <CardHeader>
                    <CardTitle>{section.label}</CardTitle>
                    <CardDescription>
                      {section.description} Јазик: {localeLabels[activeLocale]}.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {section.fields.map((field) => {
                      const value = sectionContent[field.key];

                      if (field.type === "list" && Array.isArray(value)) {
                        return (
                          <div key={field.key} className="space-y-2">
                            <Label>{field.label}</Label>
                            <ListEditor
                              items={value as FeatureItem[] | NavLinkItem[]}
                              itemLabel={field.itemLabel ?? "елемент"}
                              onChange={(next) => updateField(activeLocale, section.key, field.key as never, next as never)}
                            />
                          </div>
                        );
                      }

                      if (field.type === "textarea") {
                        return (
                          <div key={field.key} className="space-y-2">
                            <Label>{field.label}</Label>
                            <Textarea
                              rows={4}
                              value={String(value ?? "")}
                              onChange={(event) => updateField(activeLocale, section.key, field.key as never, event.target.value as never)}
                            />
                          </div>
                        );
                      }

                      return (
                        <div key={field.key} className="space-y-2">
                          <Label>{field.label}</Label>
                          <Input
                            value={String(value ?? "")}
                            onChange={(event) => updateField(activeLocale, section.key, field.key as never, event.target.value as never)}
                          />
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
