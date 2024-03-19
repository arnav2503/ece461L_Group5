import UserProfile from "./UserProfile";
import PageHeader from "./PageHeader";
import { Toaster } from "./ui/toaster";
import { useAuth } from "./AuthContext";

function UserProfilePage() {
  const auth = useAuth();
  return (
    <>
      <PageHeader
        before={(auth.displayName || auth.userID) + "'s "}
        em={"Profile"}
      />
      <UserProfile />
      <Toaster />
    </>
  );
}

export default UserProfilePage;
