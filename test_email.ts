import { Resend } from 'resend';
import * as dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
  console.log("Initiating backend transmission test...");
  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Test <onboarding@resend.dev>',
      to: ['delivered@resend.dev'], // Standard test address that always succeeds or onboarding email
      subject: 'TRANSMISSION_TEST_v1',
      html: '<p>Testing secure signal transmission. If you see this, the API key is active.</p>'
    });

    if (error) {
       console.error("Transmission Error:", error.message);
    } else {
       console.log("Transmission Successful. ID:", data?.id);
    }
  } catch (err) {
    console.error("System Failure:", err);
  }
}

test();
