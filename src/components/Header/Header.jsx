import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { ReactComponent as InboxIcon } from '../../assets/icons/inbox.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendar.svg';
import { ReactComponent as ArrowRightIcon } from '../../assets/icons/arrow-right.svg';
import { useAuth } from '../../hooks/useAuth';
import logoImage from '../../assets/images/logo.svg';

import { Container } from '../Container';
import { Grid, GridEl } from '../Grid';
import { UserWidget } from '../UserWidget';

import styles from './Header.module.scss';

const NAV_ITEMS = {
  '/': ['/list', '/', '/timeline'],
  '/anytime': ['/anytime/list', '/anytime', '/anytime/timeline'],
  '/scheduled': ['/scheduled/list', '/scheduled', '/scheduled/timeline'],
};

export const Header = () => {
  const { isLoggedIn, isEmployee, company, user } = useAuth();
  const location = useLocation();
  const pathname = `${location.pathname}/`.slice(0, `${location.pathname}/`.lastIndexOf('/'));

  const [navStates, setNavStates] = React.useState({
    '/': '/',
    '/anytime': '/anytime',
    '/scheduled': '/scheduled',
  });

  React.useEffect(() => {
    setNavStates(
      Object.keys(navStates).reduce((acc, key) => {
        if (NAV_ITEMS[key].includes(pathname)) {
          return { ...acc, [key]: pathname };
        }

        return acc;
      }, navStates)
    );
  }, [pathname]);

  const navLinkClassnames = (to) => ({ isActive }) => {
    const navItem = Object.values(NAV_ITEMS).find((paths) => paths.includes(to));

    if (navItem && navItem.includes(pathname)) {
      return styles.activeLink;
    }

    return isActive
      ? styles.activeLink
      : undefined;
  };

  const menu = isLoggedIn ? [
    ...(!isEmployee ? [
      {
        to: navStates['/'],
        label: 'Scheduler',
        Icon: InboxIcon,
      },
      ...(user.hasEmployeeRights ? [
        {
          to: navStates['/scheduled'],
          label: 'Scheduled',
          Icon: CalendarIcon,
        },
      ] : []),
    ] : [
      {
        to: navStates['/anytime'],
        label: 'Anytime',
        Icon: ArrowRightIcon,
      },
      {
        to: navStates['/scheduled'],
        label: 'Scheduled',
        Icon: CalendarIcon,
      },
    ]),
    {
      to: '/completed',
      label: 'Completed',
      Icon: InboxIcon,
    },
  ] : [];

  return (
    <header className={styles.header}>
      <Container>
        <nav>
          <Grid alignItems="flex-end">
            <GridEl size={{ xs: 'fluid', md: '3' }}>
              <Link to="/" className={styles.logo}>
                <img src={logoImage} alt="Technik w Terenie" />
              </Link>
            </GridEl>
            <GridEl size={{ xs: 'auto', md: 'fluid' }}>
              <ul className={styles.menu}>
                {menu.map(({ to, label }) => (
                  <li key={to} className={styles.menuItem}>
                    <NavLink to={to} className={navLinkClassnames(to)}>{label}</NavLink>
                  </li>
                ))}
              </ul>
            </GridEl>
            {isLoggedIn && (
              <GridEl size="auto">
                <UserWidget />
              </GridEl>
            )}
          </Grid>
        </nav>
      </Container>
      {!!menu.length && (
        <nav className={styles.mobileNav}>
          <ul className={styles.mobileMenu}>
            {menu.map(({ to, label, Icon }) => (
              <li key={to} className={styles.mobileMenuItem}>
                <NavLink to={to} className={navLinkClassnames(to)}>
                  <Icon />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
