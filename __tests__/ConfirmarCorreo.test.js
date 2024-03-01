import React from 'react';
import { shallow } from 'enzyme';
import ConfirmarCorreo from './ConfirmarCorreo';
import { Button, ModalDropdown, TextInput } from 'react-native';
import { confirmSignUp } from 'aws-amplify/auth';

describe('ConfirmarCorreo component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ConfirmarCorreo />);
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

  it('handles user input change', () => {
    const userInput = 'username';
    const input = wrapper.find(TextInput).at(0);
    input.prop('onChangeText')(userInput);

    expect(wrapper.find(TextInput).at(0).prop('value')).toEqual(userInput);
  });

  it('handles code input change', () => {
    const codeInput = '123456';
    const input = wrapper.find(TextInput).at(1);
    input.prop('onChangeText')(codeInput);

    expect(wrapper.find(TextInput).at(1).prop('value')).toEqual(codeInput);
  });

  it('calls handleSignUpConfirmation function on button press', () => {
    const handleSignUpConfirmationSpy = jest.spyOn(wrapper.instance(), 'handleSignUpConfirmation');

    const button = wrapper.find(Button);
    button.simulate('press');

    expect(handleSignUpConfirmationSpy).toHaveBeenCalled();
  });

  it('executes handleSignUpConfirmation function successfully', async () => {
    const mockNavigation = jest.fn();
    wrapper.setProps({ navigation: { navigate: mockNavigation } });

    const consoleSpy = jest.spyOn(console, 'log');
    confirmSignUp.mockResolvedValueOnce({ isSignUpComplete: true, nextStep: null });

    await wrapper.instance().handleSignUpConfirmation();

    expect(consoleSpy).toHaveBeenCalledWith('Successfully confirmed sign up');
    expect(mockNavigation).toHaveBeenCalledWith('Inicio');
  });

  it('handles error in handleSignUpConfirmation function', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error');
    confirmSignUp.mockRejectedValueOnce(new Error('Confirmation Error'));

    await wrapper.instance().handleSignUpConfirmation();

    expect(consoleErrorSpy).toHaveBeenCalledWith('error confirming sign up', new Error('Confirmation Error'));
  });
});