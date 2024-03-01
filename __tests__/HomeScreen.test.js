import React from 'react';
import { shallow } from 'enzyme';
import HomeScreen from './HomeScreen';
import { Button, ModalDropdown } from 'react-native';

describe('HomeScreen component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<HomeScreen />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('handles language selection', () => {
    const mockNavigation = jest.fn();
    wrapper.setProps({ navigation: { navigate: mockNavigation } });

    const modalDropdown = wrapper.find(ModalDropdown);
    modalDropdown.prop('onSelect')(1, 'English');

    expect(mockNavigation).toHaveBeenCalledWith('englishRegister');
  });

  it('calls getTodo function on button press', () => {
    const getTodoSpy = jest.spyOn(HomeScreen.prototype, 'getTodo');

    const button = wrapper.find(Button).at(0);
    button.simulate('press');

    expect(getTodoSpy).toHaveBeenCalled();
  });

  it('calls handleSignOut function on button press', () => {
    const handleSignOutSpy = jest.spyOn(HomeScreen.prototype, 'handleSignOut');

    const button = wrapper.find(Button).at(1);
    button.simulate('press');

    expect(handleSignOutSpy).toHaveBeenCalled();
  });

  it('executes getTodo function successfully', async () => {
    // Mock the API response
    const mockResponse = { json: jest.fn().mockResolvedValue('Mock response') };
    global.fetch = jest.fn().mockResolvedValue({ body: mockResponse });

    const consoleSpy = jest.spyOn(console, 'log');

    await wrapper.instance().getTodo();

    expect(consoleSpy).toHaveBeenCalledWith('GET call succeeded: ', 'Mock response');
  });

  it('handles error in getTodo function', async () => {
    // Mock the API error response
    global.fetch = jest.fn().mockRejectedValue(new Error('API Error'));

    const consoleErrorSpy = jest.spyOn(console, 'error');

    await wrapper.instance().getTodo();

    expect(consoleErrorSpy).toHaveBeenCalledWith('GET call failed: ', new Error('API Error'));
  });

  it('handles sign out', async () => {
    const mockSignOut = jest.fn();
    wrapper.setProps({ navigation: { navigate: jest.fn() } });
    jest.spyOn(HomeScreen.prototype, 'handleSignOut').mockImplementation(mockSignOut);

    const button = wrapper.find(Button).at(1);
    button.simulate('press');

    expect(mockSignOut).toHaveBeenCalled();
  });
});
