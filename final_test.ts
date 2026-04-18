import { Resend } from 'resend';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Force load from project root
dotenv.config({ path: path.join(process.cwd(), '.env') });

const key = process.env.RESEND_API_KEY;

if (!key || key === 're_...') {
    console.error("CRITICAL_ERROR: API_KEY_NOT_FOUND_OR_INVALID");
    process.exit(1);
}

console.log("STATUS: KEY_LOADED_SUCCESSFULLY");
const resend = new Resend(key);

async function runTest() {
  console.log("ACTION: INIT_TRANSMISSION_TEST...");
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'delivered@resend.dev',
      subject: 'PORTFOLIO_SYSTEM_TEST',
      html: '<div style="background:#000;color:#0f0;padding:20px;font-family:monospace;">STABILITY_CHECK: SUCCESSFUL</div>'
    });
    
    if (error) {
      console.error("TRANSMISSION_FAILED:", error.message);
    } else {
      console.log("TRANSMISSION_SUCCESSFUL! MESSAGE_ID:", data?.id);
    }
  } catch (err) {
    console.error("SYSTEM_EXCEPTION:", err);
  }
}

runTest();
