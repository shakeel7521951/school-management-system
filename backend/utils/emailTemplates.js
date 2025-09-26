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
Academy Team
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
Academy Team
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
