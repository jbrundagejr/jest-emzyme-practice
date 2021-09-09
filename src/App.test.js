import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from './App';

Enzyme.configure({adapter: new EnzymeAdapter() })

// create the ShallowWrapper for the App component
const setup = () => shallow(<App />)

const findByTestAttribute = (wrapper, val) => wrapper.find(`[data-test='${val}']`)

test('renders without error', () => {
  const wrapper = setup()
  const appComponent = findByTestAttribute(wrapper, "component-app")
  expect(appComponent.length).toBe(1)
});

test('renders plus button', () => {
  const wrapper = setup()
  const button = findByTestAttribute(wrapper, "plus-one-button")
  expect(button.length).toBe(1)
})

test('renders counter display', () => {
  const wrapper = setup()
  const counterDisplay = findByTestAttribute(wrapper, "counter-display")
  expect(counterDisplay.length).toBe(1)
})

test('counter display starts at 0', () => {
  const wrapper = setup()
  const displayNumber = findByTestAttribute(wrapper, "display-number").text()
  expect(displayNumber).toBe("0")
})

test('clicking button adds one to counter display', () => {
  const wrapper = setup()
  const plusOneButton = findByTestAttribute(wrapper, "plus-one-button")
  plusOneButton.simulate('click')
  const displayNumber = findByTestAttribute(wrapper, "display-number").text()
  expect(displayNumber).toBe("1")
})

test('clicking minus one button decrements counter display when greater than 0', () => {
  const wrapper = setup()
  const plusOneButton = findByTestAttribute(wrapper, "plus-one-button")
  plusOneButton.simulate('click')
  const minusOneButton = findByTestAttribute(wrapper, "minus-one-button")
  minusOneButton.simulate('click')
  const displayNumber = findByTestAttribute(wrapper, "display-number").text()
  expect(displayNumber).toBe("0")
})

test('error does not show when not needed', () => {
  const wrapper = setup()
  const errorDiv = findByTestAttribute(wrapper, 'error-message')
  const errorHasHiddenClass = errorDiv.hasClass('hidden')
  expect(errorHasHiddenClass).toBe(true)
})

describe('counter is 0 and decrement is clicked', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup()
    const minusOneButton = findByTestAttribute(wrapper, 'minus-one-button')
    minusOneButton.simulate('click')
  })
  test('error shows', () => {
    const errorDiv = findByTestAttribute(wrapper, 'error-message')
    const errorHasHiddenClass = errorDiv.hasClass('hidden')
    expect(errorHasHiddenClass).toBe(false)
  })
  test('counter still displays 0', () => {
    const displayNumber = findByTestAttribute(wrapper, 'display-number').text()
    expect(displayNumber).toBe("0")
  })
  test('clicking increment clears the error', () => {
    const plusOneButton = findByTestAttribute(wrapper, 'plus-one-button')
    plusOneButton.simulate('click')
    const errorDiv = findByTestAttribute(wrapper, 'error-message')
    const errorHasHiddenClass = errorDiv.hasClass('hidden')
    expect(errorHasHiddenClass).toBe(true)
  })
})