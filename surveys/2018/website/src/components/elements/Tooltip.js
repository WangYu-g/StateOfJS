import React from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import classNames from 'classnames'

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
)

const StarTotal = ({ value }) => {
    const digits = value > 1000 && value < 10000 ? '0.0' : '0'

    return <span>{numeral(value).format(`${digits}a`)}</span>
}

StarTotal.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
}

const Description = ({ text, showEmojis }) => {
    const emoji = () => {
        const size = 20
        return `<img
    align="absmiddle"
    width="${size}"
    height=${size}
    src="https://assets-cdn.github.com/images/icons/emoji/$2.png"
  />`
    }
    const replacedBy = showEmojis ? emoji() : ''
    const result = text.replace(/(:([a-z_\d]+):)/g, replacedBy).trim()
    if (showEmojis) return <HtmlDescription html={result} />
    return <span>{result}</span>
}

Description.propTypes = {
    text: PropTypes.string.isRequired,
    showEmojis: PropTypes.bool
}

const HtmlDescription = ({ html }) => <span dangerouslySetInnerHTML={{ __html: html }} />

HtmlDescription.propTypes = {
    html: PropTypes.string.isRequired
}

const Tooltip = ({ library, variant }) => {
    const githubUrl = `https://github.com/${library.github}`
    const bestofjsUrl = `https://bestofjs.org/projects/${library.id}`

    return (
        <div
            className={classNames(
                'Tooltip',
                'library__tooltip',
                { 'arrow-top': variant === 'horizontal' },
                { 'arrow-right': variant === 'vertical' }
            )}
        >
            <div className="toolip__topzone" />
            <div className="tooltip__inner">
                <h3 className="tooltip__title">
                    <span className="tooltip__title__homepage">{library.name}</span>
                    <a className="tooltip__title__stars" href={githubUrl}>
                        <StarTotal value={library.stars.toLocaleString()} />
                        <StarIcon />
                    </a>
                </h3>
                <p>
                    <Description text={library.description} showEmojis />
                </p>
                <h4>Learn More</h4>
                <ul>
                    {library.homepage && (
                        <li>
                            <a className="Tooltip__Link" href={library.homepage}>
                                Homepage
                            </a>
                        </li>
                    )}
                    {githubUrl && (
                        <li>
                            <a className="Tooltip__Link" href={githubUrl}>
                                GitHub
                            </a>
                        </li>
                    )}
                    {bestofjsUrl && (
                        <li>
                            <a className="Tooltip__Link" href={bestofjsUrl}>
                                BestOfJS
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

Tooltip.propTypes = {
    library: PropTypes.object.isRequired,
    variant: PropTypes.string
}

export default Tooltip
