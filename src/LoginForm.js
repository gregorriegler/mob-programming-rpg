function LoginForm() {

  return (
    <>
      <h1>Login</h1>
      <label htmlFor="username">Username</label>
      <input id="username" maxLength={20} />
      <br />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" maxLength={20} />
      <br />
      <input type="submit" value="Login" />
    </>
  );
}

export default LoginForm;
