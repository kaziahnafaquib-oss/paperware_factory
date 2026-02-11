#!/bin/bash

# 🚀 Quick Deployment Script for Paperware Factory
# This script will help you deploy your website to Vercel

echo "🚀 Paperware Factory - Quick Deploy Script"
echo "=========================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "📦 Vercel CLI not found. Installing..."
    npm install -g vercel
    echo "✅ Vercel CLI installed!"
else
    echo "✅ Vercel CLI already installed"
fi

echo ""
echo "🏗️  Building production version..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🌐 Ready to deploy!"
    echo ""
    echo "Choose deployment option:"
    echo "1. Deploy to Vercel (recommended)"
    echo "2. Preview production build locally"
    echo ""
    read -p "Enter your choice (1 or 2): " choice
    
    case $choice in
        1)
            echo ""
            echo "🚀 Deploying to Vercel..."
            echo "Follow the prompts to complete deployment"
            echo ""
            vercel --prod
            ;;
        2)
            echo ""
            echo "👀 Starting local preview..."
            echo "Your site will be available at http://localhost:4173"
            echo "Press Ctrl+C to stop"
            echo ""
            npx vite preview
            ;;
        *)
            echo "Invalid choice. Exiting."
            exit 1
            ;;
    esac
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
