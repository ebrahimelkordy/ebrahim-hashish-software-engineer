# Environment Variables Configuration

To run this application locally and deploy it securely to Vercel, you need to configure the following environment variables.

Create a file named `.env` in the root of your project:

```env
# 1. DATABASE CONFIGURATION (Supabase PostgreSQL)
# You get these from your Supabase Project Settings -> Database
DATABASE_URL="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"

# 2. ADMIN DASHBOARD AUTHENTICATION
# Choose a username and a strong password to protect the /admin route
ADMIN_USERNAME=kordy
ADMIN_PASSWORD=my_secure_admin_password

# 3. CLOUDINARY CONFIGURATION (For Image Uploads)
# Get from Cloudinary Dashboard -> Settings
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
# Get from Cloudinary Settings -> Upload -> Upload Presets (Make sure it's "Unsigned")
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset_name
```
