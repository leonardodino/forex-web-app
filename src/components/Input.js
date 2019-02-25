import styled from 'styled-components'
import { base } from '../utils/theme'

const Input = styled.input`
  ${base}
  outline: none;
  appearance: none;
  caret-color: currentColor;
  padding: 0;
  text-align: right;
  border: 0px solid transparent;
  border-radius: 0.25rem;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: 500;
  letter-spacing: -0.025em;
  min-width: 10rem;
  flex: 0 1 autos;
`

export default Input
