import { Icon } from '@iconify/react';
import { CardContent, Typography, Card } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';

function CompanyCard(props: any) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography variant="subtitle2">{t(props?.name)}</Typography>
            <Typography variant="subtitle1" fontSize={16}>
              {props.count}
            </Typography>
          </Box>

          <Icon icon={props.iconName} fontSize={30} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default CompanyCard;
