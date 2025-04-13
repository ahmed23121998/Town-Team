const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// تحميل بيانات الاتصال بـ Firebase
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const files = [
  { file: "kids.json", collection: "kids" },
  { file: "men.json", collection: "men" },
  { file: "newarrival.json", collection: "newarrival" },
  { file: "summer.json", collection: "summer" },
  { file: "winter.json", collection: "winter" },
  { file: "shoes.json", collection: "shoes" },
  { file: "accessories.json", collection: "accessories" },
];

// عملية الرفع
files.forEach(({ file, collection }) => {
  const filePath = path.join(__dirname, file);
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const items = data.collection?.[collection] || data[collection];

  if (!items) {
    console.warn(
      `⚠ No data found for collection '${collection}' in file '${file}'`
    );
    return;
  }

  items.forEach(async (item) => {
    try {
      await db.collection(collection).doc(item.id).set(item);
      console.log(`✅ Uploaded to [${collection}]: ${item.product.title}`);
    } catch (error) {
      console.error(`❌ Failed to upload ${item.product.title}:`, error);
    }
  });
});
