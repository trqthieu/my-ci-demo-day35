# 🚀 My CI Demo - GitHub Actions Practice

Demo Node.js API với GitHub Actions CI workflow. Project này được tạo để thực hành theo **Ngày 35 - Tình huống 1: Startup cần CI tự động**.

## 📋 Mô Tả

Simple REST API với Express.js:
- ✅ ESLint để check code quality
- ✅ Jest tests với coverage
- ✅ GitHub Actions CI tự động
- ✅ Branch protection ready

## 🏗️ Cấu Trúc Project

```
my-ci-demo/
├── .github/
│   └── workflows/
│       └── ci.yml           # GitHub Actions workflow
├── src/
│   ├── app.js               # Express API
│   ├── utils.js             # Utility functions
│   └── __tests__/
│       └── utils.test.js    # Jest tests
├── .eslintrc.json           # ESLint config
├── jest.config.js           # Jest config
├── package.json             # Dependencies & scripts
└── README.md                # This file
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd my-ci-demo
npm install
```

### 2. Run Linter

```bash
# Check code style
npm run lint

# Auto-fix issues
npm run lint:fix
```

### 3. Run Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage
```

### 4. Start Server

```bash
npm start
# Server running on http://localhost:3000
```

## 🧪 API Endpoints

### GET /
```bash
curl http://localhost:3000/
```
Response:
```json
{
  "message": "Welcome to CI Demo API",
  "version": "1.0.0",
  "endpoints": {
    "users": "/api/users",
    "health": "/health"
  }
}
```

### GET /health
```bash
curl http://localhost:3000/health
```

### GET /api/users
```bash
curl http://localhost:3000/api/users
```

### GET /api/users/:id
```bash
curl http://localhost:3000/api/users/1
```

### POST /api/users
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"bob","email":"bob@example.com"}'
```

## 🔄 CI Workflow

Workflow `.github/workflows/ci.yml` chạy tự động khi:
- Push code lên branch `main` hoặc `develop`
- Tạo Pull Request target `main`

**Jobs:**
1. **Lint Code** - Check code style với ESLint
2. **Run Tests** - Run Jest tests với coverage

## 📝 Hướng Dẫn Thực Hành

### Bước 1: Initialize Git Repository

```bash
cd my-ci-demo
git init
git add .
git commit -m "Initial commit: Setup project with CI"
```

### Bước 2: Push lên GitHub

```bash
# Tạo repo mới trên GitHub (VD: my-ci-demo)
git remote add origin https://github.com/YOUR_USERNAME/my-ci-demo.git
git branch -M main
git push -u origin main
```

### Bước 3: Kiểm Tra Workflow

1. Vào GitHub repository
2. Click tab **Actions**
3. Thấy workflow "CI" đang chạy hoặc đã xong
4. Click vào workflow run để xem logs

**Mong đợi:**
```
✅ Lint Code (30s)
   ✅ Checkout code
   ✅ Setup Node.js
   ✅ Install dependencies
   ✅ Run ESLint

✅ Run Tests (40s)
   ✅ Checkout code
   ✅ Setup Node.js
   ✅ Install dependencies
   ✅ Run tests
   ✅ Upload coverage reports
```

### Bước 4: Test Workflow Với Lỗi Lint

Tạo branch mới với lỗi lint:

```bash
git checkout -b test-lint-fail

# Thêm lỗi lint vào src/app.js
# VD: Thêm dòng: var x = 1 (dùng var thay vì const)
echo "var unused = 1;" >> src/app.js

git add .
git commit -m "Test: Add lint error"
git push origin test-lint-fail
```

**Tạo PR:**
1. Vào GitHub → Pull Requests → New Pull Request
2. Base: `main` ← Compare: `test-lint-fail`
3. Create Pull Request

**Kết quả:**
- Workflow chạy
- Job "Lint Code" **FAIL** ❌
- Không thể merge PR (nếu có branch protection)

### Bước 5: Fix Lỗi và Test Lại

```bash
# Fix lỗi
git checkout test-lint-fail
git revert HEAD  # Hoặc sửa thủ công

git add .
git commit -m "Fix: Remove lint error"
git push origin test-lint-fail
```

**Kết quả:**
- Workflow chạy lại tự động
- Tất cả jobs **PASS** ✅
- Có thể merge PR

### Bước 6: Setup Branch Protection (Optional)

**Để block merge khi CI fail:**

1. Repo → Settings → Branches
2. Add rule for `main` branch
3. Check:
   - ✅ Require status checks to pass before merging
   - ✅ Select: "Lint Code" và "Run Tests"
4. Save changes

**Kết quả:**
- PR với CI fail → không thể merge
- PR với CI pass → có nút "Merge"

## 🧪 Test Scenarios

### Scenario 1: Tất Cả Pass ✅

```bash
# Code clean, tests pass
git add .
git commit -m "feat: Add new feature"
git push
# → CI pass, có thể merge
```

### Scenario 2: Lint Fail ❌

```bash
# Code có lỗi style
echo "var x=1" >> src/utils.js
git add .
git commit -m "Add code with lint error"
git push
# → Lint fail, không merge được
```

### Scenario 3: Test Fail ❌

```bash
# Thêm test sẽ fail
echo "test('should fail', () => expect(1).toBe(2));" >> src/__tests__/utils.test.js
git add .
git commit -m "Add failing test"
git push
# → Test fail, không merge được
```

## 📚 Kiến Thức Áp Dụng

Project này practice:
- ✅ **Ngày 35:** GitHub Actions cơ bản
  - Workflow syntax (on, jobs, steps)
  - Pre-built actions (checkout, setup-node)
  - Parallel jobs execution
- ✅ **Ngày 12:** Bash scripting
  - npm scripts trong package.json
- ✅ **Ngày 14:** Automation
  - CI tự động thay vì manual testing

## 🎯 Mục Tiêu Đạt Được

Sau khi hoàn thành practice này, bạn sẽ:
- ✅ Hiểu workflow GitHub Actions hoạt động như thế nào
- ✅ Biết cách setup CI cho Node.js project
- ✅ Practice với real GitHub Actions runs
- ✅ Hiểu cách CI block bad code vào production
- ✅ Tự tin setup CI cho projects khác

## 🐛 Troubleshooting

### Problem: npm ci fails

**Error:**
```
npm ERR! cipm can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync
```

**Fix:**
```bash
# Tạo lại package-lock.json
rm package-lock.json
npm install
git add package-lock.json
git commit -m "Update package-lock.json"
```

### Problem: Tests không tìm thấy modules

**Error:**
```
Cannot find module 'express'
```

**Fix:**
```bash
# Cài lại dependencies
npm install
```

### Problem: ESLint báo lỗi không đúng

**Fix:**
```bash
# Check config
cat .eslintrc.json

# Disable rule tạm thời (trong code)
/* eslint-disable no-console */
console.log('Debug');
/* eslint-enable no-console */
```

## 📖 Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Jest Documentation](https://jestjs.io/)
- [ESLint Rules](https://eslint.org/docs/latest/rules/)
- [Express.js Guide](https://expressjs.com/)

---

**Happy Coding! 🚀**

*Tạo bởi Ngày 35 - GitHub Actions Practice*
