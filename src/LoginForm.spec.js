import LoginForm from "./LoginForm";
import {render, screen} from "@testing-library/react";

describe('LoginForm', () => {
  describe('Layout', () => {
    it('has a heading saying Login', () => {
      render(<LoginForm/>);
      const heading = screen.queryByRole('heading', {name: 'Login'});
      expect(heading).toBeVisible();
    })
    
    it('has a username input limited to 20 characters', () => {
      render(<LoginForm/>);
      const username = screen.getByLabelText('Username');
      expect(username).toBeVisible();
      expect(username).toHaveAttribute("maxlength","20");
    })
    
    it('has a password input limited to 20 characters', () => {
      render(<LoginForm/>);
      const password = screen.getByLabelText('Password');
      expect(password).toBeVisible();
      expect(password).toHaveAttribute("maxlength","20");
      expect(password.type).toBe("password")
    })
    
    it('has a login button', () => {
      render(<LoginForm/>);
      const loginButton = screen.getByRole('button', {value: "Login"});
      expect(loginButton).toBeVisible();
    })
    
  })
})