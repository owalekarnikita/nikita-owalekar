/* Contact section content. Channels are derived from siteConfig. */

export const contact = {
  eyebrow: 'Contact',
  /** The final word is rendered in the accent gradient. */
  heading: "Let's build something great.",
  subheading:
    'I am open to frontend and React.js roles, and to interesting product work. Send a message and I will get back to you.',
  responseNote: 'Prefer email or a call? Everything on the left reaches me directly.',

  /**
   * Used only by the `mailto:` fallback — i.e. when no mail provider key is
   * configured. With RESEND_API_KEY set, none of this is ever shown.
   */
  mail: {
    subject: 'Website Contact Form Submission',
    note: 'Submitting opens your mail app with the message ready to send, so it reaches me from your own address.',
  },

  formLabels: {
    name: 'Name',
    email: 'Email',
    message: 'Message',
    submit: 'Send message',
    sending: 'Sending...',
    mailto: 'Opening your mail app with the message ready to send.',
    success: 'Thanks — your message has been sent. I will reply soon.',
    error: 'Something went wrong. Please email me directly instead.',
  },
} as const;
