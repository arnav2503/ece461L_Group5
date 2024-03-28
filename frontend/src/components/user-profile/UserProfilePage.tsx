import { useAuth } from "@/contexts/AuthContext";
import PageHeader from "@/components/navbar/PageHeader";
import { Toaster } from "@/components/ui/toaster";
import UserProfile from "@/components/user-profile/UserProfile";

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
