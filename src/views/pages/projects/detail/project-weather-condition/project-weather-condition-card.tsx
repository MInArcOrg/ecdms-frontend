import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { WeatherCondition } from 'src/types/project/weather-condition';
import RowOptions from 'src/views/shared/listing/row-options';

interface WeatherConditionCardProps {
  weatherCondition: WeatherCondition;
  refetch: () => void;
  onEdit: (weatherCondition: WeatherCondition) => void;
  onDelete: (id: string) => void;
  onDetail: (weatherCondition: WeatherCondition) => void;
}

const WeatherConditionCard: React.FC<WeatherConditionCardProps> = ({ weatherCondition, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(weatherCondition)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {t('project.other.weather-condition.title')}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.weather-condition.weather-type')}: {weatherCondition.weather_type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.weather-condition.description')}: {weatherCondition.description}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'weathercondition'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'weathercondition'
          }}
          onEdit={() => onEdit(weatherCondition)}
          onDelete={() => onDelete(weatherCondition?.id || '')}
          item={weatherCondition}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default WeatherConditionCard;
