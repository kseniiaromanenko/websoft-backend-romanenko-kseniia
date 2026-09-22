window.addEventListener("load", async () => {
  await window.Clerk.load({
    ui: {
      ClerkUI: window.__internal_ClerkUICtor,
    },
  });

  const authContainer = document.getElementById("auth");

  if (window.Clerk.isSignedIn) {
    authContainer.innerHTML = `<div id="user-button"></div>`;

    const userButton = document.getElementById("user-button");
    window.Clerk.mountUserButton(userButton);
  } else {
    authContainer.innerHTML = `<div id="sign-in"></div>`;

    const signIn = document.getElementById("sign-in");
    window.Clerk.mountSignIn(signIn);
  }
});
