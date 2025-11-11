# Web Developer Technical Test

Solutions for Web Developer Test

## 📁 Project Structure

```
solum/
├── question-a/          # Mystic Waves (Python)
├── question-b/          # CargoCraft Fleet (Python)
└── question-c/          # Login Page (Next.js)
```

---

## 🚀 How to Run

### Question A: Mystic Waves (Python)

**Requirements**: Python 3.x

```bash
cd question-a
python solution.py < test_input.txt 
```

---

### Question B: CargoCraft Fleet (Python)

**Requirements**: Python 3.x

```bash
cd question-b
python solution.py < test_input.txt
```

---

### Question C: Login Page (Next.js)

**Requirements**: Node.js 20+ or Docker

#### Option 1: Run with npm

```bash
cd question-c

npm install

npm run dev

# Open http://localhost:3000
```

#### Option 2: Run with Docker

```bash
cd question-c

docker-compose up --build

docker build -t question-c .
docker run -p 3000:3000 question-c

# Open http://localhost:3000
```

**Test Credentials**:
| Email | Password |
|-------|----------|
| test@example.com | Test@1234 |
| admin@demo.com | Admin#2024 |
| user@site.com | User$Pass1 |

**Features**:
- Sign in / Sign up pages with full validation
- Email format validation
- Password requirements: 8-16 chars, uppercase, lowercase, number, symbol
- Duplicate email detection on sign-up
- Real-time error messages
- Responsive design (mobile & desktop)
- Social login buttons (UI only)

**Live Demo**: [View on GitHub Pages](https://trung-hao-tran.github.io/solum-web-dev-test/)

---

## 📦 GitHub Pages Deployment

Question C is automatically deployed to GitHub Pages when changes are pushed to `main`.

**Setup** (already configured):
1. GitHub Actions workflow builds and deploys on push
2. App is available at: https://trung-hao-tran.github.io/solum-web-dev-test/

**Manual build for GitHub Pages**:
```bash
cd question-c
GITHUB_PAGES=true npm run build
# Static files output to 'out' directory
```

---

## 🛠️ Tech Stack

| Question | Language/Framework | Complexity |
|----------|-------------------|------------|
| A | Python 3.x | O(1) time, O(1) space |
| B | Python 3.x | O(1) time, O(1) space |
| C | Next.js 15 + TypeScript | Tailwind CSS, Framer Motion |

---

## 📝 Notes

- **Question A & B**: Standalone Python scripts, no external dependencies
- **Question C**: Frontend-only, no backend (credentials stored in-memory)
- All solutions are production-ready with clean, commented code

