import styles from './Footer.module.scss';

import useSite from 'hooks/use-site';

import Section from 'components/Section';
import Container from 'components/Container';
import Button from 'components/Button';

const Footer = () => {
  const { metadata } = useSite();
  const { supportEmail, authorName, authorUrl } = metadata;

  return (
    <footer className={styles.footer}>
      <Section className={styles.footerSection}>
        <Container>
          <p>
            <strong>Have any questions?</strong> Contact us at <a href={`mailto:${supportEmail}`}>{ supportEmail }</a>
          </p>
        </Container>
      </Section>
      <Section className={styles.footerSection}>
        <Container>
          <p className={styles.footerLegal}>
            &copy; { new Date().getFullYear() }, <a href={authorUrl}>{ authorName }</a>
          </p>
        </Container>
      </Section>
    </footer>
  )
}

export default Footer;