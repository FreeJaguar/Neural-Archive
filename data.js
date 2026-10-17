window.CATEGORIES = [
  { id: "all", name: "הכול", short: "כל הקטגוריות" },
  { id: "productivity", name: "פרודוקטיביות ואוטומציה", short: "פרודוקטיביות", color: "#1f7a5a" },
  { id: "development", name: "פיתוח ובניית מוצרים", short: "פיתוח", color: "#3568b8" },
  { id: "design", name: "עיצוב ויצירת תוכן", short: "עיצוב", color: "#c44f3d" },
  { id: "research", name: "מחקר, למידה וידע", short: "מחקר", color: "#7757a6" },
  { id: "skills", name: "סקילים לסוכני AI", short: "סקילים", color: "#087f85" }
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
    alternatives: ["Trello", "Obsidian"], url: "https://www.todoist.com/", added: "2026-09-23", verified: "2026-10-01",
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
    alternatives: ["Todoist", "Make"], url: "https://trello.com/", added: "2026-09-23", verified: "2026-10-01",
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
    alternatives: ["Trello", "Circleback"], url: "https://www.make.com/", added: "2026-09-23", verified: "2026-10-01",
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
    alternatives: ["Make", "Gemini Notebook"], url: "https://circleback.ai/", added: "2026-09-28", verified: "2026-10-12",
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
    alternatives: ["Kilo Code", "Vercel"], url: "https://github.com/", added: "2026-09-23", verified: "2026-10-01",
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
    alternatives: ["Vercel", "GitHub"], url: "https://supabase.com/", added: "2026-09-23", verified: "2026-10-01",
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
    alternatives: ["GitHub", "Supabase"], url: "https://vercel.com/", added: "2026-09-23", verified: "2026-10-01",
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
    alternatives: ["GitHub", "Obsidian"], url: "https://kilo.ai/", added: "2026-09-29", verified: "2026-10-01",
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
    alternatives: ["Napkin AI", "GIMP"], url: "https://www.canva.com/", added: "2026-09-23", verified: "2026-10-01",
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
    alternatives: ["Canva", "Cavalry"], url: "https://www.napkin.ai/", added: "2026-09-23", verified: "2026-10-12",
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
    alternatives: ["Canva", "Cavalry"], url: "https://www.gimp.org/", added: "2026-09-23", verified: "2026-10-01",
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
    alternatives: ["GIMP", "Canva"], url: "https://cavalry.studio/en/", added: "2026-09-23", verified: "2026-10-01",
    sources: [{ label: "האתר הרשמי", url: "https://cavalry.studio/en/" }, { label: "הודעת גרסה 2.7", url: "https://cavalry.studio/docs/tech-info/release-notes/2.7/2-7-0-release-notes/" }]
  },
  {
    slug: "notebooklm", name: "Gemini Notebook", mark: "GN", category: "research", subcategories: ["מחקר", "AI", "סיכום מקורות"],
    tagline: "סביבת המחקר של Google שעונה מתוך המקורות שהעליתם.",
    solves: "מסכמת מסמכים, מפיקה דוחות, כרטיסיות, מצגות ותוצרים קוליים וחזותיים, ועונה עם הפניות למקור.",
    uses: ["מחקר", "למידה", "AI"], audience: "סטודנטים, חוקרים ואנשי ידע שעובדים עם אוסף מקורות מוגדר.",
    free: "Gemini Notebook Standard זמין בחינם עם חשבון Google וכולל 100 מחברות ועד 50 מקורות למחברת, לצד גישה רגילה לצ'אט וליצירת תוצרים.",
    limits: "השימוש ב-AI מבוסס מכסת חישוב ולא מספר קבוע של שאילתות: המכסה מתחדשת כל 5 שעות עד גבול שבועי, עשויה להשתנות לפי עומס וזמינות, ומסלולים בתשלום מציעים מכסות גבוהות יותר. שיתוף מתקדם והסרת סימני מים מסוימים אינם כלולים בחינם.",
    pros: ["תשובות עם ציטוטים", "מגוון סוגי מקורות", "תוצרי אודיו, וידאו, מצגות וסיכום"], cons: ["אין מכסה מספרית קבועה ושקופה", "תלוי בחשבון Google ובזמינות אזורית"],
    alternatives: ["Zotero", "ResearchRabbit"], url: "https://notebook.google.com/", added: "2026-09-23", verified: "2026-10-12",
    sources: [{ label: "תוכניות ומגבלות רשמיות", url: "https://support.google.com/gemininotebook/answer/16213268" }, { label: "ניהול מכסת השימוש", url: "https://support.google.com/gemininotebook/answer/17670842" }]
  },
  {
    slug: "zotero", name: "Zotero", mark: "Z", category: "research", subcategories: ["ביבליוגרפיה", "ציטוטים", "קוד פתוח"],
    tagline: "מנהל מקורות וציטוטים חינמי למחקר אקדמי.",
    solves: "אוסף פריטים מהדפדפן, מארגן PDF והערות ומייצר ציטוטים וביבליוגרפיות.",
    uses: ["מחקר", "ציטוטים", "ניהול ידע"], audience: "סטודנטים, חוקרים וכותבים אקדמיים.",
    free: "היישום פתוח וחינמי; ספריית הפריטים המקומית אינה מוגבלת. סנכרון הקבצים הרשמי כולל 300MB בחינם.",
    limits: "אחסון קבצים מעבר ל־300MB בתשלום; אפשר להשתמש ב־WebDAV לסנכרון קבצים בספרייה האישית.",
    pros: ["ציטוטים באלפי סגנונות", "קוד פתוח", "תוספים לדפדפן ולמעבדי תמלילים"], cons: ["רק 300MB בענן הרשמי", "ניהול קבצים גדול דורש פתרון נוסף"],
    alternatives: ["ResearchRabbit", "Gemini Notebook"], url: "https://www.zotero.org/", added: "2026-09-23", verified: "2026-10-01",
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
    alternatives: ["Zotero", "Gemini Notebook"], url: "https://obsidian.md/", added: "2026-09-23", verified: "2026-10-01",
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
    alternatives: ["Zotero", "Gemini Notebook"], url: "https://www.researchrabbit.ai/", added: "2026-09-23", verified: "2026-10-01",
    sources: [{ label: "תמחור רשמי", url: "https://www.researchrabbit.ai/pricing" }, { label: "מדריך המסלול החינמי", url: "https://learn.researchrabbit.ai/en/articles/12865509-researchrabbit-free-tier" }]
  },
  {
    slug: "hindsight", name: "Hindsight", mark: "H", category: "research", subcategories: ["זיכרון לסוכנים", "MCP", "קוד פתוח"],
    tagline: "זיכרון ארוך טווח לסוכני AI עם retain, recall ו־reflect.",
    solves: "מוסיף לסוכנים שכבת זיכרון מבנית שמאחסנת חוויות, מאחזרת הקשר ומסיקה דפוסים לאורך זמן.",
    uses: ["AI", "ניהול ידע", "פיתוח"], audience: "מפתחי סוכנים ומערכות AI שצריכים זיכרון מתמשך ואינטגרציות.",
    free: "אירוח עצמי מלא וחינמי תחת MIT, ללא מגבלת שימוש או טלמטריה; כולל MCP ו־PostgreSQL משובץ.",
    limits: "הענן המנוהל מציע קרדיטי התחלה בלבד וממשיך בתמחור לפי שימוש; מודלים ותשתית באירוח עצמי עשויים לעלות כסף.",
    pros: ["MIT ללא מגבלות", "MCP ויותר מ־60 אינטגרציות", "אפשר לעבוד עם מודלים מקומיים"], cons: ["דורש תשתית לאירוח עצמי", "הענן אינו מסלול חינמי מתמשך"],
    alternatives: ["OpenResearch", "Gemini Notebook"], url: "https://hindsight.vectorize.io/", added: "2026-10-01", verified: "2026-10-01",
    sources: [{ label: "תמחור רשמי", url: "https://vectorize.io/pricing" }, { label: "המאגר הרשמי", url: "https://github.com/vectorize-io/hindsight" }]
  },
  {
    slug: "graphify", name: "Graphify", mark: "Gr", category: "development", subcategories: ["Knowledge graph", "קוד", "סוכנים"],
    tagline: "ממפה קוד ומסמכים לגרף ידע מקומי עבור סוכני פיתוח.",
    solves: "יוצר ייצוג גרפי של קשרים בקוד ובתיעוד כדי לשפר ניווט, הקשר ותשובות של סוכנים.",
    uses: ["פיתוח", "ניהול ידע", "AI"], audience: "מפתחים וצוותים שמחברים סוכני קוד למאגרים גדולים.",
    free: "מיפוי הקוד המקומי חינמי; רכיבי המאגר מפורסמים ברישיונות Apache-2.0 ו־MIT.",
    limits: "השירות המתארח נפרד ומציע ניסיון של 14 יום בלבד; הרצה מקומית דורשת הקמה ומשאבים.",
    pros: ["עיבוד מקומי", "ייצוג קשרים עשיר", "רכיבי קוד פתוח"], cons: ["הענן אינו חינמי מתמשך", "התקנה מקומית טכנית"],
    alternatives: ["Whiteboard", "OpenResearch"], url: "https://github.com/Graphify-Labs/graphify", added: "2026-09-30", verified: "2026-10-01",
    sources: [{ label: "המאגר הרשמי", url: "https://github.com/Graphify-Labs/graphify" }]
  },
  {
    slug: "hyperframes", name: "HyperFrames", mark: "HF", category: "design", subcategories: ["וידאו בקוד", "HTML", "קוד פתוח"],
    tagline: "Framework מבוסס HTML ליצירת וידאו ואנימציות בקוד.",
    solves: "הופך קומפוזיציות HTML, CSS ו־JavaScript לווידאו שניתן לשחזר ולייצר אוטומטית.",
    uses: ["וידאו", "פיתוח", "יצירת תוכן"], audience: "מפתחים ויוצרי תוכן שרוצים לבנות וידאו דינמי מתבניות וקוד.",
    free: "ה־framework כולו Apache-2.0 וללא תשלום לפי רינדור או מגבלה על שימוש מסחרי.",
    limits: "רינדור מקומי דורש Node.js, Chrome ללא ממשק ו־FFmpeg; רינדור אופציונלי ב־AWS Lambda כרוך בעלות ספק.",
    pros: ["ללא עלות לרינדור מקומי", "וידאו ניתן לתכנות", "רישיון מסחרי פתוח"], cons: ["דורש סביבת פיתוח", "ענן חיצוני עשוי לעלות כסף"],
    alternatives: ["Cavalry", "Diagram Design"], url: "https://hyperframes.app/", added: "2026-09-30", verified: "2026-10-01",
    sources: [{ label: "המאגר הרשמי", url: "https://github.com/heygen-com/hyperframes" }, { label: "התיעוד הרשמי", url: "https://hyperframes.app/docs" }]
  },
  {
    slug: "memor-more", name: "Memor More", mark: "MM", category: "research", subcategories: ["כרטיסיות", "למידה", "Apple"],
    tagline: "כרטיסיות וחזרות מרווחות ללמידה במכשירי Apple.",
    solves: "מארגן חומר לימוד בכרטיסיות ומתזמן חזרות לפי ביצועים כדי לשפר זכירה לטווח ארוך.",
    uses: ["למידה", "כרטיסיות", "ניהול ידע"], audience: "סטודנטים ולומדים באקוסיסטם של Apple.",
    free: "יישום הליבה אינו פג וכולל כרטיסיות וחזרות יומיות ללא הגבלה, מדיה, חפיסות ציבוריות, שיתוף וסנכרון iCloud.",
    limits: "אין אפליקציית Android; גרסת הווב המוקדמת חסרה סנכרון, AI והפעלה לא מקוונת.",
    pros: ["כרטיסיות ללא הגבלה", "סנכרון iCloud", "חזרות מרווחות"], cons: ["Apple בלבד", "גרסת ווב מוגבלת"],
    alternatives: ["Obsidian", "Gemini Notebook"], url: "https://memormore.app/", added: "2026-09-30", verified: "2026-10-01",
    sources: [{ label: "תמחור רשמי", url: "https://memormore.app/pricing" }, { label: "אודות", url: "https://memormore.app/about" }]
  },
  {
    slug: "paperclip", name: "Paperclip", mark: "P", category: "development", subcategories: ["סוכני AI", "Orchestration", "Self-hosted"],
    tagline: "לוח בקרה פתוח לניהול צוותים של סוכני AI.",
    solves: "מארגן סוכנים במבנה ארגוני עם מטרות, תקציבים, ממשל ומעקב עבודה ועלויות.",
    uses: ["AI", "אוטומציה", "ניהול פרויקטים"], audience: "צוותים שבונים תהליכי עבודה עם כמה סוכנים וספקי מודלים.",
    free: "השרת והממשק חינמיים באירוח עצמי תחת MIT וללא צורך בחשבון Paperclip.",
    limits: "הסוכנים, המודלים והתשתית שמחברים למערכת עשויים לעלות כסף; טלמטריה אנונימית פעילה כברירת מחדל וניתנת לביטול.",
    pros: ["ניהול כמה סוכנים", "תקציבים וממשל מובנים", "MIT ואירוח עצמי"], cons: ["לא כולל מודלים חינמיים", "דורש תפעול שרת"],
    alternatives: ["Orbit", "Hindsight"], url: "https://paperclip.app/", added: "2026-09-29", verified: "2026-10-01",
    sources: [{ label: "המאגר הרשמי", url: "https://github.com/PaperclipAI/paperclip" }, { label: "אודות", url: "https://paperclip.app/about/" }]
  },
  {
    slug: "chit", name: "Chit", mark: "Ch", category: "productivity", subcategories: ["Claude Code", "סיכום עבודה", "macOS"],
    tagline: "סיכום יומי מקומי של העבודה שנעשתה ב־Claude Code.",
    solves: "קורא את היסטוריית Claude Code המקומית ומפיק קבלה יומית שמסכמת משימות ושינויים.",
    uses: ["פרודוקטיביות", "פיתוח", "דוחות"], audience: "משתמשי Claude Code ב־Mac שרוצים תיעוד עבודה אוטומטי.",
    free: "הקבלה של היום הקודם זמינה בחינם בכל יום וללא תקופת ניסיון.",
    limits: "היסטוריה שבועית וחודשית דורשת רכישת Pro חד־פעמית; macOS 13 ומעלה בלבד והאפליקציה עדיין אינה notarized.",
    pros: ["פועל על היסטוריה מקומית", "סיכום יומי פשוט", "אין מנוי למסלול החינמי"], cons: ["Mac בלבד", "היסטוריה ארוכה בתשלום"],
    alternatives: ["Minutes", "Kilo Code"], url: "https://chit.zopcloud.zop.dev/", added: "2026-09-29", verified: "2026-10-01",
    sources: [{ label: "האתר הרשמי", url: "https://chit.zopcloud.zop.dev/" }]
  },
  {
    slug: "tinycast", name: "Tinycast", mark: "Ti", category: "productivity", subcategories: ["Launcher", "macOS", "קוד פתוח"],
    tagline: "Launcher מקורי ל־macOS עם clipboard, snippets וניהול חלונות.",
    solves: "מרכז פקודות, חיפוש, טקסטים שמורים וכלי חלונות בממשק מקלדת מהיר.",
    uses: ["פרודוקטיביות", "חלונות", "אוטומציה"], audience: "משתמשי Mac שרוצים חלופה פתוחה ל־Raycast.",
    free: "האפליקציה כולה חינמית וקוד פתוח תחת AGPL-3.0, כולל תמיכה בחלק מהרחבות Raycast.",
    limits: "דורשת macOS 26 ומעלה; יכולות AI אופציונליות דורשות חשבון או מפתח משל המשתמש.",
    pros: ["קוד פתוח", "כלי מערכת רבים", "תמיכה בהרחבות"], cons: ["דרישת macOS חדשה מאוד", "AI אינו כלול בחינם"],
    alternatives: ["KiwiDesk", "Chit"], url: "https://tinycast.dev/", added: "2026-09-29", verified: "2026-10-01",
    sources: [{ label: "האתר הרשמי", url: "https://tinycast.dev/" }, { label: "המאגר הרשמי", url: "https://github.com/abue-ammar/tinycast" }]
  },
  {
    slug: "open-code-review", name: "Open Code Review", mark: "OCR", category: "development", subcategories: ["סקירת קוד", "CLI", "אבטחה"],
    tagline: "CLI פתוח לסקירת קוד עם pipelines דטרמיניסטיים וסוכן LLM.",
    solves: "משלב כללי אבטחה ושגיאות קבועים עם ניתוח מודל כדי לייצר ממצאים מדויקים ברמת שורה.",
    uses: ["פיתוח", "סקירת קוד", "אבטחה"], audience: "צוותי פיתוח שרוצים סקירה אוטומטית שניתנת להרצה בתהליך CI.",
    free: "התוכנה חינמית וקוד פתוח תחת Apache-2.0 וניתנת להרצה עם ספק תואם OpenAI או Anthropic.",
    limits: "השימוש במודל הנבחר עשוי לעלות כסף; יש להשתמש בגרסה עדכנית כדי לקבל תיקוני אבטחה.",
    pros: ["כללים דטרמיניסטיים ו־LLM", "הערות ברמת שורה", "מתאים ל־CI"], cons: ["עלות המודל נפרדת", "דורש הגדרה טכנית"],
    alternatives: ["Whiteboard", "Kilo Code"], url: "https://github.com/alibaba/open-code-review", added: "2026-09-29", verified: "2026-10-01",
    sources: [{ label: "המאגר הרשמי", url: "https://github.com/alibaba/open-code-review" }, { label: "הנחיות אבטחה", url: "https://github.com/alibaba/open-code-review/security" }]
  },
  {
    slug: "diagram-design", name: "Diagram Design", mark: "DD", category: "skills", subcategories: ["דיאגרמות", "Agent skill", "HTML/SVG"],
    tagline: "מיומנות סוכן שיוצרת דיאגרמות עריכתיות כ־HTML/SVG עצמאי.",
    solves: "מייצרת דיאגרמות מקצועיות מתוך תיאור ומייבאת Mermaid, draw.io ו־Excalidraw.",
    uses: ["עיצוב", "דיאגרמות", "פיתוח"], audience: "מפתחים, אדריכלים וכותבי מסמכים שעובדים עם סוכני AI.",
    free: "המיומנות חינמית וקוד פתוח תחת MIT וכל פלט נשמר כקובץ HTML/SVG עצמאי.",
    limits: "נדרש סוכן מארח ומודל, שעשויים להיות בתשלום; איכות התוצאה תלויה בהוראות ובמודל.",
    pros: ["39 סוגי דיאגרמות", "קבצים עצמאיים", "ייבוא פורמטים קיימים"], cons: ["לא יישום עצמאי", "הסוכן המארח עשוי לעלות"],
    alternatives: ["Napkin AI", "Whiteboard"], url: "https://diagramdesign.dev/", added: "2026-09-29", verified: "2026-10-06",
    sources: [{ label: "המאגר הרשמי", url: "https://github.com/cathrynlavery/diagram-design" }, { label: "האתר הרשמי", url: "https://cathrynlavery.github.io/diagram-design/" }]
  },
  {
    slug: "openresearch", name: "OpenResearch", mark: "OR", category: "research", subcategories: ["מחקר מקומי", "ניסויים", "קוד פתוח"],
    tagline: "סביבת מחקר local-first עם lineage מלא לניסויים ותוצרים.",
    solves: "מארגנת שאלות, ניסויים, נתונים ומסקנות כך שאפשר לשחזר את הדרך מהמקור לתוצאה.",
    uses: ["מחקר", "AI", "ניהול ידע"], audience: "חוקרים ומהנדסים שרוצים סביבת עבודה מקומית ורפרודוצבילית.",
    free: "היישום חינמי וקוד פתוח תחת MIT ויכול לעבוד עם מודלים מקומיים.",
    limits: "מחשוב מנוהל, סוכנים מסחריים ומודלי ענן נפרדים; גרסאות רשמיות כוללות טלמטריה גסה שניתן לבטל.",
    pros: ["Local-first", "lineage ורפרודוצביליות", "תמיכה במודלים מקומיים"], cons: ["שירותים מנוהלים עשויים לעלות", "תמיכת Windows עדיין מוקדמת"],
    alternatives: ["Paper2Agent", "Hindsight"], url: "https://openresearch.sh/", added: "2026-09-29", verified: "2026-10-01",
    sources: [{ label: "המאגר הרשמי", url: "https://github.com/alphaXiv/OpenResearch" }, { label: "האתר הרשמי", url: "https://openresearch.sh/" }]
  },
  {
    slug: "workscribe", name: "Workscribe", mark: "W", category: "productivity", subcategories: ["יומן עבודה", "טרמינל", "Local-first"],
    tagline: "מתעד פעילות בטרמינל והופך אותה לסיכומי עבודה יומיים ושבועיים.",
    solves: "אוסף פקודות ואירועי פיתוח למסד מקומי, מקבץ אותם למקטעי עבודה ומפיק עדכון מוכן לסטנדאפ או לייצוא.",
    uses: ["פרודוקטיביות", "תיעוד", "אוטומציה"], audience: "מפתחים ואנשי DevOps שרוצים לתעד התקדמות בלי לכתוב יומן ידני.",
    free: "ה-CLI חינמי וקוד פתוח תחת MIT; אפשר להפיק סיכומים בחינם ובאופן מקומי עם Ollama.",
    limits: "דורש Node.js 22 ו-zsh או bash; אין תמיכה ישירה ב-Windows מחוץ ל-WSL2. שימוש ב-OpenAI, Anthropic או ספק מתארח עשוי לעלות.",
    pros: ["נתונים נשמרים מקומית", "סינון סודות לפני שמירה", "סיכום יומי ושבועי וייצוא Markdown"], cons: ["דורש מודל נפרד לסיכום", "מנטר פקודות ולכן דורש בדיקת הגדרות פרטיות"],
    alternatives: ["Minutes", "Circleback"], url: "https://www.npmjs.com/package/@workscribe/cli", added: "2026-10-03", verified: "2026-10-03",
    sources: [{ label: "חבילת npm, רישיון ותיעוד", url: "https://www.npmjs.com/package/@workscribe/cli" }]
  },
  {
    slug: "open-design", name: "OpenDesign", mark: "OD", category: "design", subcategories: ["עיצוב בעזרת AI", "Local-first", "Design systems"],
    tagline: "סביבת עיצוב פתוחה שמפעילה סוכני קוד על מערכות עיצוב ומייצאת תוצרים אמיתיים.",
    solves: "מחברת brief, מערכת עיצוב, skills ותבניות כדי ליצור ולרענן אבטיפוסים, דפים, מצגות, תמונות ווידאו מתוך סוכן מקומי.",
    uses: ["עיצוב", "יצירת תוכן", "בניית מוצרים"], audience: "מעצבים, מפתחים וצוותי מוצר שרוצים workflow מקומי ומבוסס קבצים במקום כלי AI סגור.",
    free: "היישום והקוד חינמיים תחת Apache-2.0, עם הרצה מקומית, Desktop או self-host; אין דמי שימוש מינימליים בתוכנה עצמה.",
    limits: "המודל או סוכן הקוד מגיעים בנפרד ועשויים לדרוש מנוי או API; Linux דורש כרגע הרצה מהמקור, וב-builds רשמיים קיימת טלמטריית אמינות מצומצמת שאינה ניתנת לכיבוי.",
    pros: ["Local-first ו-BYOK", "מבחר גדול של skills ומערכות עיצוב", "ייצוא HTML, PDF, PPTX, ZIP ו-MP4"], cons: ["תלוי בסוכן חיצוני", "מורכב יותר מכלי עיצוב ממוקד"],
    alternatives: ["Diagram Design", "HyperFrames"], url: "https://open-design.ai/", added: "2026-10-04", verified: "2026-10-04",
    sources: [{ label: "המאגר והתיעוד", url: "https://github.com/nexu-io/open-design" }, { label: "רישיון Apache-2.0", url: "https://github.com/nexu-io/open-design/blob/main/LICENSE" }, { label: "מדיניות פרטיות", url: "https://github.com/nexu-io/open-design/blob/main/PRIVACY.md" }]
  },
  {
    slug: "anthropic-skills", name: "Anthropic Skills", mark: "An", category: "skills", subcategories: ["אוסף סקילים", "Claude", "Agent Skills"],
    tagline: "אוסף רשמי של סקילים לדוגמא ליצירה, פיתוח, תקשורת ומסמכים.",
    solves: "מספק סקילים מוכנים ודפוסי ייחוס לבניית יכולות חוזרות לסוכנים, כולל יצירת מסמכים, בדיקות יישומי ווב, עיצוב ויצירת MCP.",
    uses: ["AI", "מסמכים", "פיתוח"], audience: "משתמשי Claude Code ומפתחי סוכנים שרוצים סקילים רשמיים ודוגמאות מורכבות.",
    free: "המאגר והסקילים לדוגמה זמינים בחינם; רבים מהם בקוד פתוח תחת Apache 2.0 וניתן להתקינם כתוספים ב-Claude Code.",
    limits: "רישיונות מעורבים: סקילי DOCX, PDF, PPTX ו-XLSX הם source-available ולא קוד פתוח. שימוש ב-Claude.ai או ב-API כפוף למסלול ולעלות נפרדים.",
    pros: ["מקור רשמי של Anthropic", "כיסוי רחב ודוגמאות production", "כולל תבנית ומפרט Agent Skills"], cons: ["חלק מהסקילים אינם בקוד פתוח", "חלק מדרכי ההתקנה ייעודיות ל-Claude"],
    alternatives: ["Vercel Agent Skills", "Find Skills"], url: "https://github.com/anthropics/skills", added: "2026-10-06", verified: "2026-10-06",
    sources: [{ label: "המאגר, התקנה ורישיונות", url: "https://github.com/anthropics/skills" }, { label: "מפרט Agent Skills", url: "https://agentskills.io/" }]
  },
  {
    slug: "vercel-agent-skills", name: "Vercel Agent Skills", mark: "V", category: "skills", subcategories: ["React", "Next.js", "Web"],
    tagline: "אוסף רשמי של סקילים לפיתוח, ביצועים, עיצוב וכתיבה למוצרי ווב.",
    solves: "מוסיף לסוכן הנחיות ממוקדות ל-React ו-Next.js, ביקורת ממשק ונגישות, כתיבה, React Native, פריסה ואופטימיזציית Vercel.",
    uses: ["פיתוח", "עיצוב", "AI"], audience: "מפתחי ווב שעובדים עם Codex, Claude Code, Cursor או סוכנים תואמי Agent Skills.",
    free: "כל האוסף חינמי וקוד פתוח תחת MIT, וניתן להתקין את כולו או סקיל יחיד באמצעות Skills CLI.",
    limits: "נדרש סוכן מארח; סקילים הקשורים לפריסה או למדדים עשויים לדרוש חשבון Vercel, והרצת המודל או תשתית היעד אינן כלולות.",
    pros: ["מקור רשמי של Vercel", "כללים מעשיים וממוקדים", "התקנה מודולרית ותמיכה בסוכנים רבים"], cons: ["חלק מהתוכן ממוקד בסטאק של Vercel", "יכולות רשת ותשתית תלויות בסוכן המארח"],
    alternatives: ["Anthropic Skills", "Superpowers"], url: "https://github.com/vercel-labs/agent-skills", added: "2026-10-06", verified: "2026-10-06",
    sources: [{ label: "המאגר ורשימת הסקילים", url: "https://github.com/vercel-labs/agent-skills" }, { label: "רישיון MIT", url: "https://github.com/vercel-labs/agent-skills/blob/main/LICENSE" }]
  },
  {
    slug: "superpowers-skills", name: "Superpowers", mark: "SP", category: "skills", subcategories: ["תהליך פיתוח", "TDD", "Debugging"],
    tagline: "מתודולוגיית פיתוח לסוכני קוד שמחברת תכנון, TDD, דיבוג וביקורת.",
    solves: "מכוונת סוכן מתהליך הבנת הדרישה ועד תכנון, יישום מונחה בדיקות, סקירה וסיום ענף באמצעות סקילים שמופעלים לפי ההקשר.",
    uses: ["פיתוח", "בדיקות", "AI"], audience: "מפתחים שרוצים תהליך עבודה עקבי ומבוקר לסוכני קוד אוטונומיים.",
    free: "הפלאגין והסקילים חינמיים וקוד פתוח תחת MIT, עם נתיבי התקנה ל-Codex, Claude Code, Cursor, Gemini CLI וסוכנים נוספים.",
    limits: "ההתנהגות וה-hooks משתנים בין סוכנים; הסוכן והמודל עצמם נפרדים. רכיב חזותי אופציונלי טוען לוגו מרחוק עם מספר גרסה, וניתן לבטל זאת במשתנה סביבה.",
    pros: ["תהליך פיתוח מקצה לקצה", "תמיכה רחבה בסוכנים", "דגש על בדיקות וסקירה"], cons: ["תהליך דעתני שאינו מתאים לכל צוות", "התקנה ועדכון שונים בין פלטפורמות"],
    alternatives: ["Vercel Agent Skills", "AI Maestro"], url: "https://github.com/obra/superpowers", added: "2026-10-06", verified: "2026-10-06",
    sources: [{ label: "המאגר והתקנה", url: "https://github.com/obra/superpowers" }, { label: "רישיון MIT", url: "https://github.com/obra/superpowers/blob/main/LICENSE" }]
  },
  {
    slug: "find-skills", name: "Find Skills", mark: "FS", category: "skills", subcategories: ["גילוי סקילים", "התקנה", "Skills CLI"],
    tagline: "סקיל שמאתר, בודק ומתקין סקילים נוספים לפי המשימה המבוקשת.",
    solves: "מתרגם צורך של המשתמש לחיפוש ב-skills.sh וב-Skills CLI, בודק מקור ואימוץ ומציג פקודת התקנה מתאימה.",
    uses: ["AI", "חיפוש", "אוטומציה"], audience: "משתמשי סוכנים שרוצים להרחיב יכולות בלי לחפש ידנית בין מאגרים.",
    free: "הסקיל ו-Skills CLI חינמיים וקוד פתוח תחת MIT; החיפוש, ההתקנה והעדכון אינם דורשים מסלול בתשלום.",
    limits: "נדרשים Node.js, npm וגישה לרשת. תוצאות החיפוש כוללות תוכן צד שלישי, ולכן צריך לבדוק מקור, רישיון וקוד לפני התקנה.",
    pros: ["מקצר גילוי והתקנה", "תומך בעשרות סוכנים", "כולל הנחיות לבדיקת איכות"], cons: ["איכות התוצאות תלויה במאגר הציבורי", "התקנת סקיל צד שלישי מוסיפה סיכון שרשרת אספקה"],
    alternatives: ["Anthropic Skills", "Vercel Agent Skills"], url: "https://github.com/vercel-labs/skills/tree/main/skills/find-skills", added: "2026-10-06", verified: "2026-10-06",
    sources: [{ label: "ה-SKILL.md הרשמי", url: "https://github.com/vercel-labs/skills/blob/main/skills/find-skills/SKILL.md" }, { label: "Skills CLI ורישיון", url: "https://github.com/vercel-labs/skills" }]
  },
  {
    slug: "vokalu", name: "Vokalu", mark: "Vo", category: "productivity", subcategories: ["הכתבה", "נגישות", "AI מקומי"],
    tagline: "הכתבה מערכתית ל-Windows ול-Mac עם מצב מקומי חינמי שפועל גם ללא אינטרנט.",
    solves: "מכניס דיבור כטקסט בכל שדה כתיבה באמצעות קיצור מקשים, בלי תלות בתוסף לדפדפן או באינטגרציה ייעודית לכל אפליקציה.",
    uses: ["כתיבה", "פרודוקטיביות", "נגישות"], audience: "אנשים שמעדיפים לדבר במקום להקליד ורוצים אפשרות פרטית ומקומית ב-Windows או macOS.",
    free: "Private mode עם מודל דיבור מקומי והכתבה ללא עיצוב AI חינמי ללא מכסת דקות; בנוסף המסלול המקוון מעניק 25¢ בכל שבוע ללא כרטיס.",
    limits: "זהו יישום קנייני ללא רישיון קוד פתוח; עיצוב AI מקומי עולה 0.5¢ לדקה, תמלול ענן ופגישות עולים 1.5–2¢ לדקה, ואין אפליקציית מובייל.",
    pros: ["הכתבה חינמית ולא מקוונת", "עובד בכל שדה טקסט", "Windows ו-macOS"], cons: ["קוד סגור", "עיצוב, פגישות וסנכרון מתקדמים בתשלום"],
    alternatives: ["Minutes", "Circleback"], url: "https://vokalu.com/", added: "2026-10-07", verified: "2026-10-07",
    sources: [{ label: "תמחור ומגבלות רשמיים", url: "https://vokalu.com/pricing/" }, { label: "תנאי השימוש", url: "https://vokalu.com/terms/" }]
  }
,
  {
    slug: "velozity", name: "Velozity", mark: "Ve", category: "productivity", subcategories: ["שיתוף פעולה", "סוכני AI", "פגישות"],
    tagline: "משרד דיגיטלי משותף שבו צוותים וסוכני AI עובדים באותו הקשר.",
    solves: "מאחד צ'אט, שיחות, תמלול, משימות, לוחות שנה וסוכנים במרחב אחד כדי לצמצם מעבר בין אפליקציות והסברים חוזרים.",
    uses: ["שיתוף", "פגישות", "אוטומציה"], audience: "צוותים מרוחקים ויחידים שרוצים לרכז עבודה אנושית וסוכני AI באותו workspace.",
    free: "AI Space Free כולל 15 משימות אישיות בשבוע, 200 דקות תמלול, 7 ימי היסטוריה ממקורות מחוברים ועד 10 משימות שנוצרות אוטומטית משיחות ופגישות. Co-Worker Free כולל 150 קרדיטי AI שמתחדשים מדי חודש.",
    limits: "משימות ותמלול ללא הגבלה, רענון אוטומטי של מקורות, לוח שנה מחובר, יותר קרדיטים ובחירת מודל דורשים שדרוג; חיבור Claude Code או Codex עשוי לדרוש מנוי נפרד.",
    pros: ["מסלול חינמי מפורש", "צ'אט, פגישות, משימות וסוכנים יחד", "קרדיטי AI מתחדשים מדי חודש"], cons: ["היסטוריית מקורות מוגבלת לשבוע", "מכסות AI ותמלול מוגבלות"],
    alternatives: ["Trello", "Make", "Circleback"], url: "https://www.velozity.ai/", added: "2026-10-08", verified: "2026-10-12",
    sources: [{ label: "תמחור ומכסות רשמיים", url: "https://www.velozity.ai/pricing-us" }, { label: "אתר ההשקה הרשמי", url: "https://getvelozity.com/" }, { label: "אות השקה ב-Product Hunt", url: "https://www.producthunt.com/leaderboard/weekly/2026/41" }]
  },
  {
    slug: "openclaw", name: "OpenClaw", mark: "OC", category: "productivity", subcategories: ["עוזר אישי", "אוטומציה", "Self-hosted"],
    tagline: "עוזר AI מקומי ורב-ערוצי שפועל במחשב, בנייד ובאפליקציות המסרים.",
    solves: "מחבר זיכרון, כלים וסוכנים לשער אחד שיכול לקבל בקשות דרך Discord, Slack, Teams, Telegram, WhatsApp, iMessage וערוצים נוספים.",
    uses: ["אוטומציה", "עוזר אישי", "AI"], audience: "משתמשים טכניים וצוותים שרוצים עוזר מתמשך בבעלותם עם בחירת מודל וערוץ.",
    free: "התוכנה חינמית תחת MIT, ללא מסלול ענן או מנוי חובה; היא רצה על החומרה של המשתמש ותומכת במודלים מקומיים או בחיבור לחשבונות ולספקים קיימים.",
    limits: "מודלים, שרתים וחשבונות מסרים עשויים לעלות כסף בנפרד. כלים רצים על ה-host בסשן הראשי כברירת מחדל וה-sandbox כבוי, לכן יש להפעיל בידוד, לאשר שולחים ולקרוא את מדריך האבטחה לפני חשיפה מרחוק.",
    pros: ["יותר מ-20 ערוצי תקשורת", "אפליקציות לכל הפלטפורמות", "זיכרון, כלים וסוכנים הניתנים להחלפה"], cons: ["הגדרה ותפעול מורכבים", "הרשאות רחבות אם לא מקשיחים sandbox"],
    alternatives: ["nanoMuse", "ScallopBot", "OpenBot"], url: "https://openclaw.ai/", added: "2026-10-11", verified: "2026-10-11",
    sources: [{ label: "המאגר, תכונות ורישיון MIT", url: "https://github.com/openclaw/openclaw" }, { label: "גרסה 2026.9.8", url: "https://github.com/openclaw/openclaw/blob/main/docs/releases/2026.9.8.md" }, { label: "תיעוד sandbox רשמי", url: "https://docs.openclaw.ai/gateway/sandboxing" }]
  },
  {
    slug: "compositor", name: "Compositor", mark: "Co", category: "design", subcategories: ["עריכת תמונה", "PSD", "macOS"],
    tagline: "עורך תמונות מקומי וחינמי ל-Mac שנבנה סביב הרגלי עבודה של Photoshop.",
    solves: "מספק שכבות, מסכות, התאמות לא-הרסניות, בחירות, ריטוש, Camera Raw וייבוא PSD/PSB בממשק native עם קיצורי דרך מוכרים.",
    uses: ["עריכת תמונה", "עיצוב", "צילום"], audience: "צלמים ומעצבים עם Mac Apple silicon שרוצים עורך מקומי ללא מנוי ועם workflow דומה ל-Photoshop.",
    free: "האפליקציה חינמית וקוד פתוח תחת MIT, ללא חשבון או מנוי; ההפצה חתומה ומאומתת notarization וזמינה גם דרך Homebrew.",
    limits: "דורשת macOS 26 ומעבד Apple silicon, זמינה באנגלית בלבד ומתוחזקת בידי מפתח יחיד. ייבוא PSD אינו משמר כל וקטור, טקסט אנכי או מצב צבע CMYK כעריכה חיה.",
    pros: ["שכבות, מסכות ו-adjustment layers", "ייבוא PSD/PSB ו-RAW", "חתימה ועדכונים אוטומטיים"], cons: ["Mac חדש בלבד", "אין Windows, Linux או תרגומים"],
    alternatives: ["GIMP", "Rembrandt", "OpenDesign"], url: "https://robbietilton.com/compositor", added: "2026-10-11", verified: "2026-10-11",
    sources: [{ label: "המאגר, דרישות ורישיון", url: "https://github.com/robbietilton/Compositor" }, { label: "הפצות רשמיות", url: "https://github.com/robbietilton/Compositor/releases" }]
  },
  {
    slug: "lune-research", name: "Lune Research", mark: "Lu", category: "research", subcategories: ["חיפוש מאמרים", "MCP", "מדעי המחשב"],
    tagline: "מנוע חיפוש וקריאה למאמרי מדעי המחשב שמתחבר ישירות לסוכני AI.",
    solves: "נותן לסוכן לחפש מאמרים מכנסים מובילים, לקרוא טקסט מלא זמין, לעקוב אחר ציטוטים ולהחזיר ראיות שאפשר לפתוח מתוך סביבת העבודה הקיימת.",
    uses: ["מחקר", "סקירת ספרות", "למידה"], audience: "חוקרי AI ומדעי המחשב, סטודנטים ומפתחים שעובדים עם ChatGPT, Claude, Codex, Cursor או לקוח MCP אחר.",
    free: "מסלול Free קבוע כולל 10 בקשות ביום ואת כל היכולות, דרך MCP מרוחק, CLI או סביבת הסוכן; אין צורך בכרטיס אשראי כדי להתחיל.",
    limits: "הכיסוי ממוקד בכנסי מדעי המחשב בדירוג CORE/CCF משנת 2016 ואילך ולא בכל הספרות המדעית. נדרש חשבון, והבקשות מעבר למכסה היומית עולות כסף.",
    pros: ["טקסט מלא ושרשראות ציטוטים", "מתחבר לעשרות לקוחות MCP", "מקורות נפתחים לצד התשובה"], cons: ["10 בקשות ביום", "כיסוי תחומי צר יחסית"],
    alternatives: ["ResearchRabbit", "Gemini Notebook", "AstaBrief"], url: "https://luneresearch.com/", added: "2026-10-11", verified: "2026-10-12",
    sources: [{ label: "שאלות נפוצות ותמחור רשמי", url: "https://luneresearch.com/docs/faq" }, { label: "תנאי השירות והמכסות", url: "https://luneresearch.com/legal/terms" }, { label: "אות ההשקה ב-Product Hunt", url: "https://www.producthunt.com/products/lune-research" }]
  },
  {
    slug: "pentagi", name: "PentAGI", mark: "PA", category: "development", subcategories: ["אבטחת מידע", "סוכני AI", "אירוח עצמי"],
    tagline: "מערכת רב-סוכנית אוטונומית לבדיקות חדירה מורשות על תשתית עצמית.",
    solves: "מקבלת יעד ומטרה, מתכננת בדיקת אבטחה, מפעילה יותר מ-20 כלי pentest בתוך סביבת Docker מבודדת ושומרת ממצאים ודוחות.",
    uses: ["בדיקות חדירה", "אבטחת מידע", "אוטומציה"], audience: "חוקרי אבטחה, צוותי Red Team ובודקי חדירה שמפעילים בדיקות מורשות בלבד.",
    free: "הליבה ניתנת לאירוח עצמי תחת MIT, עם Docker Compose ומבחר ספקי מודלים; אפשר לעבוד עם Ollama או vLLM מקומיים ללא מנוי לפלטפורמת PentAGI.",
    limits: "נדרשים משאבי אירוח ומודל מקומי או מפתח לספק LLM, ועלויות ספקי ענן נפרדות. יכולות Enterprise ושירותי הענן של VXControl אינם חלק מהליבה החינמית. זהו כלי התקפי שיש להפעיל רק על מערכות שקיבלתם הרשאה מפורשת לבדוק.",
    pros: ["יותר מ-20 כלי אבטחה בסביבה מבודדת", "בחירת מודל מקומי או ספק ענן", "API ודוחות מפורטים"], cons: ["הקמה כבדה יחסית עם Docker ומסדי נתונים", "שימוש שגוי עלול להיות מסוכן או בלתי חוקי"],
    alternatives: ["AgentGuard by agentwares", "Plimsoll"], url: "https://github.com/vxcontrol/pentagi", added: "2026-10-12", verified: "2026-10-12",
    sources: [{ label: "המאגר הרשמי ורישיון MIT", url: "https://github.com/vxcontrol/pentagi" }, { label: "גרסאות יציבות", url: "https://github.com/vxcontrol/pentagi/releases" }]
  },
  {
    slug: "context-mode", name: "Context Mode", mark: "CM", category: "development", subcategories: ["MCP", "סוכני קוד", "ניהול הקשר"],
    tagline: "שרת MCP מקומי שמצמצם פלטי כלים ושומר זיכרון עבודה לסוכני קוד.",
    solves: "מריץ ומסכם פלטים גדולים בתוך sandbox במקום להזרים אותם לחלון ההקשר, ושומר מצב מפגש מקומי כדי לצמצם אובדן מידע לאחר compact.",
    uses: ["סוכני קוד", "MCP", "חיסכון בטוקנים"], audience: "מפתחים שעובדים עם Codex, Claude Code, Cursor, OpenCode או אחד מ-17 הלקוחות הנתמכים.",
    free: "השימוש המקומי חינמי ללא חשבון, טלמטריה, ענן או מנוי. הקוד זמין תחת Elastic License 2.0 ונתוני המפגש נשמרים ב-SQLite במחשב.",
    limits: "ELv2 הוא רישיון source-available ולא רישיון קוד פתוח מאושר OSI: אסור להציע את התוכנה כשירות מנוהל או להסיר הודעות רישוי. ההתקנה דורשת Node.js או Bun, וחיסכון בפועל תלוי בדפוסי העבודה.",
    pros: ["עיבוד מקומי וללא מעקב", "תמיכה רחבה ב-MCP וב-hooks", "זיכרון מפגש וניתוב כלים"], cons: ["רישיון מגביל שירות מתחרה", "שכבה נוספת שדורשת הגדרה ובדיקת תאימות"],
    alternatives: ["Skills Hub", "Plimsoll", "OpenQodex"], url: "https://github.com/mksglu/context-mode", added: "2026-10-12", verified: "2026-10-12",
    sources: [{ label: "המאגר, פרטיות ותיעוד", url: "https://github.com/mksglu/context-mode" }, { label: "רישיון Elastic 2.0", url: "https://github.com/mksglu/context-mode/blob/main/LICENSE" }]
  },
  {
    slug: "text-to-cad", name: "text-to-cad", mark: "TC", category: "skills", subcategories: ["CAD", "Agent Skills", "ייצור"],
    tagline: "תוסף מקומי שנותן לסוכני AI כלי יצירה, בדיקה והצגה של מודלי CAD.",
    solves: "מאפשר לסוכן להפיק STEP, GLB, STL ו-3MF, לבצע בדיקות תכנון לייצור, ליצור שרטוטים הנדסיים ולהציג אותם בצופה מקומי.",
    uses: ["CAD", "מידול תלת-ממד", "סוכני AI"], audience: "מהנדסים, מייקרים ומפתחים שרוצים לשלב יצירת CAD בתהליכי Codex, Claude Code, Cursor, Gemini או סוכן תומך Skills.",
    free: "התוסף וה-workflows המקומיים חינמיים תחת MIT, ללא מכסת יצירה של הפלטפורמה; ההתקנה משתמשת ב-uv ומריצה שרת וצופה מקומיים.",
    limits: "נדרש סוכן תואם והעלויות שלו או של מודל ה-AI נפרדות. שירותי הדפסה, CNC ופבריקציה חיצוניים עולים בנפרד. טלמטריית שימוש ודוחות קריסה פעילים כברירת מחדל, אך אפשר לכבות אותם בפקודה הרשמית.",
    pros: ["פורמטי CAD שימושיים וייצוא מקומי", "תמיכה בכמה סוכנים נפוצים", "בדיקות DFM ושרטוטים הנדסיים"], cons: ["תלוי בסוכן ובסביבת Python/uv", "טלמטריה מופעלת כברירת מחדל"],
    alternatives: ["Open CAD Studio", "Skills Hub"], url: "https://www.texttocad.dev/", added: "2026-10-12", verified: "2026-10-12",
    sources: [{ label: "המאגר, התקנה ורישיון MIT", url: "https://github.com/earthtojake/text-to-cad" }, { label: "התיעוד הרשמי", url: "https://www.texttocad.dev/" }]
  },
  {
    slug: "claude-mem", name: "Claude-Mem", mark: "CM", category: "development", subcategories: ["זיכרון לסוכנים", "MCP", "כלי פיתוח"],
    tagline: "זיכרון מתמשך לסוכני קוד ששומר, מכווץ ומחזיר הקשר בין מפגשים.",
    solves: "לוכד תצפיות משימוש בכלים, מסכם אותן ומחזיר הקשר רלוונטי למפגשים עתידיים כדי לצמצם אובדן החלטות וידע לאחר סגירת שיחה או דחיסת הקשר.",
    uses: ["זיכרון לסוכנים", "המשכיות בין מפגשים", "חיפוש הקשר"], audience: "מפתחים שעובדים עם Claude Code, Codex, Gemini, OpenClaw, Copilot, OpenCode וסוכנים תואמים נוספים.",
    free: "הקוד וה-worker המקומי זמינים תחת Apache-2.0. אפשר לדלג על כניסה לחשבון ולהפעיל את הסיכום מול Ollama, LM Studio או vLLM מקומיים ללא מפתח API; הנתונים המקומיים נשמרים ב-SQLite ו-Chroma.",
    limits: "התקנת ברירת המחדל מציעה CMEM Pro באירוח עם ניסיון של 30 יום בלבד. לאחר מכן נדרש מנוי, מודל מקומי או ספק חיצוני; שימוש בספק ענן עשוי לעלות כסף ולשלוח אליו הקשר. ההתקנה דורשת Node.js 20 ומעלה, ויש לבדוק היטב אילו תכנים רגישים נלכדים.",
    pros: ["כ-99,883 כוכבי GitHub ופעילות שוטפת", "תמיכה במספר רב של סוכנים", "נתיב מקומי חינמי עם שליטה בספק המודל"], cons: ["לכידת הקשר דורשת הגדרות פרטיות זהירות", "השירות המאוחסן אינו חינמי לאחר תקופת הניסיון"],
    alternatives: ["Hindsight", "Context Mode"], url: "https://claude-mem.ai/", added: "2026-10-12", verified: "2026-10-12",
    sources: [{ label: "המאגר, התקנה ורישיון Apache-2.0", url: "https://github.com/thedotmack/claude-mem" }, { label: "מודלים מקומיים ושיקולי אבטחה", url: "https://github.com/thedotmack/claude-mem/blob/main/SECURITY.md" }, { label: "גרסאות רשמיות", url: "https://github.com/thedotmack/claude-mem/releases" }]
  },
  {
    slug: "open-codesign", name: "Open CoDesign", mark: "OD", category: "design", subcategories: ["עיצוב ממשקים", "מצגות", "AI מקומי"],
    tagline: "סטודיו מקומי שממיר פרומפטים לאבות-טיפוס, מצגות ונכסים ניתנים לעריכה.",
    solves: "יוצר ומעדכן HTML או React, מצגות וקובצי עיצוב במרחב עבודה מקומי, עם תצוגה חיה, היסטוריית גרסאות וייצוא לחמישה פורמטים.",
    uses: ["עיצוב ממשקים", "אב-טיפוס", "מצגות"], audience: "מעצבים, אנשי מוצר ומפתחים שרוצים כלי prompt-to-design פתוח שאינו נעול לספק מודל יחיד.",
    free: "אפליקציית ה-Desktop חינמית וקוד פתוח תחת MIT. אפשר לעבוד מקומית עם Ollama או לחבר חשבון או מפתח של ספק קיים; מצב האפליקציה והקבצים נשמרים במחשב.",
    limits: "האפליקציה אינה כוללת עלויות מודל או יצירת תמונות. המתקינים אינם חתומים או notarized עדיין, הממשק זמין באנגלית ובסינית, וייצוא דינמי מורכב עשוי לדרוש בדיקה ידנית.",
    pros: ["תומך ביותר מ-20 ספקים וב-Ollama", "ייצוא HTML, PDF, PPTX, ZIP ו-Markdown", "כלי סוכן מקומיים עם אישור הרשאות"], cons: ["מתקינים לא חתומים", "איכות ותמחור תלויים במודל שנבחר"],
    alternatives: ["OpenDesign", "Canva", "Napkin AI"], url: "https://github.com/OpenCoworkAI/open-codesign", added: "2026-10-12", verified: "2026-10-12",
    sources: [{ label: "המאגר, החינמיות ורישיון MIT", url: "https://github.com/OpenCoworkAI/open-codesign" }, { label: "גרסאות וקובצי התקנה", url: "https://github.com/OpenCoworkAI/open-codesign/releases" }]
  },
  {
    slug: "feynman-research", name: "Feynman", mark: "Fy", category: "research", subcategories: ["סקירת ספרות", "סוכן מחקר", "CLI"],
    tagline: "סוכן מחקר פתוח לסקירת ספרות, ביקורת מאמרים ובדיקת טענות מול מקורות.",
    solves: "מתכנן מחקר, מחפש במאגרי מאמרים, משווה מקורות, בודק ציטוטים ושומר דוחות וקובצי provenance שניתנים לביקורת.",
    uses: ["סקירת ספרות", "מחקר עומק", "ביקורת מאמרים"], audience: "חוקרים, סטודנטים ומהנדסי ML שרוצים תהליך מחקר מקומי ושקוף דרך CLI.",
    free: "ה-CLI חינמי וקוד פתוח תחת MIT. מקורות כמו OpenAlex ו-Semantic Scholar מציעים מפתחות חינמיים, וניתן להגדיר מודלים מקומיים; אין תשלום לפלטפורמת Feynman עצמה.",
    limits: "נדרש Node.js 22.22 ומעלה וספק מודל או מודל מקומי. שימוש במודלי ענן, Firecrawl או מחשוב Modal ו-RunPod עשוי לעלות כסף. טלמטריית שימוש אנונימית פעילה כברירת מחדל וניתנת לכיבוי.",
    pros: ["תהליכי סקירה, audit ו-replication מובנים", "קובצי provenance לבדיקת המקורות", "חבילות חתומות בחותמות SHA-256 לחמש פלטפורמות"], cons: ["עלויות מודל ומחשוב אינן כלולות", "דורש היכרות עם CLI ובדיקת מקורות אנושית"],
    alternatives: ["OpenResearch", "Lune Research", "Gemini Notebook"], url: "https://feynman.is/", added: "2026-10-12", verified: "2026-10-12",
    sources: [{ label: "המאגר, התקנה ורישיון MIT", url: "https://github.com/Companion-Inc/feynman" }, { label: "גרסאות רשמיות", url: "https://github.com/Companion-Inc/feynman/releases" }, { label: "תיעוד רשמי", url: "https://feynman.is/docs" }]
  },
  {
    slug: "artcraft", name: "ArtCraft", mark: "AC", category: "design", subcategories: ["יצירת תמונה", "וידאו AI", "2D ו-3D"],
    tagline: "סביבת יצירה חזותית שמשלבת קומפוזיציה דו-ממדית, סצנות תלת-ממד ומודלי AI.",
    solves: "מאפשרת להציב דמויות ומצלמה, לשלב שכבות ונכסי תלת-ממד ולכוון קומפוזיציה לפני יצירת תמונה או וידאו.",
    uses: ["עיצוב", "וידאו", "קונספט ארט"], audience: "אמנים, מעצבים ויוצרי סרטים שרוצים שליטה חזותית מעבר לפרומפט.",
    free: "קוד היישום זמין לבנייה עצמית בחינם ברישיון MIT או Apache-2.0; קיימות הורדות ל-Windows ול-macOS ובנייה ל-Linux.",
    limits: "שימוש ב-62 המודלים והשירותים המשולבים עשוי לדרוש קרדיטים או מנוי נפרד. יש לבדוק את רישיון המודל והתוצר בכל ספק.",
    pros: ["קומפוזיציה 2D ו-3D", "רישיון כפול פתוח", "כ-18.9 אלף כוכבים"], cons: ["עלויות מודלים נפרדות", "המאגר צעיר יחסית"],
    alternatives: ["Compositor", "OpenDesign"], url: "https://getartcraft.com/", added: "2026-10-12", verified: "2026-10-12",
    sources: [{ label: "המאגר, יכולות ורישיונות", url: "https://github.com/storytold/artcraft" }, { label: "הורדות רשמיות", url: "https://getartcraft.com/" }, { label: "גרסאות", url: "https://github.com/storytold/artcraft/releases" }]
  },
  {
    slug: "ppt-master", name: "PPT Master", mark: "PM", category: "design", subcategories: ["מצגות", "Agent Skills", "PowerPoint"],
    tagline: "Skill מקומי שמייצר מצגות PowerPoint מקוריות וניתנות לעריכה ממסמך או נושא.",
    solves: "הופך PDF, DOCX או טקסט למצגת עם צורות, תרשימים, טבלאות, תבניות, מעברים, אנימציות והערות קריינות.",
    uses: ["מצגות", "עיצוב", "אוטומציה"], audience: "אנשי ידע וצוותים שרוצים PPTX שניתן להמשיך לערוך ב-PowerPoint.",
    free: "הפרויקט חינמי תחת MIT ללא מנוי PPT נוסף, רץ במחשב וניתן להתקנה כ-Skill ב-Codex, Claude Code, Cursor וסוכנים תואמים.",
    limits: "נדרש Python וסוכן AI ועלות המודל נפרדת. יצירת תמונות אופציונלית עשויה לדרוש כלי של הסוכן או מפתח API.",
    pros: ["אובייקטי PowerPoint מקוריים", "תמיכה בתבניות משתמש", "כ-60.6 אלף כוכבים"], cons: ["תלוי בסוכן ובמודל", "דורש התקנה מקומית"],
    alternatives: ["Napkin AI", "Canva"], url: "https://github.com/hugohe3/ppt-master", added: "2026-10-12", verified: "2026-10-12",
    sources: [{ label: "המאגר, התקנה ורישיון MIT", url: "https://github.com/hugohe3/ppt-master" }, { label: "דוגמאות רשמיות", url: "https://hugohe3.github.io/ppt-master-examples/" }, { label: "גרסאות", url: "https://github.com/hugohe3/ppt-master/releases" }]
  },
  {
    slug: "voicestudio", name: "VoiceStudio", mark: "VS", category: "design", subcategories: ["אודיו", "שיבוט קול", "תמלול מקומי"],
    tagline: "סטודיו קול מקומי לשיבוט ועיצוב קולות, דיבוב, תמלול וספרי שמע.",
    solves: "מרכז יצירת קול, דיבוב וידאו, הכתבה, תמלול, עבודות batch, API מקומי ו-MCP באפליקציה אחת.",
    uses: ["יצירת קול", "דיבוב", "תמלול"], audience: "יוצרי תוכן ומפתחים שצריכים תהליכי אודיו מקומיים.",
    free: "האפליקציה חינמית תחת AGPL-3.0 וה-workflows המקומיים רצים על חומרת המשתמש; שירותים מרוחקים אופציונליים.",
    limits: "מודלים, קולות ותוצרים כפופים לרישיונות נפרדים ויש לשבט קול רק בהסכמה. CPU נתמך אך איטי ודורש כ-5GB פנויים; Intel Mac זקוק ל-backend מרוחק.",
    pros: ["646 שפות", "API מקומי ו-MCP", "כ-59 אלף כוכבים"], cons: ["דרישות חומרה ואחסון", "רישוי מודלים נפרד"],
    alternatives: ["BetterWispr", "Circleback"], url: "https://voicestudio.sh/", added: "2026-10-12", verified: "2026-10-12",
    sources: [{ label: "המאגר, דרישות ורישיון", url: "https://github.com/debpalash/VoiceStudio" }, { label: "האתר וההורדות", url: "https://voicestudio.sh/" }, { label: "גרסאות", url: "https://github.com/debpalash/VoiceStudio/releases" }]
  },
  {
    slug: "weknora", name: "WeKnora", mark: "WK", category: "research", subcategories: ["RAG", "בסיס ידע", "Wiki"],
    tagline: "פלטפורמת ידע באירוח עצמי שמשלבת RAG, סוכן מחקר ו-Wiki מתעדכן.",
    solves: "קולטת מסמכים ומקורות ארגוניים, מחפשת ומצטטת מהם, מבצעת משימות מרובות שלבים ומארגנת ידע ל-Wiki.",
    uses: ["מחקר", "ניהול ידע", "RAG"], audience: "צוותים שרוצים בסיס ידע פרטי עם מודלים ואחסון לבחירתם.",
    free: "הקוד חינמי תחת MIT וניתן לפריסה עצמית ב-Docker, Kubernetes או מצב Lite; אפשר להשתמש ב-Ollama מקומי.",
    limits: "הפריסה המלאה דורשת משאבי שרת ותחזוקה. ספקי ענן ואחסון מנוהל מחויבים בנפרד; אפליקציית Desktop עדיין דורשת בנייה מהמקור.",
    pros: ["RAG, סוכן ו-Wiki יחד", "רכיבים ניתנים להחלפה", "כ-33.3 אלף כוכבים"], cons: ["הקמה מלאה מורכבת", "אין installer ל-Desktop"],
    alternatives: ["NotebookLM", "Hindsight"], url: "https://github.com/Tencent/WeKnora", added: "2026-10-12", verified: "2026-10-12",
    sources: [{ label: "המאגר, פריסה ורישיון MIT", url: "https://github.com/Tencent/WeKnora" }, { label: "התיעוד הרשמי", url: "https://weknora.weixin.qq.com/" }, { label: "גרסאות", url: "https://github.com/Tencent/WeKnora/releases" }]
  },
  {
    slug: "archon", name: "Archon", mark: "Ar", category: "development", subcategories: ["סוכני AI", "Workflow", "קוד פתוח"],
    tagline: "מנוע פתוח שמגדיר תהליכי עבודה חוזרים לסוכני קוד.",
    solves: "מקודד תכנון, מימוש, בדיקות, ביקורת ויצירת Pull Request כתהליך YAML עקבי עם שערי אישור ותוצרים.",
    uses: ["פיתוח", "אוטומציה", "סוכני קוד"], audience: "מפתחים וצוותים שרוצים להפוך עבודת סוכני קוד לתהליך צפוי וניתן לבקרה.",
    free: "קוד המקור וה-CLI זמינים בחינם ברישיון MIT, עם התקנה מקומית ל-macOS, Linux ו-Windows.",
    limits: "ההתקנה המלאה דורשת Bun, Claude Code ו-GitHub CLI; שימוש במודל ובשירותי צד שלישי עשוי להיות כרוך בעלות נפרדת.",
    pros: ["תהליכים דטרמיניסטיים", "שערי אישור אנושיים", "רישיון MIT"], cons: ["דורש סביבת פיתוח וכלים נלווים", "עלויות מודל אינן כלולות"],
    alternatives: ["Paperclip", "TAKT"], url: "https://archon.diy/", added: "2026-10-12", verified: "2026-10-12",
    sources: [{ label: "המאגר והתיעוד", url: "https://github.com/coleam00/Archon" }, { label: "מדריך רשמי", url: "https://archon.diy/docs/" }]
  },
  {
    slug: "photocraft", name: "PhotoCraft", mark: "PC", category: "design", subcategories: ["עריכת תמונה", "PSD", "קוד פתוח"],
    tagline: "עורך תמונות פתוח ומקומי שנבנה ב-Rust ותומך בקובצי PSD.",
    solves: "מספק שכבות, מסכות, שכבות התאמה, טקסט, וקטורים ומברשות לעבודה מקומית ללא תלות בענן.",
    uses: ["עריכת תמונה", "PSD", "עיצוב"], audience: "מעצבים ויוצרים שמחפשים חלופה פתוחה וכלי עבודה לא מקוון.",
    free: "היישום והקוד זמינים בחינם ברישיון כפול MIT או Apache-2.0, עם הורדות ל-Windows, macOS, Linux ו-FreeBSD וגם גרסת Web.",
    limits: "המוצר מוגדר early alpha; תאימות PSD ופיצ'רים מסוימים עדיין עלולים להשתנות או להיות חלקיים.",
    pros: ["עבודה לא מקוונת", "שכבות ו-PSD", "רישיון פתוח"], cons: ["גרסת alpha מוקדמת", "לא תחליף מלא לכל תרחיש מקצועי"],
    alternatives: ["GIMP", "ArtCraft"], url: "https://getartcraft.com/apps/photocraft", added: "2026-10-12", verified: "2026-10-12",
    sources: [{ label: "המאגר, הורדות ורישיון", url: "https://github.com/storytold/photocraft" }, { label: "עמוד המוצר", url: "https://getartcraft.com/apps/photocraft" }]
  },
  {
    slug: "rea", name: "REA", mark: "RE", category: "development", subcategories: ["Reverse engineering", "MCP", "סוכני AI"],
    tagline: "שרת MCP פתוח לניתוח התנהגות, יישומים וקבצים בינאריים בעזרת סוכני AI.",
    solves: "מחבר סוכן לכלי ניתוח סטטיים ודינמיים כדי לעקוב אחר זרימות, לאסוף ראיות ולהסביר התנהגות תוכנה.",
    uses: ["הנדסה לאחור", "דיבוג", "מחקר תוכנה"], audience: "חוקרי אבטחה ומפתחים שמנתחים תוכנה שבבעלותם או שיש להם הרשאה לבדוק.",
    free: "REA עצמו חינמי בקוד פתוח וברישיון MIT, וניתן להתקנה דרך npm לשימוש מקומי.",
    limits: "חלק מהאינטגרציות דורשות כלים מסחריים ורישיונות נפרדים; יש להשתמש רק בתוכנה וביעדים שהושגו כחוק ושמותר לנתח.",
    pros: ["קטלוג כלי MCP", "עובד עם כמה סוכנים", "רישיון MIT"], cons: ["דרישות משתנות לפי יעד", "כלי ניתוח ומודלים עשויים לעלות כסף"],
    alternatives: ["Open Code Review", "PentAGI"], url: "https://rea.tools/", added: "2026-10-12", verified: "2026-10-12",
    sources: [{ label: "המאגר והרישיון", url: "https://github.com/morluto/rea" }, { label: "מדריכים רשמיים", url: "https://rea.tools/guides/" }]
  },
  {
    slug: "ponytail", name: "Ponytail", mark: "Po", category: "skills", subcategories: ["סקיל", "קוד מינימלי", "ביקורת קוד"],
    tagline: "סקיל פתוח שמכוון סוכני קוד לבחור בפתרון הקטן והפשוט ביותר.",
    solves: "מוסיף לסוכן סולם החלטה שבודק אם אפשר להסיר, למחזר או לצמצם קוד לפני כתיבת פתרון חדש.",
    uses: ["פיתוח", "ביקורת קוד", "צמצום מורכבות"], audience: "מפתחים שמשתמשים ב-Claude Code, Codex, Cursor וסוכני קוד נוספים.",
    free: "הפרומפט, קובצי הסקיל והמתקינים זמינים בחינם ברישיון MIT ותומכים במגוון סוכנים.",
    limits: "זהו סט הוראות לסוכן ולא מנוע שמבצע אימות עצמאי; איכות התוצאה תלויה בסוכן, במודל ובהקשר הקוד.",
    pros: ["פשוט להתקנה", "תומך בכמה סוכנים", "רישיון MIT"], cons: ["לא כלי בדיקה עצמאי", "עלול להתאים פחות למשימות שמחייבות ארכיטקטורה רחבה"],
    alternatives: ["Superpowers", "Anthropic Skills"], url: "https://ponytail.dev/", added: "2026-10-12", verified: "2026-10-12",
    sources: [{ label: "המאגר והפרומפט", url: "https://github.com/DietrichGebert/ponytail" }, { label: "אתר רשמי", url: "https://ponytail.dev/" }]
  },
  {
    slug: "laya", name: "Laya", mark: "Ly", category: "development", subcategories: ["מודל מקומי", "סיווג", "רב-לשוני"],
    tagline: "מנוע החלטות מקומי ורב-לשוני לבחירה, ניקוד ושאלות כן או לא.",
    solves: "מבצע החלטות מובנות ביותר מ-100 שפות במעבר מודל יחיד, עם נתבים ל-Python, TypeScript, HTTP ו-MCP.",
    uses: ["ניתוב בקשות", "סיווג", "אוטומציה"], audience: "מפתחים שצריכים החלטות מהירות ומובנות בלי לשלוח כל בקשה למודל ענן גדול.",
    free: "הספרייה, השרת והמודלים זמינים להורדה ולהרצה עצמית תחת Apache-2.0.",
    limits: "דורש Python 3.10 ומעלה או סביבת TypeScript מתאימה; ההורדה וההרצה צורכות אחסון וזיכרון, ויש לבדוק דיוק על הנתונים שלכם.",
    pros: ["הרצה מקומית", "יותר מ-100 שפות", "ממשקי Python, TS ו-MCP"], cons: ["דורש משאבי מחשוב", "הדיוק משתנה לפי שפה ואורך קלט"],
    alternatives: ["MT Code", "WeKnora"], url: "https://github.com/NandhaKishorM/laya", added: "2026-10-12", verified: "2026-10-12",
    sources: [{ label: "המאגר והתיעוד", url: "https://github.com/NandhaKishorM/laya" }, { label: "מודל רשמי", url: "https://huggingface.co/convaiinnovations/laya" }]
  },
  {
    slug: "deepseek-harness", name: "DeepSeek Harness", mark: "DH", category: "development", subcategories: ["סוכני AI", "Plugins", "Self-hosted"],
    tagline: "מעטפת פתוחה לסוכני AI שבה כל רכיב בנוי כתוסף.",
    solves: "מספקת סביבת Web מקומית וארכיטקטורת תוספים להרכבת יכולות, כלים ותהליכי עבודה של סוכנים.",
    uses: ["סוכני AI", "פיתוח", "אורקסטרציה"], audience: "מפתחים שרוצים להתנסות במעטפת סוכנים מודולרית ולהרחיב אותה בתוספים.",
    free: "הקוד והממשק המקומי זמינים בחינם ברישיון MIT וניתנים להרצה דרך npm.",
    limits: "המוצר נמצא ב-developer preview וצפויים שינויי תאימות; ספקי מודלים ושירותים חיצוניים עשויים לדרוש מפתחות ועלות נפרדת.",
    pros: ["ארכיטקטורת תוספים", "ממשק Web מקומי", "רישיון MIT"], cons: ["גרסת preview", "שינויים שוברים צפויים"],
    alternatives: ["OpenClaw", "Paperclip"], url: "https://deepseek-harness.github.io/deepseek-harness/", added: "2026-10-12", verified: "2026-10-12",
    sources: [{ label: "המאגר והרישיון", url: "https://github.com/deepseek-ai/deepseek-harness" }, { label: "תיעוד רשמי", url: "https://deepseek-harness.github.io/deepseek-harness/" }]
  },
  {
    slug: "google-ai-edge-foresight", name: "Google AI Edge Foresight", mark: "GF", category: "productivity", subcategories: ["פגישות", "תמלול", "AI מקומי"],
    tagline: "עוזר פגישות ניסיוני ל-Mac שפועל מקומית ומחבר שיחות, הערות וקבצים.",
    solves: "קולט אודיו מערכת ומיקרופון, מעשיר הערות קצרות ומאפשר חיפוש בשיחות ובספריית ידע פרטית גם ללא אינטרנט.",
    uses: ["פגישות", "סיכום", "חיפוש מקומי"], audience: "משתמשי Mac שרוצים תיעוד וחיפוש בפגישות בלי להעלות חומר רגיש לענן.",
    free: "האפליקציה ניתנת להורדה ללא עלות ענן או מנוי, וכל עיבוד ה-AI מתבצע במכשיר.",
    limits: "זוהי אפליקציה ניסיונית ל-Mac בלבד; ביצועים וצריכת משאבים תלויים בחומרה, ויש לבדוק הרשאות הקלטה לפני שימוש בפגישה.",
    pros: ["עובד לא מקוון", "המידע נשאר במכשיר", "חיפוש רב-מודלי"], cons: ["Mac בלבד", "סטטוס ניסיוני"],
    alternatives: ["Circleback", "Minutes"], url: "https://developers.google.com/ai/edge/foresight", added: "2026-10-12", verified: "2026-10-12",
    sources: [{ label: "הכרזה ופרטי חינמיות", url: "https://developers.googleblog.com/google-ai-edge-with-embeddinggemma-2/" }, { label: "הורדה רשמית", url: "https://developers.google.com/ai/edge/foresight" }]
  },
  {
    slug: "synthid-detector", name: "SynthID Detector", mark: "SI", category: "research", subcategories: ["אימות מדיה", "AI", "מקור תוכן"],
    tagline: "בודק תמונות, וידאו ואודיו לאיתור סימני מים בלתי נראים של תוכן שנוצר ב-AI.",
    solves: "מספק אות מקור נוסף לבדיקת מדיה שנוצרה או נערכה בכלים שתומכים ב-SynthID.",
    uses: ["אימות תוכן", "מחקר", "בדיקת מדיה"], audience: "עיתונאים, חוקרים, אנשי אמון ובטיחות וכל מי שבודק מקור של מדיה.",
    free: "Google פתחה את הגלאי בחינם לכולם, ברחבי העולם ובאנגלית, עבור תמונה, וידאו ואודיו.",
    limits: "הבדיקה מזהה רק תוכן עם סימן מים נתמך; היעדר זיהוי אינו הוכחה שהתוכן אינו AI, ושינויים כבדים בקובץ עשויים לפגוע בזיהוי.",
    pros: ["שלושה סוגי מדיה", "גישה עולמית", "מקור רשמי"], cons: ["לא מזהה כל תוכן AI", "הממשק באנגלית"],
    alternatives: ["Graphify", "OpenResearch"], url: "https://synthid.com/", added: "2026-10-12", verified: "2026-10-12",
    sources: [{ label: "הכרזה רשמית", url: "https://blog.google/innovation-and-ai/models-and-research/google-deepmind/synth-id-ai-content/" }, { label: "מגבלות האימות", url: "https://support.google.com/gemini/answer/16722517" }]
  },
  {
    slug: "prism-openai", name: "Prism", mark: "Pr", category: "research", subcategories: ["כתיבה מדעית", "LaTeX", "שיתוף"],
    tagline: "סביבת כתיבה מדעית בענן עם LaTeX, שיתוף ו-GPT בתוך המסמך.",
    solves: "מאחדת כתיבה, עריכת משוואות וציטוטים, חיפוש ספרות ושיתוף מחברים בסביבת מחקר אחת.",
    uses: ["כתיבה אקדמית", "LaTeX", "מחקר"], audience: "חוקרים, סטודנטים וצוותים שמכינים מאמרים מדעיים בשיתוף.",
    free: "חינמית לבעלי חשבון ChatGPT אישי, ללא מגבלת פרויקטים או משתפי פעולה וללא תשלום לפי מושב.",
    limits: "דורשת חשבון וחיבור לענן; OpenAI מציינת שיכולות AI חזקות יותר יתווספו בהמשך לתוכניות ChatGPT בתשלום.",
    pros: ["פרויקטים ומשתפים ללא הגבלה", "LaTeX מובנה", "GPT בהקשר המסמך"], cons: ["שירות ענן", "יכולות מתקדמות עתידיות עשויות להיות בתשלום"],
    alternatives: ["Zotero", "OpenResearch"], url: "https://prism.openai.com/", added: "2026-10-12", verified: "2026-10-12",
    sources: [{ label: "הכרזה ותנאי חינמיות", url: "https://openai.com/index/introducing-prism/" }, { label: "האפליקציה", url: "https://prism.openai.com/" }]
  },
  {
    slug: "rill-browser-recording", name: "Rill", mark: "Ri", category: "development", subcategories: ["בדיקות דפדפן", "הקלטה", "סוכני קוד"],
    tagline: "מקליט בדיקות דפדפן ועבודת סוכנים עם וידאו, קונסול, רשת וציר זמן.",
    solves: "הופך באג, שינוי או בדיקת דפדפן להקלטה שאפשר לבדוק, לשתף ולצרף ל-PR או לדוח תקלה.",
    uses: ["QA", "דיבוג", "Code review"], audience: "מפתחים ובודקים שרוצים לראות ולשתף מה סוכן או משתמש ביצע בדפדפן.",
    free: "תוכנית Free ללא כרטיס כוללת 5 הקלטות ביום, 100 דקות וידאו מאוחסנות ועד 2 הקלטות במקביל.",
    limits: "משימות דפדפן בענן צורכות קרדיטים נפרדים; קישורי שיתוף חושפים את ההקלטה למי שמחזיק בהם, והקלטות מסך מוגבלות ל-10 דקות.",
    pros: ["וידאו וטלמטריית דפדפן", "מתאים לסוכני קוד נפוצים", "תוכנית חינם קבועה"], cons: ["מעלה הקלטות לשירות", "משימות ענן מחויבות בנפרד"],
    alternatives: ["Open Code Review", "Workscribe"], url: "https://userill.dev/", added: "2026-10-12", verified: "2026-10-12",
    sources: [{ label: "עמוד המוצר", url: "https://userill.dev/" }, { label: "תוכנית Free", url: "https://userill.dev/pricing" }]
  },
  {
    "slug": "concat-video-editor",
    "name": "Concat",
    "mark": "Co",
    "category": "design",
    "subcategories": [
      "עריכת וידאו",
      "כתוביות",
      "יצירה מקומית"
    ],
    "tagline": "עורך וידאו מקומי וחוצה פלטפורמות עם כתוביות, אפקטים, עריכה רב-ערוצית וייצוא 4K.",
    "solves": "מספק חלופה חינמית ל-CapCut לעריכת סרטונים קצרים, הדרכות ופודקאסטים בלי חשבון, סימן מים או העלאת חומרי הגלם.",
    "uses": [
      "עריכת וידאו",
      "כתוביות אוטומטיות",
      "תוכן לרשתות"
    ],
    "audience": "יוצרי תוכן, עורכי וידאו ומפתחים שרוצים עריכה מקומית או API לסקריפטים ולסוכנים.",
    "free": "היישום וקוד המקור חינמיים תחת AGPL-3.0-or-later; כל העיבוד מקומי, אין חשבון, מנוי או סימן מים, ומודלי AI אופציונליים יורדים למחשב ועובדים אחר כך ללא חיבור.",
    "limits": "הפרויקט עדיין בבטא; חלק מהמתקינים אינם חתומים, iOS דורש sideload, מודלי AI צורכים אחסון ומשאבים, ושיבוט קול מחייב הרשאה מהדובר.",
    "pros": [
      "עריכה מקומית ופרטית",
      "בניות לכל מערכות ההפעלה העיקריות",
      "API ו-MCP לאוטומציה"
    ],
    "cons": [
      "גרסת בטא",
      "חלק מהבניות אינן חתומות"
    ],
    "alternatives": [
      "Compositor",
      "VoiceStudio",
      "Cavalry"
    ],
    "url": "https://concatenate.pages.dev/",
    "added": "2026-10-13",
    "verified": "2026-10-13",
    "sources": [
      {
        "label": "המאגר והרישיון",
        "url": "https://github.com/jub0t/Concat"
      },
      {
        "label": "גרסאות והתקנה",
        "url": "https://github.com/jub0t/Concat/releases"
      },
      {
        "label": "דרישות מערכת",
        "url": "https://concatenate.pages.dev/guides/system-requirements"
      }
    ]
  },
  {
    "slug": "pi-agent-harness",
    "name": "Pi",
    "mark": "Pi",
    "category": "development",
    "subcategories": [
      "סוכן קוד",
      "CLI",
      "SDK"
    ],
    "tagline": "רתמת סוכן קוד מינימלית וניתנת להרחבה עם CLI, SDK, RPC, סקילים וחבילות.",
    "solves": "מאפשרת להתאים סוכן קוד לתהליכי עבודה אישיים דרך הרחבות, תבניות וסקילים במקום להינעל על זרימת עבודה קבועה.",
    "uses": [
      "פיתוח עם סוכנים",
      "אוטומציית קוד",
      "בניית כלי AI"
    ],
    "audience": "מפתחים שרוצים סוכן טרמינל פתוח, ניתן לתכנות ורב-ספקי.",
    "free": "הקוד וה-CLI חינמיים תחת MIT, עם התקנה ל-Windows, macOS ו-Linux דרך סקריפט רשמי, npm או Nix.",
    "limits": "מודלים, מפתחות API או מנויי ספקים נפרדים; ברירת המחדל רצה עם כל הרשאות המשתמש וללא מערכת הרשאות מובנית, ולכן יש להשתמש ב-container או sandbox למשימות לא מהימנות.",
    "pros": [
      "MIT וניתן להרחבה",
      "בניות עם SHA256SUMS",
      "CLI, RPC ו-TypeScript SDK"
    ],
    "cons": [
      "אין sandbox מובנה",
      "עלות המודל נפרדת"
    ],
    "alternatives": [
      "Kilo Code",
      "OpenClaw",
      "DeepSeek Harness"
    ],
    "url": "https://pi.dev/",
    "added": "2026-10-13",
    "verified": "2026-10-13",
    "sources": [
      {
        "label": "המאגר והוראות ההתקנה",
        "url": "https://github.com/earendil-works/pi"
      },
      {
        "label": "גרסאות חתוכות ובדיקות סכום",
        "url": "https://github.com/earendil-works/pi/releases"
      },
      {
        "label": "תיעוד רשמי",
        "url": "https://pi.dev/docs/latest"
      }
    ]
  },
  {
    "slug": "addy-agent-skills",
    "name": "Addy Osmani Agent Skills",
    "mark": "AS",
    "category": "skills",
    "subcategories": [
      "Agent Skills",
      "איכות קוד",
      "תהליך פיתוח"
    ],
    "tagline": "חבילת 25 סקילים הנדסיים לסוכני קוד, משלב הגדרת הדרישות ועד בדיקות, סקירה ופריסה.",
    "solves": "מקודדת תהליכי עבודה ושערי איכות חוזרים כדי שסוכני קוד יתכננו, יממשו ויאמתו שינויים בצורה עקבית.",
    "uses": [
      "תכנון תוכנה",
      "TDD וסקירת קוד",
      "פריסה"
    ],
    "audience": "צוותי פיתוח ומשתמשי Codex, Claude Code, Cursor, Copilot וסוכנים תואמי Agent Skills.",
    "free": "כל הסקילים והפקודות חינמיים תחת MIT; אפשר להתקין את כל החבילה או סקילים בודדים באמצעות CLI פתוח או שילובי המארחים המתועדים.",
    "limits": "אלה הוראות לסוכן ולא מנגנון אבטחה; יש לקרוא את הסקילים לפני התקנה, עלויות המודל והמארח נפרדות, ובהתקנת סקיל בודד חלק מקישורי ה-reference המשותפים אינם מועתקים.",
    "pros": [
      "25 תהליכים מוכנים",
      "תמיכה רחבה במארחים",
      "גרסאות ותחזוקה פעילה"
    ],
    "cons": [
      "דורש סוכן מארח",
      "הוראות עשויות להפעיל פעולות רחבות"
    ],
    "alternatives": [
      "Anthropic Skills",
      "Vercel Agent Skills",
      "Superpowers"
    ],
    "url": "https://github.com/addyosmani/agent-skills",
    "added": "2026-10-13",
    "verified": "2026-10-13",
    "sources": [
      {
        "label": "המאגר והתקנה",
        "url": "https://github.com/addyosmani/agent-skills"
      },
      {
        "label": "גרסאות",
        "url": "https://github.com/addyosmani/agent-skills/releases"
      },
      {
        "label": "רישיון MIT",
        "url": "https://github.com/addyosmani/agent-skills/blob/main/LICENSE"
      }
    ]
  },
  {
    "slug": "matt-pocock-skills",
    "name": "Matt Pocock Skills",
    "mark": "MP",
    "category": "skills",
    "subcategories": [
      "סקילים לסוכנים",
      "הנדסת תוכנה",
      "פרודוקטיביות"
    ],
    "tagline": "אוסף תהליכי עבודה מודולריים שמכניס משמעת הנדסית לסוכני קוד.",
    "solves": "עוזר לנסח דרישות, לפרק עבודה, לעבוד ב־TDD, לאבחן תקלות, לסקור קוד ולשמר שפה משותפת בפרויקט במקום להסתמך על פרומפט חד־פעמי.",
    "uses": [
      "תכנון ומפרטים",
      "TDD ואבחון תקלות",
      "סקירת קוד",
      "תיעוד והעברת הקשר"
    ],
    "audience": "מפתחים וצוותים שעובדים עם Codex, Claude Code, GitHub Copilot, Gemini CLI, Cursor וסוכנים תואמי Agent Skills.",
    "free": "כל האוסף חינמי תחת MIT. יש התקנת plugin מתעדכנת ל־Codex, Claude Code ו־Copilot, התקנה ידנית ל־Gemini CLI ונתיב npx לסוכנים נוספים.",
    "limits": "הסקילים הם הוראות שמרחיבות את יכולת הפעולה של הסוכן ואינם שכבת אבטחה. יש לבדוק את הקבצים לפני התקנה, לאשר הרשאות וכלי shell בזהירות, ועלויות המודל והמארח אינן כלולות.",
    "pros": [
      "תהליכים קטנים וניתנים לשילוב",
      "תמיכה רשמית במארחים רבים",
      "תחזוקה וגרסאות פעילות"
    ],
    "cons": [
      "דורש סוכן מארח",
      "חלק מהתהליכים יכולים לערוך קוד ולהריץ פקודות"
    ],
    "alternatives": [
      "Addy Osmani Agent Skills",
      "Anthropic Skills",
      "Superpowers"
    ],
    "url": "https://github.com/mattpocock/skills",
    "added": "2026-10-14",
    "verified": "2026-10-14",
    "sources": [
      {
        "label": "המאגר והוראות התקנה",
        "url": "https://github.com/mattpocock/skills"
      },
      {
        "label": "גרסה v1.3.1",
        "url": "https://github.com/mattpocock/skills/releases/tag/v1.3.1"
      },
      {
        "label": "רישיון MIT",
        "url": "https://github.com/mattpocock/skills/blob/main/LICENSE"
      }
    ]
  },
  {
    "slug": "project-nomad",
    "name": "Project NOMAD",
    "mark": "PN",
    "category": "research",
    "subcategories": [
      "ידע לא מקוון",
      "למידה",
      "אירוח עצמי"
    ],
    "tagline": "שרת ידע ולמידה מקומי שממשיך לעבוד גם בלי חיבור לאינטרנט.",
    "solves": "מרכז Wikipedia ותכני Kiwix, קורסי Kolibri, מפות, הערות וכלי נתונים בממשק אחד, עם אפשרות לצ'אט מקומי ולחיפוש RAG במסמכים.",
    "uses": [
      "ספריית ידע לא מקוונת",
      "למידה עצמית וכיתתית",
      "חיפוש במסמכים",
      "מפות וכלי עזר מקומיים"
    ],
    "audience": "בתי ספר, מעבדות שטח, קהילות, מטיילים ומשתמשים שרוצים מאגר ידע פרטי שאינו תלוי בענן.",
    "free": "הקוד חינמי תחת Apache-2.0 ומופעל באירוח עצמי. הליבה עובדת מקומית ללא חשבון או טלמטריה; גם נתיב ה־AI יכול להיות חינמי עם Ollama או שרת מודל מקומי תואם OpenAI.",
    "limits": "דורש Linux מבוסס Debian, Docker והרשאות sudo. אין אימות משתמשים מובנה: יש להפעיל רק ברשת מקומית מהימנה ולא לחשוף לאינטרנט. תכנים ומודלים צורכים נפח אחסון רב, ו־AI מקומי עשוי לדרוש 32GB RAM ו־GPU.",
    "pros": [
      "עובד ללא אינטרנט אחרי ההתקנה",
      "ללא טלמטריה מובנית",
      "מאגד כלי ידע ולמידה מוכחים"
    ],
    "cons": [
      "אין אימות משתמשים",
      "התקנה ותוכן מלא דורשים חומרה ואחסון"
    ],
    "alternatives": [
      "Gemini Notebook",
      "Zotero",
      "WeKnora"
    ],
    "url": "https://www.projectnomad.us/",
    "added": "2026-10-14",
    "verified": "2026-10-14",
    "sources": [
      {
        "label": "המאגר והתקנה",
        "url": "https://github.com/Crosstalk-Solutions/project-nomad"
      },
      {
        "label": "גרסה v1.35.1",
        "url": "https://github.com/Crosstalk-Solutions/project-nomad/releases/tag/v1.35.1"
      },
      {
        "label": "מדיניות אבטחה",
        "url": "https://github.com/Crosstalk-Solutions/project-nomad/blob/main/SECURITY.md"
      },
      {
        "label": "רישיון Apache-2.0",
        "url": "https://github.com/Crosstalk-Solutions/project-nomad/blob/main/LICENSE"
      }
    ]
  },
  {
    slug: "activitywatch", name: "ActivityWatch", mark: "AW", category: "productivity", subcategories: ["מעקב זמן", "פרטיות", "קוד פתוח"],
    tagline: "מעקב זמן אוטומטי ומקומי שמראה באילו אפליקציות ואתרים השתמשתם.",
    solves: "אוסף ציר זמן מפורט של חלונות, זמן לא פעיל וגלישה כדי להבין הרגלי עבודה בלי לשלוח את היסטוריית הפעילות לענן.",
    uses: ["מעקב זמן", "ניתוח הרגלים", "פרטיות"], audience: "עצמאים, מפתחים וחוקרים שרוצים תמונת שימוש מדויקת בבעלותם המלאה.",
    free: "חינמי וקוד פתוח ללא שערי תכונות, מגבלות שימוש או פרסומות. הנתונים נשמרים מקומית; מנוי AW Pro הוא תמיכה אופציונלית בלבד.",
    limits: "האיסוף מפורט ורגיש מטבעו ודורש ניהול זהיר של המחשב והגיבויים. הרחבות דפדפן מוסיפות כתובות עמודים, והפיתוח הקהילתי עשוי להתקדם בקצב משתנה.",
    pros: ["נתונים נשארים במכשיר", "פירוט גולמי לניתוח ארוך טווח", "Windows, macOS, Linux ו-Android"], cons: ["דורש התקנה והרשאות מעקב", "אין סנכרון ענן מנוהל כברירת מחדל", "דף ההורדות עשוי להתעדכן אחרי GitHub Releases"],
    alternatives: ["Super Productivity", "Todoist"], url: "https://activitywatch.net/", added: "2026-10-17", verified: "2026-10-17",
    sources: [{ label: "האתר הרשמי והפרטיות", url: "https://activitywatch.net/" }, { label: "מהדורה v0.14.1", url: "https://github.com/ActivityWatch/activitywatch/releases/tag/v0.14.1" }, { label: "רישיון ופעילות", url: "https://github.com/ActivityWatch/activitywatch" }, { label: "מבוא ותפיסת הנתונים", url: "https://docs.activitywatch.net/en/latest/introduction.html" }]
  },
  {
    slug: "super-productivity", name: "Super Productivity", mark: "SP", category: "productivity", subcategories: ["ניהול משימות", "מעקב זמן", "קוד פתוח"],
    tagline: "מתכנן יום מקומי שמשלב משימות, הערכות זמן, פוקוס ואינטגרציות עבודה.",
    solves: "מחבר רשימת משימות לתכנון יומי ולמדידת הזמן בפועל, עם לוחות ואינטגרציות ל-GitHub, GitLab ו-Jira.",
    uses: ["ניהול משימות", "תכנון יומי", "פוקוס", "מעקב זמן"], audience: "מפתחים, פרילנסרים ואנשים שרוצים סביבת משימות עשירה שעובדת גם ללא חשבון או אינטרנט.",
    free: "כל היישום חינמי וקוד פתוח ברישיון MIT, ללא ניסיון, שכבות פרימיום או פרסומות. האחסון מקומי והסנכרון האופציונלי יכול להשתמש בספק של המשתמש.",
    limits: "קובצי יצוא וגיבוי הם JSON לא מוצפן ועלולים לכלול תוכן ומפתחות. תוספים אינם מבודדים היטב, ולכן יש להתקין רק ממקור מהימן; סנכרון ואינטגרציות חיצוניות כפופים לספקים שלהם.",
    pros: ["חינמי ללא upsell", "עובד אופליין וללא חשבון", "תכנון, זמן ואינטגרציות במקום אחד"], cons: ["תוספים דורשים אמון בקוד", "גיבויים רגילים אינם מוצפנים", "הגדרות הסנכרון עשויות להיות מורכבות"],
    alternatives: ["ActivityWatch", "Todoist", "Trello"], url: "https://super-productivity.com/", added: "2026-10-17", verified: "2026-10-17",
    sources: [{ label: "תמחור רשמי", url: "https://super-productivity.com/pricing/" }, { label: "הורדות ופרטיות", url: "https://super-productivity.com/download/" }, { label: "מהדורה v19.2.0", url: "https://github.com/super-productivity/super-productivity/releases/tag/v19.2.0" }, { label: "מדיניות אבטחה", url: "https://github.com/super-productivity/super-productivity/security" }]
  }

];

window.WATCHLIST = [
  {
    "name": "IrisGo",
    "mark": "IG",
    "category": "productivity",
    "signal": "מקור: Product Hunt והאתר הרשמי",
    "reason": "האפליקציה פעילה, אך לא פורסמו תנאי תוכנית חינמית קבועה או מכסות שאפשר לאמת.",
    "url": "https://irisgo.ai/",
    "checked": "2026-10-12"
  },
  {
    "name": "FastRouter.ai",
    "mark": "FR",
    "category": "development",
    "signal": "מקור: Product Hunt והארגון הרשמי ב-GitHub",
    "reason": "ההרשמה כוללת קרדיטים חינמיים, אך לא נמצא מסלול חינמי מתמשך עם מכסה מחזורית ברורה.",
    "url": "https://fastrouter.ai/",
    "checked": "2026-10-12"
  },
  {
    "name": "ReadySetGo",
    "mark": "RS",
    "category": "development",
    "signal": "מקור: הבלוג הרשמי של thoughtbot",
    "reason": "הבטא פתוחה בחינם לזמן מוגבל בלבד ובכפוף למכסת משתמשים יומית, ולכן אינה עומדת עדיין בתנאי הקטלוג.",
    "url": "https://thoughtbot.com/blog/we-built-an-ai-product-consultant-and-the-free-beta-is-now-open",
    "checked": "2026-10-12"
  },
  {
    "name": "Minutes",
    "mark": "Mi",
    "category": "productivity",
    "signal": "מאגר פעיל עם 1,546 כוכבי GitHub בזמן הבדיקה.",
    "reason": "נשאר במעקב לפי המדיניות הנוכחית: כלי GitHub עם 1,000 עד 4,999 כוכבים אינו מתפרסם כפעיל עד שיעבור 5,000 כוכבים ובדיקת איכות חוזרת.",
    "url": "https://github.com/silverstein/minutes",
    "checked": "2026-10-14"
  },
  {
    "name": "TAKT",
    "mark": "Ta",
    "category": "development",
    "signal": "מאגר פעיל עם 1,404 כוכבי GitHub בזמן הבדיקה.",
    "reason": "נשאר במעקב לפי המדיניות הנוכחית: כלי GitHub עם 1,000 עד 4,999 כוכבים אינו מתפרסם כפעיל עד שיעבור 5,000 כוכבים ובדיקת איכות חוזרת.",
    "url": "https://github.com/nrslib/takt",
    "checked": "2026-10-14"
  },
  {
    "name": "Skills Hub",
    "mark": "SH",
    "category": "skills",
    "signal": "מאגר פעיל עם 1,801 כוכבי GitHub בזמן הבדיקה.",
    "reason": "נשאר במעקב לפי המדיניות הנוכחית: כלי GitHub עם 1,000 עד 4,999 כוכבים אינו מתפרסם כפעיל עד שיעבור 5,000 כוכבים ובדיקת איכות חוזרת.",
    "url": "https://github.com/qufei1993/skills-hub",
    "checked": "2026-10-14"
  },
  {
    "name": "hob",
    "mark": "hob",
    "category": "development",
    "signal": "סביבת עבודה מקומית לסוכני קוד עם 73 עוקבים ו-90 נקודות בהשקת Product Hunt, ותמיכה ב-macOS, Windows ו-Linux.",
    "reason": "המחירון הרשמי מאשר חודש ראשון חינם בלבד ולאחריו מסלול Personal Pro בתשלום; אין מסלול חינמי מתמשך ולכן הכלי נשאר מחוץ לקטלוג הפעיל.",
    "url": "https://hob.dev/",
    "checked": "2026-10-05"
  },
  {
    "name": "Bracket",
    "mark": "Br",
    "category": "productivity",
    "signal": "שכבת זיכרון עסקית שמחברת Gmail, Slack, Figma ו-GitHub; 108 עוקבים ו-109 נקודות בהשקת Product Hunt.",
    "reason": "Product Hunt מסמן 14 ימי ניסיון בלבד, והצהרות המפתחים ש\"חינם כרגע\" אינן מגדירות מסלול חינמי מתמשך או מכסות מגבלות; נשאר מחוץ לקטלוג הפעיל.",
    "url": "https://www.use-bracket.com/",
    "checked": "2026-10-04"
  },
  {
    "name": "Rhun",
    "mark": "R",
    "category": "development",
    "signal": "עורך קוד חדש שנכתב ב-assembly וזכה למומנטום ב-Hacker News.",
    "reason": "לא אותרו בבדיקה מקור רשמי ורישיון שניתנים לאימות מספק, ולכן לא ניתן לקבוע נתיב שימוש חינמי מתמשך.",
    "url": "https://rhun.app/",
    "checked": "2026-10-03"
  },
  {
    "name": "Breadcrumb",
    "mark": "B",
    "category": "productivity",
    "signal": "הקלטת הקשר רציפה ב-Mac וניהול הקשר לעוזרי AI.",
    "reason": "האתר הפעיל לא סיפק בזמן הבדיקה מקור ברור למחיר, מגבלות, פרטיות ורישיון; נשאר מחוץ לקטלוג הפעיל.",
    "url": "https://innerloop.works/",
    "checked": "2026-10-03"
  },
  {
    "name": "Hacker Atlas",
    "mark": "HA",
    "category": "research",
    "signal": "מפה אינטראקטיבית של נושאי Hacker News והמגמות שלהם.",
    "reason": "המוצר פעיל וזכה לעניין, אך לא נמצא מקור רשמי ברור לתמחור, מגבלות שימוש או רישיון.",
    "url": "https://hackeratlas.com/",
    "checked": "2026-10-03"
  },
  {
    "name": "Jotbus",
    "mark": "JB",
    "category": "development",
    "signal": "scratchpad מוצפן מקצה לקצה להעברת הקשר וקבצים בין Codex, Claude Code וסוכנים נוספים; 22 נקודות ו-13 תגובות ב-Show HN.",
    "reason": "המסלול החינמי הוא workspace זמני של 60 דקות וקבצים עד 2MB; היסטוריה מתמשכת דורשת $7 לחודש, ולכן אינו עומד כרגע ברף שימוש חינמי מתמשך לקטלוג הפעיל.",
    "url": "https://jotbus.com/",
    "checked": "2026-10-07"
  },
  {
    "name": "SVG Spark",
    "mark": "SS",
    "category": "design",
    "signal": "אוסף חדש של עשרה כלי דפדפן מקומיים ל-SVG, PDF, תמונות, JSON, כתוביות, SQL, נגישות ו-Markdown; צבר 35 נקודות בתוך שעות ב-Show HN.",
    "reason": "האתר פעיל, חינמי וללא העלאת קבצים, אך לא נמצא מאגר מקור, רישיון שימוש מפורש או זהות מתחזקת מספקת; נדרש אימות לפני כניסה לקטלוג הפעיל.",
    "url": "https://svg-spark.vercel.app/",
    "checked": "2026-10-09"
  },
  {
    "name": "Pocketty",
    "mark": "Po",
    "category": "development",
    "signal": "מסוף SSH ל-iPhone ול-iPad ששולח התראה כאשר סוכן קוד ממתין לקלט; 27 נקודות ו-12 תגובות בתוך שעות ב-Show HN.",
    "reason": "האתר הרשמי מציג את המוצר ואת פרטיותו, אך מחיר קבוע, מגבלות המסלול החינמי ורישיון לא אומתו ממקור רשמי ברור בזמן הסריקה.",
    "url": "https://pocketty.app/",
    "checked": "2026-10-09"
  },
  {
    "name": "Upfling.host",
    "mark": "Up",
    "category": "development",
    "signal": "שירות חדש לפרסום אתרי HTML, CSS ו-JavaScript סטטיים, שממותג כאירוח חינמי וזכה לאות ראשון ב-Show HN.",
    "reason": "לא אותרו עדיין מחירון רשמי, מכסות תעבורה ואחסון, מדיניות שימוש או התחייבות למסלול חינמי מתמשך; נשאר במעקב עד לפרסום תנאים מלאים.",
    "url": "https://upfling.host/",
    "checked": "2026-10-09"
  },
  {
    "name": "Curie",
    "mark": "Cu",
    "category": "research",
    "signal": "עוזר חדש לספרות מדעית, חילוץ נתונים וסקירות שיטתיות עם 100 נקודות ו-96 עוקבים בהשקת Product Hunt השבוע.",
    "reason": "Product Hunt מסמן את הכלי כחינמי, אך באתר הרשמי לא נמצא מחירון נגיש שמגדיר מכסה מתחדשת, מספר מסמכים או גבולות שימוש; אין לפרסם כפעיל עד לאימות תנאי Free ממקור ראשון.",
    "url": "https://curieai.tech/",
    "checked": "2026-10-11"
  },
  {
    "name": "OldRoll Web",
    "mark": "OR",
    "category": "design",
    "signal": "עורך תמונות וינטג' חדש בדפדפן עם 16 נקודות באות Show HN, עריכת Digicam/Film/VHS, ייצוא ברזולוציה המקורית וללא חשבון.",
    "reason": "האתר הרשמי אומר שכל יכולות ה-Web חינמיות כעת, אך מגדיר זאת במפורש כהצעת ההשקה הנוכחית ולא כמסלול חינמי מתמשך. חלק מהעיבוד מתבצע בשרת ותמונות עשויות להישמר עד 30 יום; נדרש אימות מחדש לאחר תקופת ההשקה.",
    "url": "https://www.oldroll.io/",
    "checked": "2026-10-12"
  },
  {
    "name": "Whiteboard",
    "mark": "W",
    "category": "development",
    "signal": "מאגר פעיל עם 3,171 כוכבי GitHub בזמן הבדיקה.",
    "reason": "הועבר מהקטלוג הפעיל למעקב: לפי רף האיכות החדש, כלי GitHub עם 1,000 עד 4,999 כוכבים אינו מתפרסם כפעיל עד שיעבור 5,000 כוכבים ובדיקת איכות חוזרת.",
    "url": "https://github.com/devdotfast/whiteboard",
    "checked": "2026-10-14"
  },
  {
    "name": "Paper2Agent",
    "mark": "P2",
    "category": "research",
    "signal": "מאגר פעיל עם 3,792 כוכבי GitHub בזמן הבדיקה.",
    "reason": "הועבר מהקטלוג הפעיל למעקב: לפי רף האיכות החדש, כלי GitHub עם 1,000 עד 4,999 כוכבים אינו מתפרסם כפעיל עד שיעבור 5,000 כוכבים ובדיקת איכות חוזרת.",
    "url": "https://github.com/jmiao24/Paper2Agent",
    "checked": "2026-10-14"
  },
  {
    "name": "Open CAD Studio",
    "mark": "OC",
    "category": "design",
    "signal": "מאגר פעיל עם 2,991 כוכבי GitHub בזמן הבדיקה.",
    "reason": "הועבר מהקטלוג הפעיל למעקב: לפי רף האיכות החדש, כלי GitHub עם 1,000 עד 4,999 כוכבים אינו מתפרסם כפעיל עד שיעבור 5,000 כוכבים ובדיקת איכות חוזרת.",
    "url": "https://github.com/HakanSeven12/OpenCADStudio",
    "checked": "2026-10-14"
  },
  {
    "name": "Crisp",
    "mark": "Cr",
    "category": "productivity",
    "signal": "מאגר פעיל עם 2,080 כוכבי GitHub בזמן הבדיקה.",
    "reason": "הועבר מהקטלוג הפעיל למעקב: לפי רף האיכות החדש, כלי GitHub עם 1,000 עד 4,999 כוכבים אינו מתפרסם כפעיל עד שיעבור 5,000 כוכבים ובדיקת איכות חוזרת.",
    "url": "https://github.com/didriksg/Crisp",
    "checked": "2026-10-14"
  },
  {
    "name": "Open Cowork",
    "mark": "OC",
    "category": "productivity",
    "signal": "מאגר פעיל עם 2,208 כוכבי GitHub בזמן הבדיקה.",
    "reason": "הועבר מהקטלוג הפעיל למעקב: לפי רף האיכות החדש, כלי GitHub עם 1,000 עד 4,999 כוכבים אינו מתפרסם כפעיל עד שיעבור 5,000 כוכבים ובדיקת איכות חוזרת.",
    "url": "https://github.com/OpenCoworkAI/open-cowork",
    "checked": "2026-10-14"
  },
  {
    "name": "Open Intelligent UI",
    "mark": "OI",
    "category": "development",
    "signal": "מסגרת Generative UI תחת MIT עם 3,077 כוכבים ואות GitHub Trending יומי.",
    "reason": "הרישיון והליבה החינמית אומתו, אך המאגר מתחת לרף 5,000 הכוכבים ודורש מודל ו-visualization router חיצוניים; נשאר במעקב.",
    "url": "https://github.com/CopilotKit/OpenIntelligentUI",
    "checked": "2026-10-14"
  },
  {
    "name": "OpenRig",
    "mark": "OR",
    "category": "development",
    "signal": "רשת צוותי סוכנים מתמשכים עם 7,410 כוכבים ואות GitHub Trending שבועי.",
    "reason": "עבר את רף הכוכבים, אך טרם הושלמו בדיקות רישיון, בידוד תהליכים, הרשאות, releases ונתיב שימוש חינמי מלא; נשאר במעקב עד לאימות עומק.",
    "url": "https://github.com/mvschwarz/openrig",
    "checked": "2026-10-14"
  },
  {
    "name": "NVIDIA OpenShell",
    "mark": "NO",
    "category": "development",
    "signal": "runtime פרטי לסוכנים אוטונומיים עם 16,135 כוכבים ואות GitHub Trending חודשי.",
    "reason": "האות והבעלות של NVIDIA חזקים, אך לפני פרסום פעיל נדרשת בדיקה מלאה של רישיון, מודל האיום, גבולות ה-sandbox, דרישות חומרה ויציבות releases.",
    "url": "https://github.com/NVIDIA/OpenShell",
    "checked": "2026-10-14"
  },
  {
    "name": "FreeLLMAPI",
    "mark": "FL",
    "category": "development",
    "signal": "שער אחוד שמצהיר על 34 ספקי LLM חינמיים, עם 34,803 כוכבים ואות Trending יומי, שבועי וחודשי.",
    "reason": "למרות מספר הכוכבים, ההבטחה ל-7.4 מיליארד טוקנים בחודש מוגבלת לניסוי אישי ותלויה בספקים חיצוניים. תנאי שימוש, יציבות המכסות, פרטיות ואבטחת המפתחות דורשים אימות לפני פרסום פעיל.",
    "url": "https://github.com/tashfeenahmed/freellmapi",
    "checked": "2026-10-14"
  }
];
