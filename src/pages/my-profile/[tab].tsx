import { useRouter } from 'next/router';
import { useAuth } from 'src/hooks/useAuth';
import UserViewPage from 'src/views/admin/user/view/user-view-page';
import User from 'src/types/admin/user';

const MyProfile = () => {
    const router = useRouter();
    const tab = router.query.tab || 'account';
    const { user, loading } = useAuth();

    return <UserViewPage isLoading={loading} tab={String(tab)} user={user as User} />;
};

export default MyProfile;
