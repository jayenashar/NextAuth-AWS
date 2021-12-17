import { useSession, signIn, signOut } from "next-auth/client";

export default function Home() {
  const [session, loading] = useSession();

  if (loading) {
    return null;
  }

  if (session) {
    const onClickSignOut = async () => {
      await signOut({redirect: false});
      window.location = `https://${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}/logout?client_id=${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}&logout_uri=${window.location}`;
    };
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={onClickSignOut}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
