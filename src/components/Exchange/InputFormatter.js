import React, { useState, useEffect, forwardRef } from 'react'
import { Rifm } from 'rifm'

const cleanup = string => string.replace(/[^\d.]+/g, '')
const isEquivalent = (a, b) => cleanup(a) === cleanup(b)

// source: https://github.com/istarkov/rifm/blob/9b8960715/docs/format.js#L20
const format = str => {
  const clean = cleanup(str)

  const beautify =
    clean.indexOf('.') === -1
      ? clean.length > 2
        ? `${clean.substr(0, clean.length - 2)}.${clean.substr(-2)}`
        : clean
      : `${clean.split('.')[0]}.${clean.split('.')[1].substr(0, 2)}`

  const r = parseFloat(beautify)

  if (Number.isNaN(r)) return '0.00'

  return r.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: false,
  })
}

const InputFormatter = forwardRef(({ value, onChange, children }, ref) => {
  const [text, setText] = useState(value)

  useEffect(() => {
    isEquivalent(text, value) || onChange({ target: { value: text } })
  }, [text]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    isEquivalent(text, value) || setText(format(value))
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Rifm
      value={text}
      onChange={setText}
      refuse={/[^\d.]/g}
      format={format}
      children={props => children(props, ref)}
    />
  )
})

export default InputFormatter
