import { Box, Card, CardActions, CardContent, Divider, Typography } from "@mui/material";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { ProjectVariation } from "src/types/project/project-finance";
import { formatCurrency } from "src/utils/formatter/money";
import { formatPercent } from "src/utils/formatter/number";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelActionComponent from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

import Icon from 'src/@core/components/icon';


const MainContractPriceCard = ({
    projectVariation,
    refetch,
    onEdit,
    type
}:{type:string,projectVariation:ProjectVariation,refetch:()=>void,  onEdit: (projectVariation: ProjectVariation) => void,
}) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ mx: "auto", mt: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t("project.main-contract-price.price-details")}
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant='h6'>
            {t(type)} {1}
          </Typography>
          <Typography variant='body2' fontWeight='bold'>
            {projectVariation?.justification}
          </Typography>
        </Box>
        <Box mt={2} display='flex'>
          <Typography mr='0.5rem'>{formatCurrency(projectVariation?.amount)}</Typography>
          <Icon icon='mdi:calendar-blank' fontSize={20} />
          <Typography mr='0.5rem'>{projectVariation?.extension_time} </Typography>

        </Box>
      </CardContent>
            <CardActions style={{ justifyContent: 'flex-end' }}>
              <Fragment>
                <Box>
                  <FileDrawer id={projectVariation.id} type={'RESOURCE'} /> &nbsp;
                  <Box sx={{ display: 'flex' }}>
                    <ModelActionComponent
                      model="Address"
                      model_id={projectVariation.id}
                      refetchModel={refetch}
                      resubmit={function (): void {
                        throw new Error('Function not implemented.');
                      }}
                      title={''}
                      postAction={function (): void {
                        throw new Error('Function not implemented.');
                      }}
                    />
                    <RowOptions onEdit={onEdit}  item={projectVariation} options={[]} />
                  </Box>
                </Box>
              </Fragment>
            </CardActions>
    </Card>
  );
};

export default MainContractPriceCard;
