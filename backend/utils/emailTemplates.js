// utils/emailTemplates.js
export const registrationApprovedTemplate = (name, email, password) => {
  return {
    subject: "🎉 Registration Approved - Welcome to Our Academy!",
    text: `Hello ${name},

We are excited to inform you that your registration has been approved! 🎉

Here are your login details:
Email: ${email}
Password: ${password}

👉 Please log in and change your password immediately for security.

Welcome aboard, we’re happy to have you with us!

Best Regards,
Al Tamakon Team
    `,
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6;">
        <h2 style="color:#2c3e50;">🎉 Registration Approved</h2>
        <p>Hello <b>${name}</b>,</p>
        <p>We are excited to inform you that your registration has been <b style="color:green;">approved</b>!</p>
        <p>Here are your login details:</p>
        <ul>
          <li><b>Email:</b> ${email}</li>
          <li><b>Password:</b> ${password}</li>
        </ul>
        <p><b>Important:</b> Please log in and change your password immediately for your account’s security.</p>
        <p>Welcome aboard, we’re happy to have you with us! 🚀</p>
        <br>
        <p>Best Regards,<br><b>Academy Team</b></p>
      </div>
    `,
  };
};

export const registrationRejectedTemplate = (name) => {
  return {
    subject: "⚠️ Registration Update - Application Rejected",
    text: `Hello ${name},

We regret to inform you that your registration has been rejected. 

This could be due to incomplete information or not meeting the eligibility criteria.

You may re-apply after reviewing the requirements.

Best Regards,
Al Tamakon Team
    `,
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6;">
        <h2 style="color:#c0392b;">⚠️ Registration Rejected</h2>
        <p>Hello <b>${name}</b>,</p>
        <p>We regret to inform you that your registration has been <b style="color:red;">rejected</b>.</p>
        <p>This could be due to incomplete information or not meeting the eligibility criteria.</p>
        <p>You may re-apply after reviewing the requirements.</p>
        <br>
        <p>Best Regards,<br><b>Academy Team</b></p>
      </div>
    `,
  };
};

export const registrationSubmittedTemplate = (name) => {
  return {
    subject: "📬 Registration Submitted Successfully",
    text: `Hello ${name},

We have received your registration successfully! ✅

Your application is now under review. You will be notified via email once the status is updated.

Thank you for choosing our Academy!

Best Regards,
Al Tamakon Team
    `,
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6;">
        <h2 style="color:#2c3e50;">📬 Registration Submitted</h2>
        <p>Hello <b>${name}</b>,</p>
        <p>We have received your registration successfully! ✅</p>
        <p>Your application is now under review. You will be notified via email once the status is updated.</p>
        <p>Thank you for choosing our Academy!</p>
        <br>
        <p>Best Regards,<br><b>Academy Team</b></p>
      </div>
    `,
  };
};

export const visitorRequestSubmittedTemplate = (name) => {
  return {
    subject: "📨 Visitor Request Submitted Successfully",
    text: `Hello ${name},

We have received your visitor request successfully! ✅

Your request is now under review by our team. You will receive an update once your application status changes.

Thank you for your interest!

Best Regards,
Visitor Management Team
    `,
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6;">
        <h2 style="color:#2c3e50;">📨 Visitor Request Submitted</h2>
        <p>Hello <b>${name}</b>,</p>
        <p>We have received your visitor request successfully! ✅</p>
        <p>Your request is now under review by our team. You will receive an update once your application status changes.</p>
        <p>Thank you for your interest!</p>
        <br>
        <p>Best Regards,<br><b>Visitor Management Team</b></p>
      </div>
    `,
  };
};


export const visitorStatusUpdateTemplate = (name, status) => {
  let statusMessage = "";
  let emoji = "";
  let color = "";

  if (status === "accepted") {
    statusMessage = "🎉 Congratulations! Your visitor application has been accepted. We look forward to seeing you soon!";
    emoji = "✅";
    color = "#27ae60";
  } else if (status === "rejected") {
    statusMessage = "❌ Unfortunately, your visitor application has been rejected. You may contact us for further clarification.";
    emoji = "❌";
    color = "#e74c3c";
  } else {
    statusMessage = "⏳ Your visitor application is still under review. We’ll notify you once the status is updated.";
    emoji = "⏳";
    color = "#f39c12";
  }

  return {
    subject: `Visitor Application Status Update ${emoji}`,
    text: `Hello ${name},

${statusMessage}

If you have any questions, feel free to reach out to us.

Best Regards,
Visitor Management Team
    `,
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6;">
        <h2 style="color:${color};">Visitor Application Status Update ${emoji}</h2>
        <p>Hello <b>${name}</b>,</p>
        <p>${statusMessage}</p>
        <p>If you have any questions, feel free to reach out to us.</p>
        <br>
        <p>Best Regards,<br><b>Visitor Management Team</b></p>
      </div>
    `,
  };
};