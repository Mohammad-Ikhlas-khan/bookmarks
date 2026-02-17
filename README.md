# 🔖 Bookmark Manager (Next.js + Supabase)
# Description:
## A full-stack bookmark manager built with:
### - Next.js (App Router)
### - Supabase (Auth + PostgreSQL)
### - Google OAuth
### - Row Level Security (RLS)

# 🚀 PROJECT SETUP

### 1️⃣ Clone Repository and Navigate to the Project Directory
```bash
git clone https://github.com/Mohammad-Ikhlas-khan/bookmarks.git
cd my-app
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Create .env file
```bash
touch .env
```

#### Add the following inside .env:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

### Restart server after adding env
```bash
npm run dev
```

# 🗄️ DATABASE SETUP (Supabase SQL Editor)

### Create 2 Tables
#### 1.users with columns id,created_at and email


#### 2.BookMarks with columns id,created_at,url,title and user_id(Foreign key)


### Enable Row Level Security
```bash
alter table "BookMarks" enable row level security;
```

### INSERT Policy
```bash
create policy "Enable insert for users based on user_id"
on "public"."BookMarks"
as permissive
for insert
to authenticated
with check (
  auth.uid() = user_id
);
```

### SELECT Policy
```bash
create policy "Enable select for users based on user_id"
on "public"."BookMarks"
as permissive
for select
to authenticated
using (
  auth.uid() = user_id
);
```

# 🔐 GOOGLE AUTH SETUP

### In Supabase Dashboard:
# Authentication → Providers → Google → Enable

# Add Redirect URL:
http://localhost:3000/auth/callback

# 🌐 RUN APPLICATION
```bash
npm run dev
```

### Visit: http://localhost:3000

# ⚠️ PROBLEMS I FACED & SOLUTIONS

## ❌ 1. 404 After Google Login
#### Cause: Missing /auth/callback route in App Router
#### Fix: Created app/auth/callback/page.tsx

## ❌ 2. User Logged In But No Insert
#### Cause: RLS blocking insert
#### Fix: Added INSERT policy with:
#### with check (auth.uid() = user_id)


## ❌ 3. 403 Forbidden Error
#### Cause: Missing SELECT policy
#### Fix: Added SELECT policy

## ❌ 4. UI Session Loading Lazily
#### Cause: getSession() is async
#### Fix: Added loading state before rendering UI

## ❌ 5. Invalid URLs Being Inserted
#### Fix: Added CHECK constraint

```bash
ALTER TABLE "BookMarks"
ADD CONSTRAINT valid_url_check
CHECK (
  url ~* '^https:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(/[^\s]*)?$'
);
```

# 👨‍💻 Author

### Mohammad Ikhlas Khan
