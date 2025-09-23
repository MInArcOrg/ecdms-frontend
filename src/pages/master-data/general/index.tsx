import { useRouter } from "next/router";
import { useEffect } from "react";
import LoadingPlaceholder from "src/views/components/loader";

const GeneralMasterData = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/master-data/general/stakeholder/ownerships/");
  }, []);
  return <LoadingPlaceholder></LoadingPlaceholder>;
};

export default GeneralMasterData;
