import { fireEvent, waitForElement } from 'react-testing-library'

const waitForEvent = (eventName, callback) =>
  waitForElement(callback).then(fireEvent[eventName])

export default waitForEvent
