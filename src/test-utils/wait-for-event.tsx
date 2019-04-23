import { fireEvent, waitForElement, EventType } from 'react-testing-library'

const waitForEvent = <T extends Element>(type: EventType, callback: () => T) =>
  waitForElement<T>(callback).then(fireEvent[type])

export default waitForEvent
