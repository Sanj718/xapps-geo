# 🚀 Project Instructions for AI Agent

## 🎯 **Core Principles**
- **Always validate before saving** - No exceptions
- **Test locally first** - Run `npm run dev` before any changes
- **Fix linter errors** - Zero tolerance for TypeScript/ESLint issues
- **Performance first** - Prevent H27 errors and optimize response times

## 🔒 **Mandatory Validation Steps**
1. **Before Saving**: Check for syntax errors and type issues
2. **Before Committing**: Run `npm run build` and `npm run lint`
3. **Before Deploying**: Complete full validation checklist
4. **Always Test**: Verify functionality works as expected

## 🚨 **H27 Error Prevention**
- **All public APIs** must have timeout protection
- **Shop APIs**: 8 second timeout, 1 minute cache
- **Markets APIs**: 10 second timeout, 2 minute cache
- **Analytics APIs**: 5 second timeout, 1 minute cache
- **Static APIs**: 3 second timeout, 1 hour cache

## 📝 **Code Standards**
- Use TypeScript for all new files
- Import paths: `../` not `~/`
- Proper error handling for all async operations
- No `any` types without justification
- Use Prisma safely, no raw SQL

## 🧪 **Testing Requirements**
- Test all modified functionality locally
- Verify API endpoints respond correctly
- Check database operations work
- No console errors in browser/terminal
- Test error scenarios and edge cases

## 🚀 **Deployment Rules**
- **NEVER deploy** without full validation
- **Always test** production build locally
- **Monitor logs** after deployment
- **Have rollback plan** ready

## ⚠️ **Remember**
**"It works on my machine" is NOT acceptable**
**Always validate, test, and confirm before deploying**
