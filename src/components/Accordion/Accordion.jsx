import React, { useState } from 'react';
import styles from './Accordion.module.css';

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.accordion}>
      <div className={styles.accordionTitle} onClick={toggleAccordion}>
        {title}
      </div>
      {isOpen && <div className={styles.accordionContent}>{content}</div>}
    </div>
  );
};

export default Accordion;