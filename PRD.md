# **🧠 PRODUCT REQUIREMENTS DOCUMENT (PRD)**

## **🏷 Product Name**

**Summer Internships 2026**

---

## **1\. 🎯 Problem Statement**

Right now, internship discovery in India is fragmented and inefficient:

* Students search random keywords across Google  
* Information is scattered across IIT/NIT sites, PDFs, and outdated blogs  
* Deadlines, eligibility, and stipend info are unclear  
* Most platforms (Internshala, LinkedIn) are noisy and generic

**What this means:**  
 Users waste hours filtering junk instead of finding high-quality, relevant opportunities.

---

## **2\. 💡 Solution**

Build a **focused, high-signal internship discovery platform** that:

* Aggregates **verified internships (especially 2026 cycle)**  
* Structures them into clean, filterable data  
* Prioritizes **IIT / NIT / IIIT \+ top companies**  
* Eliminates noise (no spam listings)

This is not a job board.  
 This is a **curated intelligence layer for internships**.

---

## **3\. 👤 Target Users**

### **Primary:**

* B.Tech students (1st–3rd year)  
* Especially from Tier 2/3 colleges  
* Searching for:  
  * IIT internships  
  * Summer 2026 research programs  
  * Corporate internships

### **Secondary:**

* Gap year students  
* Early career explorers

---

## **4\. 🎯 Core Use Cases**

1. User lands → sees curated internships instantly  
2. Filters by:  
   * IIT / NIT / Company  
   * Location  
   * Stipend  
3. Clicks → gets full details  
4. Applies via official link

---

## **5\. 📦 Feature Set**

### **5.1 Internship Listing Engine**

* Structured dataset  
* Each listing includes:  
  * Title  
  * Organization  
  * Type (IIT / NIT / Company / Govt)  
  * Duration  
  * Stipend  
  * Location  
  * Deadline  
  * Tags

---

### **5.2 Smart Filtering System**

Filters must be:

* Instant (no reload)  
* Multi-select

Filters:

* Work Mode: Remote / Onsite / Hybrid  
* Category: IIT / NIT / IIIT / Corporate / Govt  
* City  
* Stipend Range  
* Duration

---

### **5.3 Search System**

* Keyword-based  
* Typo-tolerant  
* Example queries:  
  * “iit bhu internship”  
  * “tcs internship 2026”

---

### **5.4 Internship Detail Page**

Must include:

* Full description  
* Eligibility  
* Application process  
* Official link  
* Deadline countdown

---

### **5.5 Category Explorer (Homepage)**

Sections:

* IIT Internships  
* NIT Internships  
* IIIT Internships  
* Research  
* Paid  
* Remote

---

### **5.6 Trust Layer**

* “Curated & Verified” badge  
* No fake listings  
* Direct application links only

---

## **6\. 📊 Data Strategy**

Raw input (your keyword list) is **not usable directly**.

You must transform into structured schema:

type Internship \= {  
 id: string  
 title: string  
 organization: string  
 category: "IIT" | "NIT" | "IIIT" | "Corporate" | "Govt"  
 location: string  
 duration: string  
 stipend: string  
 deadline: string  
 workMode: "Remote" | "Onsite" | "Hybrid"  
 tags: string\[\]  
}

If you skip this step → your product becomes useless.

---

## **7\. 🧭 User Flow**

1. Landing page  
2. Explore categories  
3. Apply filters  
4. Browse cards  
5. Open detail page  
6. Click apply

---

## **8\. 📈 Success Metrics**

* Time to first click \< 10 sec  
* Filter usage rate \> 60%  
* Bounce rate \< 40%  
* Avg session \> 2 min

---

## **9\. 🚫 What This Product Is NOT**

* Not a generic job board  
* Not user-generated content  
* Not cluttered with irrelevant roles

---

---

# **🎨 UI / UX DESIGN DOCUMENT**

Now let’s get real about UI. Your screenshots are decent — but if you blindly copy them, you’ll still end up average.

We’ll define the system properly.

---

## **1\. 🧱 Layout System**

### **Grid:**

* Max width: 1200–1280px  
* 12-column grid  
* Consistent spacing scale (8px base)

---

## **2\. 🎨 Design Language**

### **Colors:**

* Primary (Plum): `#381932`  
* Background (Milk): `#FFF3E6`  
* Accent:  
  * Green (success)  
  * Soft purple (tags)  
  * Neutral greys

---

### **Typography:**

* Font: Inter  
* Headings: Semi-bold  
* Body: Regular  
* Line height: relaxed (1.5–1.7)

---

## **3\. 🧭 Navigation (Critical)**

### **Capsule Navbar**

* Floating  
* Rounded (full pill)  
* Slight blur / glass effect

Contains:

* Logo  
* Menu items  
* Search bar  
* Profile

**Mistake to avoid:**  
 Don’t make it static and boring.

---

## **4\. 🏠 Homepage Structure**

### **Section 1: Hero**

* Left:  
  * Title  
  * Subtitle  
  * Tags (640 listings, updated daily)  
* Right:  
  * Stats card

---

### **Section 2: Category Cards**

Grid of 6:

* IIT  
* NIT  
* IIIT  
* Research  
* Paid  
* Remote

Each card:

* Icon  
* Short description  
* CTA

---

### **Section 3: Filters \+ Listings**

Top:

* Filter bar (capsule buttons)

Below:

* Internship cards grid

---

## **5\. 🧩 Internship Card Design**

Each card must feel:

* Clickable  
* Lightweight  
* Informational

### **Structure:**

Top:

* Badge: INTERNSHIP  
* Duration tag

Middle:

* Title (bold)  
* Organization (subtle)

Bottom:

* Location  
* Stipend  
* Deadline

CTA:

* “View Details”

---

### **Interaction:**

On hover:

* Slight lift  
* Shadow increase  
* CTA highlight

---

## **6\. 🎛 Filter UI**

* Pills, not dropdown-heavy UI  
* Instant feedback  
* Selected state clearly visible

---

## **7\. ⚡ Motion System**

Use Framer Motion for:

* Page load (fade \+ translateY)  
* Card stagger animation  
* Filter transitions  
* Hover micro-interactions

Keep it subtle. If users notice animation too much → you overdid it.

---

## **8\. 📱 Responsive Behavior**

### **Desktop:**

* 3–4 cards per row

### **Tablet:**

* 2 per row

### **Mobile:**

* 1 per row  
* Filters become scrollable chips

---

## **9\. ❌ Common UI Mistakes (Don’t Do This)**

* Overcrowded cards  
* Inconsistent spacing  
* Too many colors  
* Weak contrast  
* Generic Tailwind look

---

## **10\. 🎯 UX Principles**

* Speed \> beauty  
* Clarity \> creativity  
* Signal \> noise

---

# **⚠️ Brutal Reality Check**

If you:

* Don’t structure your data → this fails  
* Don’t maintain design consistency → it looks amateur  
* Copy UI blindly → no differentiation

But if you execute this properly:

You’re sitting on:

* SEO gold (your keyword list is strong)  
* A real utility product  
* Something you can scale into a startup

