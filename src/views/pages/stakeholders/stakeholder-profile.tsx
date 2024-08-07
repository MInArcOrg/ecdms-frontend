import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Typography,
    Avatar,
    CardMedia,
    Accordion,
    AccordionSummary,
    AccordionDetails,
  } from "@mui/material";
  import { useTranslation } from "react-i18next";
  import { useState, useEffect, Fragment } from "react";
  import dynamic from "next/dynamic";
  import { ProjectStakeholder } from "src/types/project/project-stakeholder";
import ModelActionComponent from "src/views/components/custom/model-actions";
import Address from "src/types/general/address";
//   import StakeholderInfoList from "src/views/components/custom/StakeholderInfoList"; // Replace with actual path
import Icon from 'src/@core/components/icon';
import { Stakeholder } from "src/types/stakeholders";
import { useQuery } from "@tanstack/react-query";
import addressApiService from "src/services/general/address-service";

  const MapView = dynamic(() => import('src/views/components/custom/map-view'), {
    ssr: false
  });
  
  const StakeholderProfileCardComponent = ({
    stakeholder,

  }: {
    stakeholder: Stakeholder;
 
  }) => {
    const stakeholderId = stakeholder?.id;
    // const type = uploadablePhotoTypes.stakeholder_profile_photo;
    const { data: locationData, isLoading } = useQuery({
        queryKey:['stakeholder-address',stakeholderId],
        queryFn:()=>addressApiService.getAll({
            filter:{
                model_id: stakeholderId
            }
        })
    })
    const [photo, setPhoto] = useState<string | null>(null);
    const { t } = useTranslation();
  
    useEffect(() => {
      if (stakeholderId) {
        // setPhoto(getPhoto(stakeholderId, type));
      }
    }, [stakeholderId]);
  
    return (
      <Fragment>
        <CardMedia sx={{ height: "6rem" }} image="/images/cards/background-user.png" />
        <Box display="flex">
          <Avatar
            alt="Stakeholder"
            src={photo || ""}
            sx={{
              width: 90,
              height: 90,
              left: "1.313rem",
              top: "-1.5rem",
              border: (theme) => `solid ${theme.palette.common.white}`,
            }}
          />
          <Typography
            variant="body1"
            sx={{
              textDecoration: "none",
              display: "block",
              color: "primary.main",
              ml: "3rem",
              mt: "1rem",
            }}
          >
            {stakeholder?.trade_name}
            <Typography
              variant="subtitle2"
              sx={{
                color: "text.secondary",
                fontSize: "0.875rem",
                fontWeight: 400,
              }}
            >
              {stakeholder?.trade_name}
            </Typography>
          </Typography>
        </Box>
        <CardContent>
          {/* <StakeholderInfoList id={stakeholderId} /> */}
          <Accordion sx={{ boxShadow: "none" }}>
            <AccordionSummary expandIcon={<Icon fontSize="1.25rem" icon="tabler:chevron-down" />}>
              <Typography variant="subtitle1" sx={{ color: "primary.main" }}>
                <Icon icon="tabler:map-pin" fontSize={20} style={{ marginRight: "0.5rem" }} />
                {t("Address")}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {locationData?.length > 0 ? (
                locationData?.payload?.map((address:Address, index:number) => (
                  <Fragment key={index}>
                    {<MapView height="300px" position={[address?.northing, address?.easting]} />}
                  </Fragment>
                ))
              ) : (
                <Typography variant="body2">{`${t("Address")} ${t("Not Found")}`}</Typography>
              )}
            </AccordionDetails>
          </Accordion>
         
        </CardContent>
      </Fragment>
    );
  };
  
  export default StakeholderProfileCardComponent;
  