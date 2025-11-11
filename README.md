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

