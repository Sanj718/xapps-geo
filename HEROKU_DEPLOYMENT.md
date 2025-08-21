# 🚀 Heroku Deployment Guide for Shopify App

## 📋 Prerequisites

1. **Heroku Account**: [Sign up here](https://signup.heroku.com/)
2. **Heroku CLI**: Install from [here](https://devcenter.heroku.com/articles/heroku-cli)
3. **Git Repository**: Your code should be in a Git repo
4. **Shopify Partner Account**: To manage your app

## 🔧 Step-by-Step Deployment

### 1. Install Heroku CLI
```bash
# macOS (using Homebrew)
brew tap heroku/brew && brew install heroku

# Or download from Heroku website
```

### 2. Login to Heroku
```bash
heroku login
```

### 3. Create Heroku App
```bash
# Navigate to your project directory
cd /Users/sanjar/Documents/Personal/shopifyapps/redirects/xapps-geo-ts

# Create a new Heroku app
heroku create your-app-name-here

# Or let Heroku generate a name
heroku create
```

### 4. Add PostgreSQL Database
```bash
# Add PostgreSQL addon to Heroku
heroku addons:create heroku-postgresql:mini

# This will automatically set DATABASE_URL
```

### 5. Configure Environment Variables
```bash
# Set your Shopify app credentials
heroku config:set SHOPIFY_API_KEY="your_api_key"
heroku config:set SHOPIFY_API_SECRET="your_api_secret"
heroku config:set SHOPIFY_APP_URL="https://your-app-name.herokuapp.com"
heroku config:set SCOPES="read_files,read_locales,read_markets,read_themes,write_files"

# Set other required variables
heroku config:set NODE_ENV="production"
heroku config:set APP_HANDLE="your_app_handle"

# Optional: Custom shop domain
heroku config:set SHOP_CUSTOM_DOMAIN="your_custom_domain"
```

### 6. Deploy Your App
```bash
# Add Heroku remote to Git
heroku git:remote -a your-app-name-here

# Commit your changes
git add .
git commit -m "Prepare for Heroku deployment"

# Push to Heroku
git push heroku main

# Or if you're on master branch
git push heroku master
```

### 7. Run Database Migrations
```bash
# Run Prisma migrations
heroku run npm run setup
```

### 8. Open Your App
```bash
heroku open
```

## 🔍 Troubleshooting

### Check Logs
```bash
heroku logs --tail
```

### Check Environment Variables
```bash
heroku config
```

### Restart App
```bash
heroku restart
```

### Check App Status
```bash
heroku ps
```

## 📱 Shopify App Configuration

After deployment, you need to:

1. **Update Shopify Partner Dashboard**:
   - Go to your app in [Shopify Partners](https://partners.shopify.com/)
   - Update the App URL to: `https://your-app-name.herokuapp.com`
   - Update the Allowed redirection URLs to include:
     - `https://your-app-name.herokuapp.com/auth/callback`
     - `https://your-app-name.herokuapp.com/auth/shopify/callback`
     - `https://your-app-name.herokuapp.com/api/auth/callback`

2. **Test Installation**:
   - Install your app on a test store
   - Verify all functionality works

## 🔄 Continuous Deployment

To set up automatic deployments:

```bash
# Connect to GitHub
heroku pipelines:create your-pipeline-name
heroku pipelines:add your-pipeline-name -a your-app-name-here

# Enable GitHub integration in Heroku dashboard
# Go to: https://dashboard.heroku.com/apps/your-app-name-here/deploy/github
```

## 💰 Cost Management

- **PostgreSQL Mini**: $5/month
- **Dyno (Basic)**: $7/month
- **Total**: ~$12/month

## 🚨 Important Notes

1. **Environment Variables**: Never commit `.env` files to Git
2. **Database**: Heroku PostgreSQL has data limits on free tier
3. **Cron Jobs**: Heroku free tier doesn't support background processes
4. **File Storage**: Heroku has ephemeral filesystem - don't store files locally

## 📞 Support

If you encounter issues:
1. Check Heroku logs: `heroku logs --tail`
2. Check app status: `heroku ps`
3. Restart app: `heroku restart`
4. Contact Heroku support if needed

## 🎉 Success!

Once deployed, your Shopify app will be available at:
`https://your-app-name.herokuapp.com`

Remember to update your Shopify Partner Dashboard with the new URL!
