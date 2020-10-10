import Section from 'components/Section';
import Container from 'components/Container';

import styles from './Header.module.scss';

const Header = ({ children, className }) => {
  let headerClassName = styles.header;

  if ( className ) {
    headerClassName = `${headerClassName} ${className}`;
  }

  return (
    <Section className={headerClassName}>
      <Container>
        <h1>{ children }</h1>
      </Container>
    </Section>
  )
}

export default Header;