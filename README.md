# armenenikolopov.com

A one-page site: index.html, the portrait in photos/, and CNAME (tells GitHub Pages the domain).

## Put it online with GitHub Pages

1. On github.com, create a new **public** repository, for example `armenenikolopov.com`.
2. In the new repository, choose **Add file → Upload files** and drag in `index.html`, `CNAME` and the `photos` folder. Commit.
3. **Settings → Pages.** Under "Build and deployment", set Source to **Deploy from a branch**, Branch to **main** and folder **/ (root)**. Save.
4. Still on the Pages screen, check that "Custom domain" says `armenenikolopov.com` (enter it and Save if not).
5. At the company where you bought the domain, set these DNS records:
   - Four **A** records for the bare domain (`@`): 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - Optional **AAAA** records for `@`: 2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153
   - A **CNAME** record for `www` pointing to `armenenikolopov.github.io`
   - Delete any other A records on `@` (for example a parking page).
6. When the Pages screen says the DNS check passed, tick **Enforce HTTPS**. This can take up to 24 hours to become available.

## Changing it later

Edit `index.html` (the paragraph and the links are near the bottom of the file) and upload it again. Adding pages later means adding files next to `index.html` and linking to them.
