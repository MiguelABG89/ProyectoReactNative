import React from 'react';
import { shallow } from 'enzyme';
import NewPassword from './NewPassword';

describe('NewPassword component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NewPassword />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('handles code input change', () => {
    const code = '123456';
    wrapper.find('TextInput').at(0).simulate('changeText', code);
    expect(wrapper.find('TextInput').at(0).prop('value')).toEqual(code);
  });

  it('handles new password input change', () => {
    const newPassword = 'newpassword';
    wrapper.find('TextInput').at(1).simulate('changeText', newPassword);
    expect(wrapper.find('TextInput').at(1).prop('value')).toEqual(newPassword);
  });

  it('handles confirm password input change', () => {
    const confirmPassword = 'newpassword';
    wrapper.find('TextInput').at(2).simulate('changeText', confirmPassword);
    expect(wrapper.find('TextInput').at(2).prop('value')).toEqual(confirmPassword);
  });

  it('toggles password visibility', () => {
    wrapper.find('TouchableOpacity').at(0).simulate('press');
    expect(wrapper.find('TextInput').at(1).prop('secureTextEntry')).toEqual(false);
    wrapper.find('TouchableOpacity').at(1).simulate('press');
    expect(wrapper.find('TextInput').at(2).prop('secureTextEntry')).toEqual(false);
  });

  it('handles password recovery button press', () => {
    const mockNavigation = jest.fn();
    wrapper.setProps({ navigation: { navigate: mockNavigation } });

    wrapper.setState({ code: '123456', psw: 'newpassword', confirmarPassword: 'newpassword' });
    wrapper.find('Button').prop('onPress')();

    // Here you can expect navigation to be called with the appropriate route
    expect(mockNavigation).toHaveBeenCalledWith('Inicio');
  });
});