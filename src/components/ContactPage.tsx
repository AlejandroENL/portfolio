const ContactPage = () => {
  return (
    <section className="contact-page">
      <div className="contact-header">
        <h1>Contact</h1>

        <p>
          Available for collaboration, consulting, freelance work,
          and software development opportunities.
        </p>
      </div>

      <div className="contact-card">
        <a href="mailto:hello@yourdomain.com">
          hello@yourdomain.com
        </a>

        <a
          href="https://www.linkedin.com/in/your-profile"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>

        <a
          href="https://github.com/your-username"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
    </section>
  );
};

export default ContactPage;