import React from 'react';
import styles from './About.scss';
import { I18n } from 'react-i18next';

const About = () => (
  <I18n ns="translations">
    {t => (
      <div id="about" className={styles.about}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h2 className="title">{t('about.title')}</h2>
            </div>
            <div className="col-xs-12 col-sm-6">
              <p>
                  Learn more about us at {' '}
                  <a href="https://www.scientocracy.io" target="_blank" rel="noopener noreferrer">
                    Scientocracy io
                  </a>.
                </p>
               <p>
                  This exchange is based on open sourced software by {' '}
                  <a href="https://n.exchange/en" target="_blank" rel="noopener noreferrer">
                    N.exchange
                  </a>
                </p>
            </div>
          </div>
        </div>
      </div>
    )}
  </I18n>
);

export default About;
