import React from 'react'
import PropTypes from 'prop-types'

const Footer = ({ copyrights }) => (
  <footer>
    {copyrights ? (
      <div
        dangerouslySetInnerHTML={{
          __html: copyrights,
        }}
      />
    ) : (
      <>
        <span className="footerCopyrights">
          © 2020 Harley Ferguson
        </span>
        <span className="footerCopyrights">
          <a href="https://github.com/askharley/">GitHub</a>
        </span>
        <span className="footerCopyrights">
          <a href="https://twitter.com/askharleyio">Twitter</a>
        </span>
        <span className="footerCopyrights">
          <a href="https://codesandbox.io/u/askharley">CodeSandBox</a>
        </span>
      </>
    )}
  </footer>
)

Footer.propTypes = {
  copyrights: PropTypes.string,
}

export default Footer
