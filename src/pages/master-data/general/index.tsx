import { useRouter } from 'next/router';
import { useEffect } from 'react';

const GeneralMasterData = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/master-data/general/stakeholder/ownerships/');
  }, []);
  return <>loading</>;
};

export default GeneralMasterData;
