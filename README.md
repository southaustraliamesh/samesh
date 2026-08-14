# SA Mesh

Static landing site for `samesh.au`, linking South Australian MeshCore users to the local wiki, dashboard and map.

## Local development

```bash
npm test
npm run build
python3 -m http.server 8788
```

## Deployment

GitHub Actions deploys the `build/` artifact to Cloudflare Pages project `samesh` using repo secrets:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`

Production is expected from `main`; the `preview` branch creates a Cloudflare Pages branch preview.
