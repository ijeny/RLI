# The Serverless Odyssey

[![Next.js 16](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Cloud%20PostgreSQL-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-CDN-3448C5?logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Edge-000000?logo=vercel&logoColor=white)](https://vercel.com/)

The Serverless Odyssey adalah fondasi proyek perkuliahan berbasis full-stack serverless. Aplikasi dirancang dengan Next.js App Router untuk pengalaman frontend modern, Supabase Cloud PostgreSQL untuk data layer, Cloudinary sebagai media CDN, dan Vercel Edge untuk deployment global.

## Arsitektur 4 Pilar

1. **Next.js 16 App Router**  
   Menyediakan routing berbasis file, React Server Components, TypeScript, Tailwind CSS, dan integrasi API/server actions sesuai kebutuhan aplikasi.

2. **Supabase Cloud PostgreSQL**  
   Menjadi database managed PostgreSQL dengan dukungan authentication, row-level security, dan akses data melalui Supabase client.

3. **Cloudinary CDN**  
   Menangani penyimpanan, optimasi, transformasi, dan distribusi aset media agar performa aplikasi tetap stabil.

4. **Vercel Edge**  
   Menyediakan deployment serverless, edge runtime, preview deployments, dan workflow CI/CD yang cocok untuk publikasi GitHub.

## Setup Lokal

Jika repository belum memiliki proyek Next.js, inisialisasi dengan perintah resmi berikut:

```bash
npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --yes
```

Setelah proyek tersedia, jalankan setup lokal:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Isi nilai variabel pada `.env.local` menggunakan kredensial dari Supabase dan Cloudinary. File `.env.local` bersifat rahasia dan tidak boleh di-commit.

## Environment Variables

Template publik tersedia di `.env.example`.

| Variable | Scope | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Public | URL project Supabase. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Anonymous key Supabase untuk client-side access dengan RLS. |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret | Service role key untuk proses server-side terkontrol. |
| `SUPABASE_DB_URL` | Secret | Connection string PostgreSQL jika diperlukan untuk migration atau server process. |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Public | Cloud name Cloudinary. |
| `CLOUDINARY_API_KEY` | Secret | API key Cloudinary untuk operasi server-side. |
| `CLOUDINARY_API_SECRET` | Secret | API secret Cloudinary, wajib disimpan hanya di environment server. |
| `CLOUDINARY_UPLOAD_PRESET` | Config | Upload preset yang digunakan aplikasi. |
| `NEXT_PUBLIC_APP_URL` | Public | URL aplikasi lokal, preview, atau production. |

## Keamanan Repository

- Jangan commit `.env`, `.env.local`, `.env.*.local`, token, private key, atau secret provider cloud.
- Jangan commit `.next/`, cache Turbopack, `node_modules/`, log error, atau file upload runtime.
- Gunakan `.env.example` sebagai kontrak konfigurasi publik tanpa nilai credential.
- Simpan secret production di Vercel Environment Variables, bukan di source code.

## Git Branch Workflow

1. Sinkronkan branch utama sebelum mulai bekerja.

```bash
git checkout main
git pull origin main
```

2. Buat branch fitur dengan nama deskriptif.

```bash
git checkout -b feat/nama-fitur
```

3. Commit perubahan kecil dan terarah.

```bash
git add .
git commit -m "feat: add nama fitur"
```

4. Push branch dan buka pull request.

```bash
git push -u origin feat/nama-fitur
```

## Gitignore Protection Test

Jalankan perintah bash satu baris berikut sebelum commit pertama untuk memastikan file sensitif benar-benar diabaikan:

```bash
test "$(printf '%s\n' .env .env.local .env.production.local .next/cache/trace node_modules/pkg/index.js npm-debug.log | git check-ignore --stdin --no-index | wc -l)" -eq 6 && echo "gitignore protection OK"
```
