import { contentRegistry, getRegistryPages } from "@/lib/content-registry";
import { getContentMap } from "@/lib/content";
import { ContentField } from "@/components/admin/ContentField";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const fallbacks = Object.fromEntries(contentRegistry.map((f) => [f.key, f.default]));
  const values = await getContentMap(fallbacks);
  const pages = getRegistryPages();

  return (
    <div>
      <h1 className="mb-2 font-heading text-2xl font-semibold text-primary">Content</h1>
      <p className="mb-8 text-muted-foreground">
        Every field here is live on the public site. Edits apply immediately after you hit Save
        on that field.
      </p>

      <div className="space-y-4">
        {pages.map((page, i) => {
          const fields = contentRegistry.filter((f) => f.page === page);
          return (
            <details key={page} className="rounded-2xl bg-card shadow-sm" open={i === 0}>
              <summary className="cursor-pointer list-none rounded-2xl px-6 py-4 font-heading font-semibold text-primary marker:content-none">
                {page}{" "}
                <span className="ml-2 text-xs font-normal text-muted-foreground">
                  ({fields.length} field{fields.length === 1 ? "" : "s"})
                </span>
              </summary>
              <div className="border-t border-border px-6">
                {fields.map((field) => (
                  <ContentField key={field.key} field={field} initialValue={values[field.key]} />
                ))}
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}
