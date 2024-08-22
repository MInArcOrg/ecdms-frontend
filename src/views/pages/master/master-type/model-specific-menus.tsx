import { FormControlLabel, FormGroup, Switch, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import modelMenuApiService from 'src/services/general/model-menu-service';
import { ModelMenu } from 'src/types/general/model-menu';

interface SwitchState {
  model: string;
  status: boolean;
}

const ModelSpecificMenus = ({
  module,
  typeId,
  switchStates,
  setSwitchStates
}: {
  module: string;
  typeId: string;
  switchStates: SwitchState[];
  setSwitchStates: (switchStates: SwitchState[]) => void;
}) => {
  const { t } = useTranslation();
  const { data: moduleModels, isLoading: isModuleLoading } = useQuery({
    queryKey: ['module-models', module],
    queryFn: () => modelMenuApiService.getModelsByModule(module, {})
  });

  const { data: typeModels, isLoading: isTypeLoading } = useQuery({
    queryKey: ['type-models', typeId],
    queryFn: () => modelMenuApiService.getByTypeId(typeId, { pagination: { pageSize: 100, page: 1 } })
  });

  useEffect(() => {
    if (moduleModels && typeModels) {
      const initialStates = moduleModels.map((model: string) => {
        const typeModel = typeModels.find((item: ModelMenu) => item.model === model);
        return {
          model: model,
          status: typeModel ? typeModel.model === model : false
        };
      });
      setSwitchStates(initialStates);
    }
  }, [moduleModels, typeModels, setSwitchStates]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const newStates = switchStates.map((state) => (state.model === name ? { ...state, status: checked } : state));
    setSwitchStates(newStates);
  };

  if (isModuleLoading || isTypeLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <FormGroup>
      <Typography variant="h6">{t(`master-data.form.${module}-type-specific-models`)}</Typography>
      {moduleModels?.map((model: string) => {
        const switchState = switchStates.find((state) => state.model === model);
        return (
          <FormControlLabel
            key={model}
            control={<Switch checked={switchState ? switchState.status : false} onChange={handleChange} name={model} />}
            label={model}
          />
        );
      })}
    </FormGroup>
  );
};

export default ModelSpecificMenus;
