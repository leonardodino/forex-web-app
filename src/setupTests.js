// [HACK]: synchronous promises
// [TOOD]: change to await act(async () => {}) after #14853 is merged
// #14853: https://github.com/facebook/react/pull/14853
import 'jest-dom/extend-expect'
import { ZalgoPromise } from 'zalgo-promise'
global.Promise = ZalgoPromise
jest.doMock('./api/fetch-rates')
