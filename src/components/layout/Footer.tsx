import Link from "next/link";
import { Logo } from "@/components/Logo";
import { site, footerLinks } from "@/lib/site";
import { NewsletterForm } from "@/components/layout/NewsletterForm";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white py-12">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-6 md:grid-cols-4 md:px-10">
        <div>
          <Logo className="mb-6 h-7 w-auto" />
          <p className="mb-4 text-sm text-muted-foreground">{site.tagline}</p>
          <p className="text-xs text-muted-foreground">{site.registrationStatus}</p>
        </div>

        <div>
          <h4 className="mb-6 text-sm font-semibold uppercase tracking-wide text-primary">
            Organisation
          </h4>
          <ul className="space-y-3">
            {footerLinks.organisation.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground underline decoration-transparent transition-all hover:text-primary hover:decoration-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-6 text-sm font-semibold uppercase tracking-wide text-primary">Legal</h4>
          <ul className="space-y-3">
            {footerLinks.legal.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground underline decoration-transparent transition-all hover:text-primary hover:decoration-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-6 text-sm font-semibold uppercase tracking-wide text-primary">
            Stay Informed
          </h4>
          <p className="mb-4 text-sm text-muted-foreground">
            Join our mailing list for updates as we build.
          </p>
          <NewsletterForm />
          <p className="mt-4 text-sm text-muted-foreground">
            <a href={`mailto:${site.emails.info}`} className="underline hover:text-primary">
              {site.emails.info}
            </a>
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[1280px] border-t border-border px-6 pt-8 md:px-10">
        <p className="text-center text-xs text-muted-foreground md:text-left">
          © {site.founded} {site.name}. Registered Community Interest Company, England &amp;
          Wales. Company No. {site.companyNumber}.
        </p>
      </div>
    </footer>
  );
}
