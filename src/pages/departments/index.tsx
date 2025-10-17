import { Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/departments/sub-departements/');
  }, [router]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );
}
Index.acl = {
  action: 'view_department',
  subject: 'department'
};

export default Index;
