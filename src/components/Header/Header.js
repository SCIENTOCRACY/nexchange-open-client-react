import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from "react-router-hash-link";
import { useLocation } from 'react-router';
import { I18n } from 'react-i18next';
import i18n from 'i18next';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UserIcon from './user.svg';

import Support from './Support/Support';
import { loadAuth, loadUserDetails, showSupportModal } from 'Actions';

import styles from './Header.scss';

const Header = props => {
  const [, setShowNavbar] = useState(false);
  const location = useLocation();
  const lang = i18n.language || window.localStorage.i18nextLng || 'en';

  const isHomeHeader = useMemo(() => {
    const { pathname } = location;
    const routes = ['instant-white-label', 'faqs'];

    // Comment: Matches - /lang, /lang/, /lang/route, /lang/route/, etc
    const showHomeHeader = routes.map(route => new RegExp(`^/${lang}(/${route})?(/)?$`).test(pathname));

    if (showHomeHeader.includes(true)) {
      return true;
    }
    return false;
  }, [location]);

  const isHideHeader = useMemo(() => {
    const { pathname } = location;
    const routes = ['signin', 'signup', 'forgot-password'];

    // Comment: Matches - /lang/route, /lang/route/
    const shouldHide = routes.map(route => new RegExp(`^/${lang}/${route}(/?)$`).test(pathname));

    if (shouldHide.includes(true)) {
      return true;
    }
    return false;
  }, [location]);

  useEffect(() => {
    props.loadAuth();
  }, []);

  useEffect(() => {
    if (props.auth && props.auth.token && props.auth.token.access_token) {
      if (!props.auth.profile) {
        props.loadUserDetails();
      }
    }
  }, [props.auth]);

  const closeNavbar = useCallback(() => {
    setShowNavbar(false);
  }, [setShowNavbar]);

  const hideSupport = useCallback(() => {
    props.showSupportModal(false);
  }, [props.supportModal]);

  if (isHideHeader) return null;

  return (
    <HeaderStuff
      {...{
        auth: props.auth,
        supportModal: props.supportModal,
        showSupportModal: props.showSupportModal,
        lang,
        closeNavbar,
        isHomeHeader,
        hideSupport,
      }}
    />
  );
};

export const HeaderStuff = props => {
  const { isHomeHeader, lang, closeNavbar, hideSupport, supportModal } = props;

  return (
    <I18n ns="translations">
      {(t, { i18n }) => (
        <div className={`${styles.header} ${isHomeHeader ? styles.home : ''}`} data-test="header">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation-index">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>

              <Link to={`/${lang}`}>
                <div className={styles['logo-container']}>
                  {isHomeHeader ? (
                    <img src="/img/logo-white.svg" alt="Logo" data-test="logo" />
                  ) : (
                    <img src="/img/logo.svg" alt="Logo" data-test="logo" />
                  )}
                </div>
              </Link>
            </div>

            <div className="collapse navbar-collapse" id="navigation-index">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <HashLink smooth onClick={() => closeNavbar()} to={`/${lang}#about`} className={styles.link}>
                    {t('header.about')}
                  </HashLink>
                </li>


                {/* <li>
                  <Link onClick={() => closeNavbar()} to="/pricecomparsion" className={styles.link} data-test="pricecomparsion-btn">
                    {t('header.pricecomparsion')}
                  </Link>
                </li>

                <li>
                  <Link onClick={() => closeNavbar()} to="/team" className={styles.link} data-test="pricecomparsion-btn">
                    {t('header.team')}
                  </Link>
                </li> */}

                <li>
                  <a
                    className={`${styles.link} hidden-sm hidden-md`}
                    href="http://docs.nexchange2.apiary.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => window.gtag('event', 'API open', { event_category: 'API', event_label: `` })}
                    data-test="api-link"
                  >
                    {t('header.apidocs')}
                  </a>
                </li>
            </div>

            <Support show={supportModal} onClose={() => hideSupport()} />
          </div>
        </div>
      )}
    </I18n>
  );
};

const mapStateToProps = ({ auth, supportModal }) => ({ auth, supportModal });
const mapDispatchToProps = dispatch => bindActionCreators({ loadAuth, loadUserDetails, showSupportModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
