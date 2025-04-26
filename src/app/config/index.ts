import dotenv from 'dotenv';
import path from 'path';

//এখানে dotenv config কে  current directory এর সাথে .env কে join করে দেয়া হয়েছে।
// এটি নিশ্চিত করে .env ফাইলটি যেখানে আছে, সেখান থেকে সঠিকভাবে লোড করা যায়।

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};
