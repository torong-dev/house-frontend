import React from "react";
import { FaInstagram } from "react-icons/fa";
import { SiNotion } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer__section">
      <ul className="footer__links">
        <li>
          <a
            className="footer__link"
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer" // 보안을 강화하기 위해 추가
            title="instagram link"
          >
            <FaInstagram />
          </a>
        </li>
        <li>
          <a
            className="footer__link"
            href="https://typical-summer-20c.notion.site/2-b4f0c575bdf2421dbd772c45679309d1"
            target="_blank"
            rel="noopener noreferrer"
            title="notion link"
          >
            <SiNotion />
          </a>
        </li>
        <li>
          <a
            className="footer__link"
            href="https://github.com/torong-dev/house-frontend"
            target="_blank"
            rel="noopener noreferrer"
            title="github link"
          >
            <FaGithub />
          </a>
        </li>
      </ul>
      <p className="footer__copyright">
        <FaRegCopyright />
        &nbsp; 2024 2nd House - All rights reserved.
      </p>
    </footer>
  );
}
