import { useAuth } from "@/components/AuthContext";
import PageHeader from "@/components/PageHeader";
import { Toaster } from "@/components/ui/toaster";
import UserProfile from "@/components/UserProfile";

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
