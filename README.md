### This site can be deployed as is to GitHub Pages

**For CloudFlare Pages, see below**

# Website Deployment to Cloudflare Pages

This guide explains how to deploy your static HTML website to Cloudflare Pages and run a cleanup script during the deployment process.

## Setup Instructions

### Step 1: Create a Cloudflare Pages Project

1. Log in to your Cloudflare account.
2. Navigate to the **Pages** section.
3. Click **Create a project**.
4. Connect your GitHub account if you haven't already.
5. Select the repository containing your website.

### Step 2: Configure the Build Settings

1. In the **Build settings** section:
   - **Build command**: `./cleanup.sh`
   - **Build output directory**: Leave this field empty since there's no build process.

2. Click **Save and Deploy**.

### Step 3: Verify Deployment

1. Wait for the deployment process to complete. You can monitor the progress in the Cloudflare Pages dashboard.
2. Once the deployment is successful, visit the provided URL to see your website live.
