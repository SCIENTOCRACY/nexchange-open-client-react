import React, { useMemo, useState } from 'react';

import { I18n } from 'react-i18next';
import { NavLink as Link, withRouter } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showSupportModal } from 'Actions';


import styled from '@emotion/styled';


const Footer = props => {
  const { location } = props;
  const { pathname } = location;
  const lang = I18n.language || window.localStorage.i18nextLng || 'en';

  const hideFooter = useMemo(() => {
    const routes = ['signin', 'signup', 'forgot-password'];

    // Comment: Matches - /lang/route, /lang/route/
    const shouldHide = routes.map(route => new RegExp(`^/${lang}/${route}(/?)$`).test(pathname));

    if (shouldHide.includes(true)) {
      return true;
    }
    return false;
  }, [location]);

  if (hideFooter) return null;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <I18n ns="translations">
            {t => (
              <StyledFooter>
                <section className="logo">
                  <Link to="/">
                    <img src="/img/logo.svg" alt="N.exchange Logo" />
                  </Link>
                </section>
                <section className="links">
                  <main className="">
                    <section>
                      <h4>{t('header.about')}</h4>
                      <ul>
                        <li>
                          <HashLink smooth to={`/${lang}#about`}>{t('header.about')}</HashLink>
                        </li>
                        <li>
                             <a href="https://n.exchange" target="_blank" rel="noopener noreferrer">N.exchange</a>
                        </li>

                      </ul>
                    </section>
                    <section>
                      <h4>{t('footer.popular-pairs')}</h4>
                      <PopularPairs lang={lang} />
                    </section>
                  </main>
                </section>
              </StyledFooter>
            )}
          </I18n>
        </div>
      </div>
    </div>
  );
};
/*
ETH to BTC
BTC to ETH
LTC to ETH
USDT to BTC
BTC to XMR
BTC to USDT
*/
const defaultPairs = [
  ['eth', 'btc'],
  ['btc', 'eth'],
  ['ltc', 'eth'],
  ['usdt', 'btc'],
  ['btc', 'xmr'],
  ['btc', 'usdt'],
];
const PopularPairs = ({ lang }) => {
  const [pairs] = useState(defaultPairs);
  return (
    <ul>
      {pairs.map(([quote, base], index) => (
        <li key={`${quote}-to-${base}`}>
          <Link to={`/${lang}/convert/${quote}-to-${base}`}>
            {quote.toUpperCase()} to {base.toUpperCase()}
          </Link>
        </li>
      ))}
    </ul>
  );
};


const StyledFooter = styled.footer`
  > section {
    padding: 12px 0;
    &.logo {
      @media screen and (max-width: 960px) {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      img {
        margin: 0 2rem;
        width: 180px;
      }
    }
    h4 {
      text-transform: uppercase;
      font-weight: bold;
    }
    ul {
      > li {
        display: block;
        > a {
          text-transform: none;
          padding: 0;
        }
        > span {
          display: block;
          height: 2rem;
        }
      }
    }

    &.links {
      display: flex;
      flex-direction: column;
      > main {
        display: flex;
        @media screen and (max-width: 640px) {
          flex-direction: column;
        }
        > section {
          width: 180px;
          padding: 0 2rem;
          @media screen and (max-width: 640px) {
            width: 100%;
            &:not(:last-child) {
              margin-bottom: 2rem;
            }
          }
        }
      }
      > aside {
        display: flex;
        flex: 1 1 auto;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: 4rem 0 0;
       
        > p {
          margin: 2rem 0 0;
          font-size: 1rem;
          text-align: center;
          a {
            text-transform: uppercase;
            color: #000;
          }
        }
        .compliance {
          display: flex;
          justify-content: center;
          align-items: center;
          
          img {
            max-width: 60px;
            display: inline-block;
            &:not(:last-child) {
              margin-right: 1rem;
            }

            &.mastercard {
              max-height: 32px;
            }
            
          }
        }
        .compliance2 {
          display: inline-block;
          
          justify-content: center;
          align-items: center;
          
          img {
            max-width: 60px;
            display: inline-block;
            margin-right: 2rem;
            &:not(:last-child) {
              margin-right: 1rem;
            }

            &.kurs {
              max-height: 23px;
            }
            
          }
        }
        }
        
          
        > ul {
          display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: flex-end;
          > li {
            padding: 0;
            &:not(:last-child) {
              margin-right: 1rem;
            }
          }
        }
      }
    }
  }
`;


const mapStateToProps = ({ supportModal }) => ({ supportModal });
const mapDispatchToProps = dispatch => bindActionCreators({ showSupportModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Footer));
