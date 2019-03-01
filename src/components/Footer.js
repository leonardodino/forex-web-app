import React from 'react'
import styled from 'styled-components/macro'
import { base, focus, borderRadius } from 'utils/theme'
import Container from './Container'

const GitHubIcon = ({ size = 24, color = 'currentColor', style, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill={color}
    {...props}
    style={{ display: 'block', ...style }}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C20.565 21.795 24 17.295 24 12C24 5.37 18.63 0 12 0Z'
    />
  </svg>
)

const Link = ({ to, children, className, style, target }) => {
  const props = { className, style, children, target }
  const other = { target: '_blank', rel: 'noopener noreferrer' }
  return <a {...props} {...other} href={to} children={children} />
}

const Wrapper = styled.div`
  ${base}
  padding: 1.5rem 0;
  margin-top: auto;
`

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Anchor = styled(Link)`
  ${focus}
  display: block;
  text-decoration: none;
  color: currentColor;
  margin: -0.5rem;
  padding: 0.5rem;
  border-radius: ${borderRadius};
  font-weight: 500;
`

const Footer = () => (
  <Wrapper>
    <StyledContainer style={{ marginTop: 'auto' }}>
      <Anchor to='https://github.com/leonardodino'>leonardodino</Anchor>
      <Anchor to='https://github.com/leonardodino/forex-web-app'>
        <GitHubIcon style={{ margin: '0.25rem' }} />
      </Anchor>
    </StyledContainer>
  </Wrapper>
)

export default Footer
