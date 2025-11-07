# 🔧 Troubleshooting Guide - Airline Project

## Current Status (Nov 5, 2025)

### ✅ What's Working:
1. **Backend API** is running on `http://localhost:3001`
   - Database connected: PostgreSQL on port 5433
   - 8 flights loaded in database
   - API endpoints responding correctly
   - Test: `curl http://localhost:3001/api/flights` returns flight data

2. **Frontend** is running on `http://localhost:5173`
   - Vite dev server running
   - React app loads
   - BUT: Flights not displaying from database

### ❌ The Problem:
**Flights page is not showing the flights from the database even though the API works.**

---

## 🔍 Step-by-Step Debugging (Start Here Tomorrow)

### Step 1: Verify Backend is Running
```bash
# Check if Node processes are running
tasklist | findstr node

# Test health endpoint
curl http://localhost:3001/api/health
# Should return: {"status":"OK","message":"Airline API is running"}

# Test flights endpoint
curl http://localhost:3001/api/flights
# Should return JSON array with 8 flights
```

**If backend not running:**
```bash
cd E:\airline_project\airline-backend
npm start
```

---

### Step 2: Verify Frontend is Running
```bash
# Check if dev server is running
curl http://localhost:5173/
# Should return HTML

# If not running:
cd E:\airline_project\airline-frontend
npm run dev
```

---

### Step 3: Check Browser Console
1. Open browser: `http://localhost:5173`
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Refresh the page (F5)

**Look for these messages:**
- 🔍 Fetching flights from API...
- 🚀 API Request: GET /flights
- ✅ API Response: /flights - Status: 200
- 📊 Number of flights received: 8

**Common Errors to Check:**

#### Error A: CORS Error
```
Access to XMLHttpRequest at 'http://localhost:3001/api/flights' from origin 'http://localhost:5173' 
has been blocked by CORS policy
```
**Fix:** Backend should have CORS enabled (it does). Restart backend server.

#### Error B: Network Error / Connection Refused
```
AxiosError: Network Error
```
**Fix:** Backend is not running. Start it with `npm start` in airline-backend folder.

#### Error C: 404 Not Found
```
❌ API Error: /flights - Error: Request failed with status code 404
```
**Fix:** Check API base URL in `src/services/api.ts` - should be `http://localhost:3001/api`

---

### Step 4: Check Network Tab
1. In Developer Tools (F12), go to **Network** tab
2. Refresh the page
3. Look for request to `flights`
4. Click on it

**Check:**
- **Status Code:** Should be 200
- **Response:** Should show JSON with 8 flights
- **Headers:** Check if Content-Type is application/json

---

### Step 5: Check Debug Info on Page
Look at the **yellow debug box** at the top of the page:
```
🔍 Debug Info:
Loading: No
Show Results: Yes  <-- Should be "Yes" if flights loaded
Total Flights in State: 8  <-- Should be 8
Sorted Flights: 8  <-- Should be 8
```

**If "Show Results: No":**
- Flights were loaded but not displayed
- Check console for errors during fetchFlights()

**If "Total Flights in State: 0":**
- API call failed or returned no data
- Check Network tab and console for errors

---

## 🔧 Quick Fixes to Try

### Fix 1: Clear Browser Cache
1. Press **Ctrl + Shift + Delete**
2. Clear cached images and files
3. Refresh page

### Fix 2: Restart Both Servers
```bash
# Kill all Node processes
taskkill /F /IM node.exe

# Start backend
cd E:\airline_project\airline-backend
npm start

# In a new terminal, start frontend
cd E:\airline_project\airline-frontend
npm run dev
```

### Fix 3: Check if Port 3001 is Accessible
```bash
# Use PowerShell
Test-NetConnection -ComputerName localhost -Port 3001
```

### Fix 4: Try Different Browser
Sometimes browser extensions block API calls. Try:
- Chrome Incognito mode (Ctrl + Shift + N)
- Different browser (Firefox, Edge)

---

## 🗃️ Database Verification

### Check if flights exist in database:
```bash
# Connect to PostgreSQL
psql -U postgres -d Flight_ReservationDB -p 5433

# Run query
SELECT COUNT(*) FROM flights;
# Should return: 8

# View flights
SELECT flight_number, from_airport, to_airport, departure_time FROM flights;

# Exit
\q
```

---

## 📂 Key Files Modified Today

1. **airline-frontend/src/pages/Flights.tsx**
   - Changed to fetch from API instead of hardcoded data
   - Added loading states
   - Added debug logging

2. **airline-frontend/src/services/api.ts**
   - Created API service layer
   - Base URL: `http://localhost:3001/api`
   - Added console logging for requests/responses

3. **airline-backend/server.js**
   - Changed port from 5000 to 3001
   - Added better error handling
   - Binds to 0.0.0.0

4. **airline-backend/.env**
   - PORT=3001
   - Database credentials configured

5. **airline-backend/setup-database.js**
   - Created database tables
   - Inserted 8 sample flights

---

## 🎯 Most Likely Issues

Based on the symptoms, the most likely causes are:

### 1. **CORS Configuration Issue** (60% likely)
The frontend can't access the backend due to CORS policy.

**Test:**
```bash
curl -H "Origin: http://localhost:5173" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS \
     http://localhost:3001/api/flights
```

**Should see:** `Access-Control-Allow-Origin: *` in response headers

### 2. **Frontend Not Updated** (30% likely)
Browser is caching old version of the code.

**Fix:** Hard refresh (Ctrl + Shift + R) or clear cache

### 3. **API Base URL Wrong** (10% likely)
Frontend pointing to wrong port.

**Check:** `airline-frontend/src/services/api.ts`
```typescript
const API_BASE_URL = 'http://localhost:3001/api';  // Should be 3001, not 5000
```

---

## 📋 Checklist for Tomorrow

- [ ] Backend running on port 3001
- [ ] Frontend running on port 5173
- [ ] Database has 8 flights: `SELECT COUNT(*) FROM flights;`
- [ ] API returns flights: `curl http://localhost:3001/api/flights`
- [ ] Browser console shows no errors
- [ ] Network tab shows 200 response for flights request
- [ ] Debug info shows: Total Flights in State: 8
- [ ] Debug info shows: Show Results: Yes

---

## 🆘 If Nothing Works

### Nuclear Option: Fresh Start
```bash
# 1. Stop all servers
taskkill /F /IM node.exe

# 2. Reinstall dependencies
cd E:\airline_project\airline-frontend
rm -rf node_modules package-lock.json
npm install

cd E:\airline_project\airline-backend
rm -rf node_modules package-lock.json
npm install

# 3. Restart servers
cd E:\airline_project\airline-backend
npm start

# New terminal
cd E:\airline_project\airline-frontend
npm run dev

# 4. Open browser in incognito mode
# Chrome: Ctrl + Shift + N
# Go to: http://localhost:5173
```

---

## 📞 Contact Info for Help

If you're still stuck, provide this info:
1. Screenshot of browser console (F12 → Console)
2. Screenshot of Network tab showing the flights request
3. Output of: `curl http://localhost:3001/api/flights`
4. Screenshot of the yellow debug box
5. What do you see on the page? (search form, loading spinner, nothing?)

---

## 🎓 Understanding the Flow

```
User Opens Page
    ↓
Flights.tsx loads
    ↓
useEffect runs fetchFlights()
    ↓
flightAPI.getAll() called
    ↓
axios GET http://localhost:3001/api/flights
    ↓
Backend receives request
    ↓
Backend queries PostgreSQL
    ↓
Database returns 8 flights
    ↓
Backend sends JSON response
    ↓
Frontend receives response
    ↓
Transform data (flight_number → flightNumber, etc.)
    ↓
setAllFlights(transformedFlights)
    ↓
setShowResults(true)
    ↓
Page renders flight cards
```

**Where is it breaking?** The console logs will tell you!

---

Good luck tomorrow! Start with Step 1 and work through systematically. The console logs should tell you exactly where it's failing. 🚀
