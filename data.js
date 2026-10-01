window.CATEGORIES = [
  { id: "all", name: "הכול", short: "כל הקטגוריות" },
  { id: "productivity", name: "פרודוקטיביות ואוטומציה", short: "פרודוקטיביות", color: "#1f7a5a" },
  { id: "development", name: "פיתוח ובניית מוצרים", short: "פיתוח", color: "#3568b8" },
  { id: "design", name: "עיצוב ויצירת תוכן", short: "עיצוב", color: "#c44f3d" },
  { id: "research", name: "מחקר, למידה וידע", short: "מחקר", color: "#7757a6" }
];

window.TOOLS = [
  {
    slug: "todoist", name: "Todoist", mark: "T", category: "productivity", subcategories: ["ניהול משימות", "תכנון אישי"],
    tagline: "מנהל משימות מהיר שמחבר בין רשימות, לוחות ולוח שנה.",
    solves: "מרכז משימות אישיות ועבודה במקום אחד, עם תאריכים, תזכורות, תצוגות ורמות עדיפות.",
    uses: ["ניהול משימות", "תכנון", "שיתוף"], audience: "יחידים וצוותים קטנים שרוצים מערכת משימות פשוטה ועקבית.",
    free: "תוכנית Beginner חינמית לתמיד: 5 פרויקטים אישיים, 3 תצוגות מסנן ושבוע אחד של היסטוריית פעילות.",
    limits: "לוח שנה מתקדם, היסטוריה מלאה, תזכורות מותאמות ויותר פרויקטים נמצאים בתוכניות בתשלום.",
    pros: ["מהיר וקל ללמידה", "אפליקציות לכל הפלטפורמות", "אינטגרציות רבות"], cons: ["רק 5 פרויקטים אישיים בחינם", "היסטוריה מוגבלת לשבוע"],
    alternatives: ["Trello", "Obsidian"], url: "https://www.todoist.com/", verified: "2026-10-01", recent: false,
    sources: [{ label: "תמחור רשמי", url: "https://www.todoist.com/pricing/" }]
  },
  {
    slug: "trello", name: "Trello", mark: "Tr", category: "productivity", subcategories: ["קנבן", "ניהול פרויקטים"],
    tagline: "לוחות חזותיים לניהול עבודה, תהליכים ופרויקטים משותפים.",
    solves: "הופך תהליך עבודה לרצף כרטיסים ברור שאפשר להעביר בין שלבים, להקצות ולתזמן.",
    uses: ["ניהול פרויקטים", "שיתוף", "קנבן"], audience: "צוותים קטנים, משפחות ופרויקטים שרוצים לראות את התהליך במבט אחד.",
    free: "עד 10 משתפי פעולה בכל Workspace, עד 10 לוחות, כרטיסים ו־Power-Ups ללא הגבלה ו־250 ריצות אוטומציה בחודש.",
    limits: "קבצים עד 10MB; לוחות ללא הגבלה, AI ותצוגות מתקדמות דורשים שדרוג.",
    pros: ["ממשק חזותי מוכר", "כרטיסים ללא הגבלה", "אוטומציות בסיסיות"], cons: ["מגבלת 10 לוחות", "פחות מתאים לתכנון מורכב"],
    alternatives: ["Todoist", "Make"], url: "https://trello.com/", verified: "2026-10-01", recent: false,
    sources: [{ label: "תמחור רשמי", url: "https://trello.com/en/pricing" }]
  },
  {
    slug: "make", name: "Make", mark: "M", category: "productivity", subcategories: ["אוטומציה", "No-code"],
    tagline: "בונה תרחישי אוטומציה חזותיים בין אלפי אפליקציות.",
    solves: "מחבר שירותים ומעביר מידע ביניהם אוטומטית, בלי לכתוב מערכת אינטגרציה מלאה.",
    uses: ["אוטומציה", "אינטגרציות", "No-code"], audience: "עצמאים, אנשי תפעול ושיווק שרוצים לחסוך פעולות חוזרות.",
    free: "מסלול ללא הגבלת זמן עם 1,000 קרדיטים בחודש, בונה חזותי, נתבים ומסננים ויותר מ־3,000 אפליקציות.",
    limits: "עד 2 תרחישים פעילים, מרווח מינימלי של 15 דקות בין ריצות, זמן ריצה מרבי 5 דקות וקובץ עד 5MB.",
    pros: ["כיסוי אפליקציות רחב", "בונה תהליכים חזותי", "אין מגבלת זמן"], cons: ["קרדיט נצרך בכל פעולת מודול", "תזמון איטי במסלול החינמי"],
    alternatives: ["Trello", "Circleback"], url: "https://www.make.com/", verified: "2026-10-01", recent: false,
    sources: [{ label: "תמחור רשמי", url: "https://www.make.com/en/pricing" }]
  },
  {
    slug: "circleback", name: "Circleback", mark: "C", category: "productivity", subcategories: ["פגישות", "תמלול AI"],
    tagline: "סיכומי פגישות, משימות ותמלול עם זיהוי דוברים.",
    solves: "מתעד פגישות מקוונות ופיזיות ומפיק מהן סיכום, פריטי פעולה וטקסט שניתן לחפש.",
    uses: ["פגישות", "תמלול", "אוטומציה"], audience: "אנשי מוצר, מכירות וייעוץ שמנהלים פגישות רבות.",
    free: "AI לסיכומים ומשימות, פגישות מקוונות ופיזיות, תמלול, API/MCP/CLI ועד 2 צוותים ב־$0 למשתמש.",
    limits: "היסטוריית פגישות והקלטות נשמרת 30 יום בלבד; האוטומציות מוגבלות.",
    pros: ["כולל פגישות פיזיות", "גישה דרך API ו־MCP", "תמלול עם דוברים"], cons: ["שמירה ל־30 יום", "אינטגרציות מלאות בתשלום"],
    alternatives: ["Make", "NotebookLM"], url: "https://circleback.ai/", verified: "2026-10-01", recent: true,
    sources: [{ label: "תמחור רשמי", url: "https://run.circleback.ai/pricing" }, { label: "מגבלות API", url: "https://circleback.ai/docs/api" }]
  },
  {
    slug: "github", name: "GitHub", mark: "GH", category: "development", subcategories: ["Git", "שיתוף קוד", "CI/CD"],
    tagline: "אירוח קוד, שיתוף פעולה ואוטומציית פיתוח במקום אחד.",
    solves: "מנהל היסטוריית קוד, סקירות, משימות ותהליכי בנייה ופריסה סביב מאגר משותף.",
    uses: ["פיתוח", "שיתוף", "CI/CD"], audience: "מפתחים, צוותי תוכנה ופרויקטי קוד פתוח.",
    free: "מאגרים ציבוריים ופרטיים ללא הגבלה. לחשבון אישי: 2,000 דקות Actions בחודש ו־500MB אחסון Packages.",
    limits: "מכסות Actions, Codespaces, Packages ו־LFS מוגבלות; יכולות ארגוניות מתקדמות בתשלום.",
    pros: ["תקן דה־פקטו לשיתוף קוד", "אקוסיסטם עצום", "CI/CD מובנה"], cons: ["מכסות מחשוב ואחסון", "חלק מכלי האבטחה מתקדמים בתשלום"],
    alternatives: ["Kilo Code", "Vercel"], url: "https://github.com/", verified: "2026-10-01", recent: false,
    sources: [{ label: "תמחור רשמי", url: "https://github.com/pricing" }, { label: "מכסות שימוש", url: "https://docs.github.com/en/billing/reference/product-usage-included" }]
  },
  {
    slug: "supabase", name: "Supabase", mark: "S", category: "development", subcategories: ["Backend", "PostgreSQL", "Auth"],
    tagline: "Backend מוכן עם מסד נתונים, אימות, אחסון ופונקציות.",
    solves: "מקצר הקמת תשתית ליישומים באמצעות PostgreSQL מנוהל ושירותי Backend מחוברים.",
    uses: ["פיתוח", "מסדי נתונים", "Backend"], audience: "מפתחי ווב ומובייל, אבטיפוסים ומוצרים קטנים.",
    free: "שני פרויקטים חינמיים, מכסת egress של 5GB ושירותי Database, Auth, Storage, Functions ו־Realtime.",
    limits: "המכסות משותפות לארגון; פרויקטים לא פעילים עשויים להיעצר, ומשאבים כמו דומיין מותאם אינם כלולים.",
    pros: ["PostgreSQL אמיתי", "שירותים מחוברים היטב", "אפשרות קוד פתוח ואירוח עצמי"], cons: ["השהיית פרויקטים לא פעילים", "מכסות ארגוניות משותפות"],
    alternatives: ["Vercel", "GitHub"], url: "https://supabase.com/", verified: "2026-10-01", recent: false,
    sources: [{ label: "תמחור רשמי", url: "https://supabase.com/pricing" }, { label: "מסלולים וחיוב", url: "https://supabase.com/docs/guides/platform/billing-on-supabase" }]
  },
  {
    slug: "vercel", name: "Vercel", mark: "V", category: "development", subcategories: ["Hosting", "פריסה", "Frontend"],
    tagline: "פריסה מהירה של אתרי Frontend ויישומי ווב ישירות מ־Git.",
    solves: "בונה ומפרסם כל שינוי בקוד עם HTTPS, תצוגות מקדימות ופונקציות צד שרת.",
    uses: ["פריסה", "אירוח", "פיתוח"], audience: "מפתחים שבונים פרויקטים אישיים ואתרי אבטיפוס.",
    free: "Hobby חינמי עם CI/CD, HTTPS, תצוגות מקדימות, עד 200 פרויקטים ומכסות חודשיות לשימוש.",
    limits: "מיועד לשימוש אישי ולא־מסחרי בלבד. חריגה ממכסות עשויה להשהות את היישום עד להתחדשות התקופה.",
    pros: ["פריסה פשוטה מ־Git", "Preview לכל שינוי", "ביצועים ותשתית מובנים"], cons: ["איסור שימוש מסחרי ב־Hobby", "השירות עלול להיעצר בחריגה"],
    alternatives: ["GitHub", "Supabase"], url: "https://vercel.com/", verified: "2026-10-01", recent: false,
    sources: [{ label: "מסלול Hobby", url: "https://vercel.com/docs/plans/hobby" }, { label: "תמחור רשמי", url: "https://vercel.com/pricing" }]
  },
  {
    slug: "kilo-code", name: "Kilo Code", mark: "K", category: "development", subcategories: ["עוזר קוד", "AI", "קוד פתוח"],
    tagline: "סוכן קוד פתוח ל־VS Code, JetBrains ולשורת הפקודה.",
    solves: "מסייע לכתוב, לשנות ולבדוק קוד בעזרת מודלים מקומיים, מפתחות אישיים או נתיבים חינמיים.",
    uses: ["פיתוח", "AI", "קוד פתוח"], audience: "מפתחים שרוצים סוכן קוד גמיש בלי מנוי פלטפורמה אישי.",
    free: "תוכנית יחיד חינמית וקוד פתוח. אפשר להשתמש ב־Auto Free כשהוא זמין, במודל מקומי או ב־BYOK ללא תוכנית inference בתשלום.",
    limits: "זמינות מודלים חינמיים מתארחים משתנה; ספקי מודלים, מפתחות ויכולות מחשוב ענן עשויים לעלות כסף.",
    pros: ["קוד פתוח", "בחירת מודל וספק", "עובד בכמה סביבות פיתוח"], cons: ["עלויות inference נפרדות", "Auto Free אינו רשימת מודלים קבועה"],
    alternatives: ["GitHub", "Obsidian"], url: "https://kilo.ai/", verified: "2026-10-01", recent: true,
    sources: [{ label: "תמחור רשמי", url: "https://kilo.ai/pricing" }, { label: "המאגר הרשמי", url: "https://github.com/Kilo-Org/kilocode" }]
  },
  {
    slug: "canva", name: "Canva", mark: "Ca", category: "design", subcategories: ["עיצוב גרפי", "מצגות", "תוכן"],
    tagline: "עורך עיצוב מקוון לתוכן חברתי, מסמכים, מצגות ווידאו.",
    solves: "מאפשר ליצור חומר חזותי מתבניות ורכיבים מוכנים בלי להכיר תוכנת עיצוב מקצועית.",
    uses: ["עיצוב", "מצגות", "תוכן"], audience: "יוצרי תוכן, אנשי שיווק, מורים ועסקים קטנים.",
    free: "Canva Free זמין לכל אחד עם עורך, תבניות ונכסים חינמיים; נכון לבדיקה, עד 20 שימושי AI חודשיים מהסוגים הזמינים למסלול.",
    limits: "נכסי Premium, כלי מותג מתקדמים, יותר שימושי AI ופיצ'רים מקצועיים דורשים תוכנית בתשלום.",
    pros: ["קל מאוד להתחיל", "מגוון פורמטים ותבניות", "שיתוף ועבודה בדפדפן"], cons: ["נכסים רבים נעולים", "מכסת AI מוגבלת ומשתנה לפי מורכבות"],
    alternatives: ["Napkin AI", "GIMP"], url: "https://www.canva.com/", verified: "2026-10-01", recent: false,
    sources: [{ label: "תמחור רשמי", url: "https://www.canva.com/pricing/" }]
  },
  {
    slug: "napkin-ai", name: "Napkin AI", mark: "N", category: "design", subcategories: ["ויזואליזציה", "AI", "מצגות"],
    tagline: "הופך טקסט לתרשימים ויזואליים שנשארים ניתנים לעריכה.",
    solves: "מקצר יצירת איורים, תרשימי תהליך ושקפים מטקסט למצגות ומסמכים.",
    uses: ["עיצוב", "מצגות", "AI"], audience: "מציגים, מרצים, כותבים ואנשי מוצר שצריכים להמחיש רעיון מהר.",
    free: "Free Forever עם 500 קרדיטי AI בשבוע, עריכה וייבוא ללא הגבלה וייצוא PNG/PDF ללא הגבלה.",
    limits: "ויזואלים נושאים מיתוג Napkin; סגנונות והתאמות מתקדמות בתשלום. יצירת שקף עולה 100 קרדיטים.",
    pros: ["מתחיל מטקסט", "תוצרים ניתנים לעריכה", "מכסה שבועית מתחדשת"], cons: ["מיתוג בתוצר החינמי", "קרדיטים נגמרים מהר ביצירת שקפים"],
    alternatives: ["Canva", "Cavalry"], url: "https://www.napkin.ai/", verified: "2026-10-01", recent: true,
    sources: [{ label: "תמחור רשמי", url: "https://www.napkin.ai/pricing/" }, { label: "הסבר קרדיטים", url: "https://help.napkin.ai/en/articles/15955724-credits-plans" }]
  },
  {
    slug: "gimp", name: "GIMP", mark: "G", category: "design", subcategories: ["עריכת תמונה", "קוד פתוח", "Desktop"],
    tagline: "עורך תמונות מקצועי, חינמי וקוד פתוח למחשב.",
    solves: "מספק שכבות, מסכות, ריטוש, קומפוזיציה ותוספים ללא מנוי תוכנה.",
    uses: ["עיצוב", "עריכת תמונה", "קוד פתוח"], audience: "צלמים, מעצבים ומשתמשים שרוצים עורך מקומי חזק ללא תשלום.",
    free: "התוכנה כולה חופשית תחת GPLv3+ וללא מסלול בתשלום; מותר להשתמש בה גם לעבודה מסחרית.",
    limits: "יישום Desktop ללא שיתוף ענן מובנה; אין גרסת Android או iOS רשמית והממשק דורש הסתגלות.",
    pros: ["חינם ללא מכסות", "פועל מקומית וללא מעקב", "תוספים וקהילה ותיקה"], cons: ["עקומת למידה", "ללא שיתוף ענן מובנה"],
    alternatives: ["Canva", "Cavalry"], url: "https://www.gimp.org/", verified: "2026-10-01", recent: false,
    sources: [{ label: "אודות ורישיון", url: "https://www.gimp.org/about/" }, { label: "שאלות נפוצות", url: "https://www.gimp.org/docs/userfaq.html" }]
  },
  {
    slug: "cavalry", name: "Cavalry", mark: "Cv", category: "design", subcategories: ["Motion", "אנימציה", "Desktop"],
    tagline: "כלי אנימציה דו־ממדית ו־motion graphics ל־Mac ול־Windows.",
    solves: "בונה אנימציות פרוצדורליות, טיפוגרפיה בתנועה וגרפיקה מבוססת נתונים.",
    uses: ["אנימציה", "עיצוב", "וידאו"], audience: "מעצבי motion ויוצרי תוכן שרוצים כלי Desktop מקצועי.",
    free: "מאז גרסה 2.7, יכולות Professional שהיו בתשלום זמינות בחינם במסגרת Cavalry by Canva.",
    limits: "דורש חשבון Canva; מיועד ל־Mac ול־Windows ואינו תחליף מלא לעריכת וידאו מבוססת ציר זמן.",
    pros: ["יכולות Professional ללא תשלום", "אנימציה פרוצדורלית חזקה", "עובד מקומית"], cons: ["אין Linux", "דורש חשבון Canva"],
    alternatives: ["GIMP", "Canva"], url: "https://cavalry.studio/en/", verified: "2026-10-01", recent: true,
    sources: [{ label: "האתר הרשמי", url: "https://cavalry.studio/en/" }, { label: "הודעת גרסה 2.7", url: "https://cavalry.studio/docs/tech-info/release-notes/2.7/2-7-0-release-notes/" }]
  },
  {
    slug: "notebooklm", name: "NotebookLM", mark: "NL", category: "research", subcategories: ["מחקר", "AI", "סיכום מקורות"],
    tagline: "סביבת מחקר של Google שעונה מתוך המקורות שהעליתם.",
    solves: "מסכמת מסמכים, מפיקה שאלות ותוצרים קוליים ועונה עם הפניות למקור.",
    uses: ["מחקר", "למידה", "AI"], audience: "סטודנטים, חוקרים ואנשי ידע שעובדים עם אוסף מקורות מוגדר.",
    free: "גישה רגילה כוללת 100 מחברות, עד 50 מקורות למחברת, 50 שאילתות צ'אט ביום ו־3 יצירות אודיו ביום.",
    limits: "המגבלות עשויות להשתנות לפי חשבון או אזור; יכולות Premium ומכסות גבוהות יותר דורשות שדרוג.",
    pros: ["תשובות עם ציטוטים", "מגוון סוגי מקורות", "תוצרי אודיו וסיכום"], cons: ["מכסות יומיות", "תלוי בחשבון Google ובזמינות אזורית"],
    alternatives: ["Zotero", "ResearchRabbit"], url: "https://notebooklm.google.com/", verified: "2026-10-01", recent: true,
    sources: [{ label: "מגבלות רשמיות", url: "https://support.google.com/notebooklm/answer/16206866?hl=iw" }]
  },
  {
    slug: "zotero", name: "Zotero", mark: "Z", category: "research", subcategories: ["ביבליוגרפיה", "ציטוטים", "קוד פתוח"],
    tagline: "מנהל מקורות וציטוטים חינמי למחקר אקדמי.",
    solves: "אוסף פריטים מהדפדפן, מארגן PDF והערות ומייצר ציטוטים וביבליוגרפיות.",
    uses: ["מחקר", "ציטוטים", "ניהול ידע"], audience: "סטודנטים, חוקרים וכותבים אקדמיים.",
    free: "היישום פתוח וחינמי; ספריית הפריטים המקומית אינה מוגבלת. סנכרון הקבצים הרשמי כולל 300MB בחינם.",
    limits: "אחסון קבצים מעבר ל־300MB בתשלום; אפשר להשתמש ב־WebDAV לסנכרון קבצים בספרייה האישית.",
    pros: ["ציטוטים באלפי סגנונות", "קוד פתוח", "תוספים לדפדפן ולמעבדי תמלילים"], cons: ["רק 300MB בענן הרשמי", "ניהול קבצים גדול דורש פתרון נוסף"],
    alternatives: ["ResearchRabbit", "NotebookLM"], url: "https://www.zotero.org/", verified: "2026-10-01", recent: false,
    sources: [{ label: "האתר הרשמי", url: "https://www.zotero.org/" }, { label: "אחסון קבצים", url: "https://www.zotero.org/support/individual_storage" }]
  },
  {
    slug: "obsidian", name: "Obsidian", mark: "O", category: "research", subcategories: ["הערות", "Markdown", "ניהול ידע"],
    tagline: "בסיס ידע מקומי שמחבר קובצי Markdown לרשת רעיונות.",
    solves: "שומר ידע בקבצים מקומיים, מקשר בין הערות ומאפשר להתאים סביבת כתיבה ומחקר.",
    uses: ["ניהול ידע", "כתיבה", "למידה"], audience: "כותבים, חוקרים ומנהלי ידע שמעדיפים שליטה מקומית בקבצים.",
    free: "יישום הליבה חינם ללא מגבלות לשימוש אישי, מסחרי, חינוכי וארגוני, ללא הרשמה נדרשת.",
    limits: "שירותי Sync ו־Publish הרשמיים בתשלום; שיתוף בזמן אמת אינו חלק מליבת השימוש המקומית.",
    pros: ["קבצים מקומיים ופתוחים", "ללא מגבלת שימוש", "אקוסיסטם תוספים גדול"], cons: ["סנכרון רשמי בתשלום", "הגמישות עלולה להכביד בתחילת הדרך"],
    alternatives: ["Zotero", "NotebookLM"], url: "https://obsidian.md/", verified: "2026-10-01", recent: false,
    sources: [{ label: "תמחור רשמי", url: "https://obsidian.md/pricing" }, { label: "חינם לעבודה", url: "https://obsidian.md/blog/free-for-work/" }]
  },
  {
    slug: "researchrabbit", name: "ResearchRabbit", mark: "RR", category: "research", subcategories: ["גילוי מאמרים", "מפות ציטוט", "שיתוף"],
    tagline: "מפת קשרים בין מאמרים, מחברים וציטוטים לסקירת ספרות.",
    solves: "מרחיב אוסף מאמרים דרך רשתות ציטוט ומציג כיצד מחקרים קשורים זה לזה.",
    uses: ["מחקר", "גילוי", "ציטוטים"], audience: "חוקרים וסטודנטים שבונים סקירת ספרות או ממפים תחום.",
    free: "Free Forever עם חיפושים, ספרייה ואוספים ללא הגבלה, שיתוף אוספים ועד 50 מאמרי seed לחיפוש.",
    limits: "חיפוש מ־300 מאמרי seed, בקרות חיפוש מתקדמות ומספר פרויקטים זמינים ב־RR+.",
    pros: ["מיפוי ציטוט חזותי", "חיפוש ואוספים ללא הגבלה", "ייבוא Zotero ו־BibTeX"], cons: ["רק 50 מאמרי seed בחינם", "מסננים מתקדמים בתשלום"],
    alternatives: ["Zotero", "NotebookLM"], url: "https://www.researchrabbit.ai/", verified: "2026-10-01", recent: true,
    sources: [{ label: "תמחור רשמי", url: "https://www.researchrabbit.ai/pricing" }, { label: "מדריך המסלול החינמי", url: "https://learn.researchrabbit.ai/en/articles/12865509-researchrabbit-free-tier" }]
  }
];
