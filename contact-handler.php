<?php
/**
 * Mahadev Electricals - Contact Form Handler
 * Uses PHPMailer + Gmail SMTP for reliable delivery
 *
 * SETUP STEPS:
 * 1. Run: composer require phpmailer/phpmailer
 * 2. Set your Gmail App Password below (NOT your regular Gmail password)
 *    -> Google Account > Security > 2-Step Verification > App Passwords
 * 3. Upload this file + vendor/ folder to your hosting
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error.log');

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// ─── Load PHPMailer ───────────────────────────────────────────────────────────
// Works with both Composer and manual install
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require __DIR__ . '/vendor/autoload.php';
} else {
    // Manual install fallback: put PHPMailer src/ folder next to this file
    require __DIR__ . '/PHPMailer-7.0.2/src/Exception.php';
    require __DIR__ . '/PHPMailer-7.0.2/src/PHPMailer.php';
    require __DIR__ . '/PHPMailer-7.0.2/src/SMTP.php';
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// ─── Configuration ────────────────────────────────────────────────────────────
$config = [
    // Gmail SMTP credentials
    'smtp_user'        => 'westernterrain99@gmail.com',   // Your Gmail address
    'smtp_pass'        => 'wpiptojcjeoepuxz',        // Gmail App Password (16 chars)

    // Business details
    'business_email'   => 'westernterrain99@gmail.com',
    'business_name'    => 'Mahadev Electricals',
    'business_phone'   => '9363387963',
    'business_address' => '373, Trichy Rd, Agraharam, Singanallur, Tamil Nadu 641016',
];

// ─── Parse & Validate Input ───────────────────────────────────────────────────
$data = json_decode(file_get_contents('php://input'), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON payload']);
    exit();
}

foreach (['name', 'phone', 'message'] as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => ucfirst($field) . ' is required']);
        exit();
    }
}

$name    = htmlspecialchars(trim($data['name']));
$phone   = htmlspecialchars(trim($data['phone']));
$email   = !empty($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : '';
$subject = !empty($data['subject']) ? htmlspecialchars(trim($data['subject'])) : 'General Inquiry';
$message = htmlspecialchars(trim($data['message']));

if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit();
}

$cleanPhone = preg_replace('/[^0-9]/', '', $phone);
if (!preg_match('/^[6-9]\d{9}$/', $cleanPhone)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid phone number. Please enter a valid 10-digit mobile number.']);
    exit();
}

// ─── Shared Data ─────────────────────────────────────────────────────────────
$inquiry_id = 'ME' . date('Ymd') . rand(1000, 9999);
$timestamp  = date('F j, Y, g:i a');

// ─── Helper: Build SMTP Mailer ────────────────────────────────────────────────
function buildMailer(array $config): PHPMailer
{
    $mail = new PHPMailer(true); // true = throw exceptions
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = $config['smtp_user'];
    $mail->Password   = $config['smtp_pass'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';
    $mail->isHTML(true);
    return $mail;
}

// ─── Email Bodies ─────────────────────────────────────────────────────────────

// --- Business notification ---
$business_html = "
<!DOCTYPE html><html><head><meta charset='UTF-8'>
<style>
  body{font-family:Arial,sans-serif;line-height:1.6;color:#333;margin:0;padding:0}
  .container{max-width:600px;margin:0 auto;padding:20px}
  .header{background:linear-gradient(135deg,#0EA5E9,#FF6B35);padding:30px;text-align:center;border-radius:10px 10px 0 0}
  .header h1{color:white;margin:0;font-size:22px}
  .content{background:#f9f9f9;padding:30px;border:1px solid #ddd}
  .row{margin:12px 0;padding:14px;background:white;border-radius:5px;border-left:4px solid #0EA5E9}
  .label{font-weight:bold;color:#0EA5E9;margin-bottom:4px;font-size:13px}
  .value{color:#333}
  .msg-box{background:white;padding:20px;border-radius:5px;margin-top:20px;border:1px solid #ddd}
  .actions{margin-top:25px;padding:20px;background:#E0F2FE;border-radius:5px;border-left:4px solid #0EA5E9}
  .btn{display:inline-block;color:white;padding:10px 18px;text-decoration:none;border-radius:5px;margin:4px;font-size:14px}
  .footer{background:#0A1628;color:white;padding:20px;text-align:center;border-radius:0 0 10px 10px;font-size:13px}
  .badge{display:inline-block;background:#FF6B35;color:white;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:bold}
</style></head><body>
<div class='container'>
  <div class='header'><h1>⚡ New Contact Form Submission</h1></div>
  <div class='content'>
    <p><span class='badge'>NEW INQUIRY</span></p>
    <div class='row'><div class='label'>Inquiry ID</div><div class='value'>{$inquiry_id}</div></div>
    <div class='row'><div class='label'>📅 Date &amp; Time</div><div class='value'>{$timestamp}</div></div>
    <div class='row'><div class='label'>👤 Customer Name</div><div class='value'>{$name}</div></div>
    <div class='row'><div class='label'>📞 Phone</div><div class='value'><a href='tel:{$cleanPhone}'>{$phone}</a></div></div>
    " . (!empty($email) ? "<div class='row'><div class='label'>📧 Email</div><div class='value'><a href='mailto:{$email}'>{$email}</a></div></div>" : "") . "
    <div class='row'><div class='label'>📋 Subject</div><div class='value'>{$subject}</div></div>
    <div class='msg-box'><div class='label'>💬 Message</div><p style='margin:10px 0'>{$message}</p></div>
    <div class='actions'>
      <strong>⚡ Quick Actions:</strong><br><br>
      <a href='tel:{$cleanPhone}' class='btn' style='background:#0EA5E9'>📞 Call</a>
      <a href='https://wa.me/91{$cleanPhone}' class='btn' style='background:#10B981'>💬 WhatsApp</a>
      " . (!empty($email) ? "<a href='mailto:{$email}' class='btn' style='background:#FF6B35'>✉️ Reply</a>" : "") . "
    </div>
  </div>
  <div class='footer'>
    <strong>Mahadev Electricals</strong><br>
    Singanallur, Coimbatore &nbsp;|&nbsp; {$config['business_phone']}<br>
    <span style='font-size:11px;opacity:.7'>Automated notification from website contact form</span>
  </div>
</div>
</body></html>";

// --- Customer confirmation ---
$customer_html = "
<!DOCTYPE html><html><head><meta charset='UTF-8'>
<style>
  body{font-family:Arial,sans-serif;line-height:1.6;color:#333;margin:0;padding:0}
  .container{max-width:600px;margin:0 auto;padding:20px}
  .header{background:linear-gradient(135deg,#0EA5E9,#FF6B35);padding:40px;text-align:center;border-radius:10px 10px 0 0}
  .header h1{color:white;margin:0;font-size:26px}
  .header p{color:white;margin:8px 0 0;opacity:.9}
  .content{background:white;padding:35px;border:1px solid #ddd}
  .recap{background:#F0F9FF;padding:20px;border-radius:8px;margin:20px 0;border-left:4px solid #0EA5E9}
  .next{background:#FFF7ED;padding:20px;border-radius:8px;margin:20px 0;border-left:4px solid #FF6B35}
  .btn{display:inline-block;color:white;padding:14px 28px;text-decoration:none;border-radius:25px;font-weight:bold;margin:6px 4px;font-size:14px}
  .grid{display:table;width:100%;margin:20px 0;border-spacing:10px}
  .cell{display:table-cell;background:#F9FAFB;padding:15px;border-radius:8px;text-align:center;width:50%;font-size:13px}
  .cell strong{display:block;color:#0EA5E9;margin-bottom:6px}
  .footer{background:#0A1628;color:white;padding:25px;text-align:center;border-radius:0 0 10px 10px;font-size:13px}
  .footer a{color:white;text-decoration:none;margin:0 8px}
</style></head><body>
<div class='container'>
  <div class='header'>
    <h1>⚡ Thank You for Contacting Us!</h1>
    <p>Your message has been received successfully</p>
  </div>
  <div class='content'>
    <p style='font-size:17px;font-weight:bold;color:#0A1628'>Dear {$name},</p>
    <p>Thank you for reaching out to <strong>Mahadev Electricals</strong>! We've received your inquiry and will get back to you <strong>within 2 hours</strong> during business hours.</p>

    <div class='recap'>
      <strong style='color:#0EA5E9'>📋 Your Inquiry Summary</strong><br><br>
      <strong>ID:</strong> {$inquiry_id}<br>
      <strong>Subject:</strong> {$subject}<br>
      <strong>Submitted:</strong> {$timestamp}<br><br>
      <strong>Your Message:</strong>
      <p style='margin:8px 0;padding:10px;background:white;border-radius:5px'>{$message}</p>
    </div>

    <div class='next'>
      <strong style='color:#FF6B35'>⏰ What Happens Next?</strong><br><br>
      ✅ Our team is reviewing your inquiry<br>
      ✅ We'll contact you within 2 hours (Mon–Sat: 9 AM – 8 PM)<br>
      ✅ Expert guidance tailored to your needs<br>
      ✅ Best solutions and competitive pricing
    </div>

    <p><strong>Need Immediate Help?</strong></p>
    <div style='text-align:center;margin:25px 0'>
      <a href='tel:{$config['business_phone']}' class='btn' style='background:linear-gradient(135deg,#0EA5E9,#0284C7)'>📞 Call: {$config['business_phone']}</a>
      <a href='https://wa.me/91{$config['business_phone']}' class='btn' style='background:linear-gradient(135deg,#10B981,#059669)'>💬 WhatsApp</a>
    </div>

    <div class='grid'>
      <div class='cell'><strong>📍 Visit Us</strong>{$config['business_address']}</div>
      <div class='cell'><strong>🕒 Business Hours</strong>Mon–Sat: 9AM–8PM<br>Sunday: 9AM–2PM</div>
    </div>

    <p><strong>Why Choose Mahadev Electricals?</strong></p>
    <p style='color:#555'>
      ✅ 14+ years of trusted service<br>
      ✅ Authorized dealer — V-Guard, Havells, Fybros, GM &amp; Legrand<br>
      ✅ 100% genuine products with warranty<br>
      ✅ Competitive pricing guaranteed<br>
      ✅ Expert guidance from an experienced team
    </p>

    <p style='margin-top:25px'><strong>Best Regards,</strong><br>
    <span style='color:#0EA5E9;font-weight:bold'>Team Mahadev Electricals</span><br>
    <em>Your Trusted Partner Since 2012</em></p>
  </div>
  <div class='footer'>
    <strong style='font-size:18px'>MAHADEV ELECTRICALS</strong><br>
    📍 {$config['business_address']}<br>
    📞 {$config['business_phone']} &nbsp;|&nbsp; 📧 {$config['business_email']}<br>
    <div style='margin:15px 0;padding-top:15px;border-top:1px solid rgba(255,255,255,.2)'>
      <a href='https://wa.me/91{$config['business_phone']}'>💬 WhatsApp</a>
      <a href='https://www.instagram.com/mahadev.groupcbe._'>📸 Instagram</a>
    </div>
    <span style='font-size:11px;opacity:.7'>Automated confirmation — please do not reply to this email.</span>
  </div>
</div>
</body></html>";

// ─── Send Emails ──────────────────────────────────────────────────────────────
$business_sent  = false;
$customer_sent  = false;
$error_detail   = '';

try {
    // 1. Notify the business
    $mail = buildMailer($config);
    $mail->setFrom($config['smtp_user'], 'Website Contact Form');
    $mail->addAddress($config['business_email'], $config['business_name']);
    if (!empty($email)) {
        $mail->addReplyTo($email, $name);
    }
    $mail->Priority = 1; // High priority
    $mail->Subject  = "New Inquiry - {$subject} (ID: {$inquiry_id})";
    $mail->Body     = $business_html;
    $mail->AltBody  = "New inquiry from {$name} | Phone: {$phone} | Subject: {$subject}\n\n{$message}";
    $mail->send();
    $business_sent = true;

    // 2. Confirm to customer (only if they gave an email)
    if (!empty($email)) {
        $mail2 = buildMailer($config);
        $mail2->setFrom($config['smtp_user'], $config['business_name']);
        $mail2->addAddress($email, $name);
        $mail2->addReplyTo($config['business_email'], $config['business_name']);
        $mail2->Subject = "We received your message – Mahadev Electricals (ID: {$inquiry_id})";
        $mail2->Body    = $customer_html;
        $mail2->AltBody = "Hi {$name},\n\nThank you for contacting Mahadev Electricals!\nInquiry ID: {$inquiry_id}\nWe'll respond within 2 hours.\n\nCall us: {$config['business_phone']}";
        $mail2->send();
        $customer_sent = true;
    }

} catch (Exception $e) {
    $error_detail = $e->getMessage();
    error_log("PHPMailer Error [{$inquiry_id}]: {$error_detail}");
}

// ─── Log Every Submission (regardless of email result) ───────────────────────
$log = date('Y-m-d H:i:s')
     . " | ID: {$inquiry_id}"
     . " | Name: {$name}"
     . " | Phone: {$phone}"
     . " | Email: " . ($email ?: 'N/A')
     . " | Subject: {$subject}"
     . " | Business mail: " . ($business_sent ? 'OK' : 'FAIL')
     . " | Customer mail: " . ($customer_sent ? 'OK' : ($email ? 'FAIL' : 'N/A'))
     . "\n";
file_put_contents(__DIR__ . '/inquiries.log', $log, FILE_APPEND);

// ─── Response ─────────────────────────────────────────────────────────────────
if ($business_sent) {
    echo json_encode([
        'success'           => true,
        'message'           => 'Thank you! Your message has been sent. We\'ll respond within 2 hours.',
        'inquiry_id'        => $inquiry_id,
        'confirmation_sent' => $customer_sent,
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your message. Please call us directly at '
                   . $config['business_phone'],
    ]);
}