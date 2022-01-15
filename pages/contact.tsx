import Head from 'next/head';
import type { NextPage } from 'next';
import ContactForm from '../components/contact/contact-form';

interface ContactPageProps {}

const ContactPage: NextPage<ContactPageProps> = () => {
  return (
    <>
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="Send me your messages!" />
      </Head>
      <ContactForm />
    </>
  );
};

export default ContactPage;
