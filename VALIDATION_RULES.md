# 🚨 VALIDATION RULES & CHECKLIST

## ⚠️ **MANDATORY: Always Follow These Rules Before ANY Changes**

### **🔒 Rule 1: Code Validation (REQUIRED)**
- [ ] **NO LINTER ERRORS** - All TypeScript/ESLint errors must be fixed
- [ ] **Type Safety** - All variables properly typed, no `any` types without justification
- [ ] **Import Paths** - All imports use correct relative paths (`../` not `~/`)
- [ ] **Function Signatures** - All functions have proper parameter and return types

### **🔒 Rule 2: Testing Validation (REQUIRED)**
- [ ] **Test Locally** - Run `npm run dev` and test the specific functionality
- [ ] **Check Console** - No errors in browser console or terminal
- [ ] **API Endpoints** - Test all modified API endpoints with real data
- [ ] **Database Queries** - Verify database operations work correctly
- [ ] **Error Handling** - Test error scenarios and edge cases

### **🔒 Rule 3: Performance Validation (REQUIRED)**
- [ ] **Response Times** - API endpoints respond within timeout limits
- [ ] **Memory Usage** - No memory leaks or excessive resource usage
- [ ] **Database Performance** - Queries don't hang or take too long
- [ ] **Bundle Size** - No unnecessary large dependencies added

### **🔒 Rule 4: Security Validation (REQUIRED)**
- [ ] **Input Validation** - All user inputs are properly sanitized
- [ ] **SQL Injection** - No raw SQL queries, use Prisma safely
- [ ] **CORS Headers** - Public APIs have proper CORS configuration
- [ ] **Authentication** - Protected routes require proper auth

## 📝 **PRE-SAVE CHECKLIST (Before Saving Any File)**

### **Code Quality:**
- [ ] No syntax errors
- [ ] Proper indentation and formatting
- [ ] Meaningful variable names
- [ ] No commented-out code
- [ ] Proper error handling

### **TypeScript:**
- [ ] All imports resolve correctly
- [ ] No type mismatches
- [ ] Proper interface definitions
- [ ] No `any` types (unless absolutely necessary)

### **Functionality:**
- [ ] Logic is correct and complete
- [ ] Edge cases handled
- [ ] Error scenarios covered
- [ ] Performance considerations applied

## 🚀 **PRE-COMMIT CHECKLIST (Before Git Commit)**

### **Code Review:**
- [ ] All validation rules passed
- [ ] Changes are minimal and focused
- [ ] No debug code or console.logs (unless intentional)
- [ ] Proper commit message format

### **Testing:**
- [ ] Local development server runs without errors
- [ ] Modified functionality works as expected
- [ ] No breaking changes to existing features
- [ ] Database operations work correctly

### **Documentation:**
- [ ] Code is self-documenting
- [ ] Complex logic has comments
- [ ] API changes documented if needed

## 🚀 **PRE-DEPLOY CHECKLIST (Before Heroku/Production)**

### **Final Validation:**
- [ ] All previous checklists completed
- [ ] Production build succeeds (`npm run build`)
- [ ] No TypeScript compilation errors
- [ ] All tests pass (if applicable)

### **Environment:**
- [ ] Environment variables are correct
- [ ] Database connections work
- [ ] External API keys are valid
- [ ] CORS settings are appropriate

### **Monitoring:**
- [ ] Logging is in place for debugging
- [ ] Error handling is comprehensive
- [ ] Performance metrics are available

## 🚨 **EMERGENCY ROLLBACK PLAN**

### **If Issues Occur:**
1. **Immediate**: Revert to last working commit
2. **Investigate**: Check logs and error messages
3. **Fix**: Apply corrections locally first
4. **Test**: Validate fixes thoroughly
5. **Redeploy**: Only after full validation

## 📊 **COMMIT MESSAGE FORMAT**

```
type(scope): brief description

- Use conventional commit types: feat, fix, docs, style, refactor, test, chore
- Keep description under 50 characters
- Add detailed description in body if needed

Examples:
fix(api): add timeout protection to prevent H27 errors
feat(analytics): implement new tracking system
refactor(db): optimize database queries for better performance
```

## ⚡ **QUICK VALIDATION COMMANDS**

```bash
# Check for TypeScript errors
npm run build

# Check for linting issues
npm run lint

# Test local development
npm run dev

# Check database connection
npm run prisma:studio

# Validate API endpoints
curl -X GET "http://localhost:3000/api/health"
```

## 🎯 **PRIORITY LEVELS**

### **🔴 CRITICAL (Must Fix Before Any Deployment)**
- Linter errors
- TypeScript compilation errors
- Database connection failures
- Security vulnerabilities

### **🟡 HIGH (Fix Before Production)**
- Performance issues
- Error handling gaps
- Missing validation
- API response timeouts

### **🟢 MEDIUM (Fix in Next Iteration)**
- Code style improvements
- Documentation updates
- Minor optimizations
- UI/UX enhancements

---

## ⚠️ **REMEMBER: NEVER SKIP VALIDATION STEPS**

**"It works on my machine" is NOT an excuse for production issues.**

**Always validate, test, and confirm before deploying.**
